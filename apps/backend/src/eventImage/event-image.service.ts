import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventImageDto } from './dto/create-event-image.dto';
import { UpdateEventImageDto } from './dto/update-event-image.dto';

@Injectable()
export class EventImageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventImageDto) {
    return this.prisma.eventImage.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.eventImage.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findByEvent(eventId: number) {
    return this.prisma.eventImage.findMany({
      where: { eventId },
      orderBy: { year: 'desc' },
    });
  }

  async findOne(id: number) {
    const image = await this.prisma.eventImage.findUnique({
      where: { id },
    });

    if (!image) {
      throw new NotFoundException('Event image not found');
    }

    return image;
  }

  async update(id: number, dto: UpdateEventImageDto) {
    await this.findOne(id);

    return this.prisma.eventImage.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.eventImage.delete({
      where: { id },
    });
  }
}
