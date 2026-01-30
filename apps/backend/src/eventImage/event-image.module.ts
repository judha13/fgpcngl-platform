import { Module } from '@nestjs/common';
import { EventImageService } from './event-image.service';
import { EventImageController } from './event-image.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EventImageController],
  providers: [EventImageService, PrismaService],
})
export class EventImageModule {}
