import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) { }

  getAllEvents() {
    return this.prisma.event.findMany({
      where: { deleted_at: null },
      orderBy: { event_date: 'desc' },
      include: { images: true },
    });
  }

  createEvent(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...dto,
        event_date: new Date(dto.event_date),
        event_time: dto.event_time
          ? new Date(`${dto.event_date}T${dto.event_time}`)
          : null,
        status: dto.status ?? 'ACTIVE',
        attendees: dto.attendees ?? 0,
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

    return this.prisma.event.update({
      where: { id },
      data: {
        ...dto,
        event_date: dto.event_date && new Date(dto.event_date),
        event_time:
          dto.event_date && dto.event_time
            ? new Date(`${dto.event_date}T${dto.event_time}`)
            : undefined,
        updated_by: dto.created_by,
      },
    });
  }

  async deleteEvent(id: number, updated_by?: number) {
    await this.getEventById(id);

    return this.prisma.event.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        updated_by,
      },
    });
  }
}
