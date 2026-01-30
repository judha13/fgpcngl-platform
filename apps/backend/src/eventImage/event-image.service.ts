import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventImageDto } from './dto/create-event-image.dto';
import { UpdateEventImageDto } from './dto/update-event-image.dto';

@Injectable()
export class EventImageService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateEventImageDto) {
    const eventExists = await this.prisma.event.findUnique({
      where: { id: dto.eventId },
      select: { id: true },
    });

    if (!eventExists) {
      throw new NotFoundException(`Event not found for id=${dto.eventId}`);
    }

    return this.prisma.eventImage.create({
      data: {
        year: dto.year,
        imagePath: dto.imagePath,
        event: { connect: { id: dto.eventId } },
      },
    });
  }

  async findAll() {
    return this.prisma.eventImage.findMany({
      orderBy: { created_at: 'desc' },
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
