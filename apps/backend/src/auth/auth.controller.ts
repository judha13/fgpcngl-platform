import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: AuthResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() dto: LoginDto) {
        const data = await this.authService.login(dto);
        return { success: true, data };
    }

    @Post('logout')
    // @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'User logout - invalidates current token' })
    @ApiResponse({ status: 200, description: 'Logged out successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async logout(@Request() req: any) {
        const data = await this.authService.logout(req.user.userId);
        return { success: true, ...data };
    }

    @Get('validate-token')
    // @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Validate current token' })
    @ApiResponse({ status: 200, description: 'Token validation result' })
    @ApiResponse({ status: 401, description: 'Token is expired or invalid' })
    async validateToken(@Request() req: any) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.replace('Bearer ', '');
        const data = await this.authService.validateToken(req.user.userId, token);
        return { success: data.valid, ...data };
    }
}
