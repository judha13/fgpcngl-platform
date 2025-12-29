import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Get()
    async getAll() {
        const data = await this.eventService.getAllEvents();
        return {
            success: true,
            count: data.length,
            data,
        };
    }

    @Post()
    async create(@Body() body: CreateEventDto) {
        const data = await this.eventService.createEvent(body);
        return {
            success: true,
            message: 'Event created successfully',
            data,
        };
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.eventService.getEventById(id);
        return { success: true, data };
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateEventDto,
    ) {
        const data = await this.eventService.updateEvent(id, body);
        return {
            success: true,
            message: 'Event updated successfully',
            data,
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.eventService.deleteEvent(id);
        return {
            success: true,
            message: 'Event deleted successfully',
        };
    }
}
