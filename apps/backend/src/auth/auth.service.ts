import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);

        if (!user || !user.hash || !(await bcrypt.compare(dto.password, user.hash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.userId, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.userId,
                email: user.email,
                role: user.role,
            },
        };
    }
}
