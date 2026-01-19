import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
export class EventController {
    constructor(private readonly service: EventService) { }

    @Get()
    async getAll() {
        const data = await this.service.getAllEvents();
        return { success: true, count: data.length, data };
    }

    @Post()
    async create(@Body() dto: CreateEventDto) {
        return {
            success: true,
            message: 'Event created successfully',
            data: await this.service.createEvent(dto),
        };
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return { success: true, data: await this.service.getEventById(id) };
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateEventDto,
    ) {
        return {
            success: true,
            message: 'Event updated successfully',
            data: await this.service.updateEvent(id, dto),
        };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.service.deleteEvent(id);
        return { success: true, message: 'Event deleted successfully' };
    }
}
