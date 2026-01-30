import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

function parseDateOnlyToUtc(ymd: string): Date {
  // ymd: "2023-12-25"
  const d = new Date(`${ymd}T00:00:00.000Z`);
  if (isNaN(d.getTime())) throw new BadRequestException('Invalid event_date');
  return d;
}

function parseTimeToUtcOnDate(ymd: string, time: string): Date {
  // time: "10:00" or "10:00:30"
  const match = time.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) throw new BadRequestException('Invalid event_time');

  const hh = Number(match[1]);
  const mm = Number(match[2]);
  const ss = match[3] ? Number(match[3]) : 0;

  if (hh > 23 || mm > 59 || ss > 59) {
    throw new BadRequestException('Invalid event_time');
  }

  const base = parseDateOnlyToUtc(ymd);
  base.setUTCHours(hh, mm, ss, 0);
  return base;
}

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  getAllEvents() {
    return this.prisma.event.findMany({
      where: { deleted_at: null },
      orderBy: { eventDate: 'desc' },
      include: { images: true },
    });
  }

  createEvent(dto: CreateEventDto) {
    const eventDate = parseDateOnlyToUtc(dto.event_date);
    const eventTime = dto.event_time
      ? parseTimeToUtcOnDate(dto.event_date, dto.event_time)
      : null;

    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,

        eventDate,     // Prisma field (camelCase)
        eventTime,     // Prisma field (camelCase)

        location: dto.location ?? null,
        status: dto.status ?? 'ACTIVE',
        attendees: dto.attendees ?? 0,

        created_by: dto.created_by ?? null,

        // ✅ map snake_case input -> camelCase prisma fields
        liveStreamUrl: dto.live_stream_url ?? null,
        registrationUrl: dto.registration_url ?? null,
        coverImage: dto.cover_image ?? null,
        thumbnailImage: dto.thumbnail_image ?? null,
      },
    });
  }

  async getEventById(id: number) {
    const event = await this.prisma.event.findFirst({
      where: { id, deleted_at: null },
      include: { images: true },
    });

    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async updateEvent(id: number, dto: UpdateEventDto) {
    await this.getEventById(id);

    // If only time is provided without date, keep existing date (recommended).
    // For simplicity: only set eventTime if dto.event_date exists.
    const eventDate = dto.event_date ? parseDateOnlyToUtc(dto.event_date) : undefined;

    const eventTime =
      dto.event_date && dto.event_time
        ? parseTimeToUtcOnDate(dto.event_date, dto.event_time)
        : dto.event_time
          ? (() => {
              throw new BadRequestException('Send event_date along with event_time');
            })()
          : undefined;

    return this.prisma.event.update({
      where: { id },
      data: {
        title: dto.title ?? undefined,
        description: dto.description ?? undefined,
        location: dto.location ?? undefined,
        status: dto.status ?? undefined,
        attendees: dto.attendees ?? undefined,
        liveStreamUrl: dto.live_stream_url ?? undefined,
        registrationUrl: dto.registration_url ?? undefined,
        coverImage: dto.cover_image ?? undefined,
        thumbnailImage: dto.thumbnail_image ?? undefined,
        eventDate,
        eventTime,
      },
    });
  }

  async deleteEvent(id: number, updated_by?: number) {
    await this.getEventById(id);

    return this.prisma.event.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        updated_by: updated_by ?? null,
      },
    });
  }
}
