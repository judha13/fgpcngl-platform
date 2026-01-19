import {
    Body,
    Controller,
    Get,
    Post,
    Patch,
    Param,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register user' })
    register(@Body() dto: CreateUserDto) {
        return this.usersService.register(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user (deprecated - use /auth/login)' })
    login(@Body() dto: LoginDto) {
        return this.usersService.login(dto);
    }

    @Get(':email')
    // @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user by email' })
    findOne(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    findAll() {
        return this.usersService.getAll();
    }

    @Patch(':userId')
    // @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user' })
    update(
        @Param('userId') userId: string,
        @Body() dto: UpdateUserDto,
    ) {
        return this.usersService.updateUser(userId, dto);
    }
}
