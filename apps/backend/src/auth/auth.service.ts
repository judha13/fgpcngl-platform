import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(dto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user || !user.hash || !(await bcrypt.compare(dto.password, user.hash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.userId,
            email: user.email,
            role: user.role,
        };
        const expiresInSeconds = 24 * 60 * 60;

        const access_token = this.jwtService.sign(payload, {
            expiresIn: expiresInSeconds,
        });

        const decoded = this.jwtService.decode(access_token) as any;
        const expiresAt = new Date(decoded.exp * 1000);

        await this.usersService.updateUserToken(
            user.userId,
            access_token,
            expiresAt,
        );

        return {
            access_token,
            expires_in: expiresInSeconds,
            expires_at: expiresAt,
            user: {
                id: user.userId,
                email: user.email || '',
                role: user.role || '',
            },
        };
    }

    async logout(userId: string): Promise<{ message: string }> {
        await this.usersService.clearUserToken(userId);
        return { message: 'Logged out successfully' };
    }

    async validateToken(userId: string, token: string): Promise<{ valid: boolean; message: string }> {
        const isValid = await this.usersService.isTokenValid(userId, token);

        if (!isValid) {
            return {
                valid: false,
                message: 'Token is expired, login again',
            };
        }

        return {
            valid: true,
            message: 'Token is valid',
        };
    }
}

