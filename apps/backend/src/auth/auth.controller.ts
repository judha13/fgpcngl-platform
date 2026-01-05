import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register user' })
    async create(@Body() dto: LoginDto) {
        const data = await this.authService.login(dto);
        return { success: true, data };
    }
}