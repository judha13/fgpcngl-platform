import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEvents() {
    return this.prisma.event.findMany({
      orderBy: { event_date: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        event_date: true,
        event_time: true,
        location: true,
        status: true,
        attendees: true,
        created_at: true,
      },
    });
  }

  async createEvent(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        event_date: new Date(dto.event_date),
        event_time: dto.event_time,
        location: dto.location,
        status: 'upcoming',
        attendees: 0,
      },
    });
  }

  async getEventById(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async updateEvent(id: number, dto: UpdateEventDto) {
    await this.getEventById(id);

    return this.prisma.event.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        event_date: dto.event_date
          ? new Date(dto.event_date)
          : undefined,
        event_time: dto.event_time,
        location: dto.location,
        status: dto.status,
        attendees: dto.attendees,
      },
    });
  }

  async deleteEvent(id: number) {
    await this.getEventById(id);

    return this.prisma.event.delete({
      where: { id },
    });
  }
}
