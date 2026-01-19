import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Members')
@ApiBearerAuth()
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) { }

    @Get()
    async getAll() {
        const data = await this.membersService.getAllMembers();
        return {
            success: true,
            data,
            count: data.length,
        };
    }

    @Post()
    async create(@Body() dto: CreateMemberDto) {
        const data = await this.membersService.createMember(dto);
        return {
            success: true,
            message: 'Member created successfully',
            data,
        };
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: string) {
        const data = await this.membersService.getMemberById(id);
        return {
            success: true,
            data,
        };
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: string,
        @Body() dto: UpdateMemberDto,
    ) {
        const data = await this.membersService.updateMember(id, dto);
        return {
            success: true,
            message: 'Member updated successfully',
            data,
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: string) {
        await this.membersService.deleteMember(id);
        return {
            success: true,
            message: 'Member deleted successfully',
        };
    }
}
