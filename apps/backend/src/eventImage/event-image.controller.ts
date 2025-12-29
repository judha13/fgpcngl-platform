import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventImageService } from './event-image.service';
import { CreateEventImageDto } from './dto/create-event-image.dto';
import { UpdateEventImageDto } from './dto/update-event-image.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('event-images')
@ApiTags('Event Images')
@ApiBearerAuth()
export class EventImageController {
  constructor(private readonly service: EventImageService) {}

  @Post()
  @ApiOperation({ summary: 'Create event image' })
  async create(@Body() dto: CreateEventImageDto) {
    const data = await this.service.create(dto);
    return { success: true, data };
  }

  @Get()
  @ApiOperation({ summary: 'Get all event images' })
  async findAll() {
    const data = await this.service.findAll();
    return { success: true, count: data.length, data };
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get event images by event id' })
  async findByEvent(@Param('eventId') eventId: string) {
    const data = await this.service.findByEvent(eventId);
    return { success: true, count: data.length, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event image by id' })
  async findOne(@Param('id') id: string) {
    const data = await this.service.findOne(id);
    return { success: true, data };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update event image by id' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventImageDto,
  ) {
    const data = await this.service.update(id, dto);
    return { success: true, data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete event image by id' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return { success: true, message: 'Event image deleted' };
  }
}
