import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, Users, UserRolesEnum } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async register(dto: CreateUserDto) {
        try {
            const user = await this.create(dto);

            return {
                success: true,
                message: 'User registered successfully',
                data: {
                    userId: user.userId,
                    email: user.email,
                    phoneNumber: user.phoneNumber?.toString(),
                    role: user.role,
                },
            };
        } catch (error) {
            throw new HttpException(
                (error as Error).message || 'Failed to register user',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto.email, dto.password);

        if (!user) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return {
            success: true,
            message: 'Login successful',
            data: user,
        };
    }

    async getByEmail(email: string) {
        const user = await this.findByEmail(email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return {
            success: true,
            data: {
                userId: user.userId,
                email: user.email,
                phoneNumber: user.phoneNumber?.toString(),
                role: user.role,
            },
        };
    }

    async getAll(): Promise<Users[]> {
        return this.prisma.users.findMany();
    }

    async updateUser(userId: string, dto: UpdateUserDto) {
        const user = await this.prisma.users.findUnique({
            where: { userId },
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const data: Prisma.UsersUpdateInput = {};

        if (dto.email) data.email = dto.email;
        if (dto.role) data.role = dto.role;

        if (dto.phoneNumber) {
            data.phoneNumber = BigInt(dto.phoneNumber);
        }

        if (dto.password) {
            data.hash = await bcrypt.hash(dto.password, 10);
        }

        const updated = await this.prisma.users.update({
            where: { userId },
            data,
        });

        return {
            success: true,
            message: 'User updated successfully',
            data: {
                userId: updated.userId,
                email: updated.email,
                phoneNumber: updated.phoneNumber?.toString(),
                role: updated.role,
            },
        };
    }

    async findByEmail(email: string): Promise<Users | null> {
        return this.prisma.users.findUnique({ where: { email } });
    }

    async findById(userId: string): Promise<Users | null> {
        return this.prisma.users.findUnique({ where: { userId } });
    }

    async create(dto: CreateUserDto): Promise<Users> {
        const hash = await bcrypt.hash(dto.password, 10);

        const data: Prisma.UsersCreateInput = {
            email: dto.email,
            phoneNumber: dto.phoneNumber
                ? BigInt(dto.phoneNumber)
                : undefined,
            hash,
            role: dto.role || UserRolesEnum.OFFICE,
        };

        return this.prisma.users.create({ data });
    }

    async validateUser(email: string, password: string) {
        const user = await this.findByEmail(email);
        if (!user || !user.hash) return null;

        const valid = await bcrypt.compare(password, user.hash);
        if (!valid) return null;

        const { hash, ...rest } = user;

        return {
            ...rest,
            phoneNumber: rest.phoneNumber?.toString(),
        };
    }

    // Token management methods
    async updateUserToken(userId: string, token: string, expiresAt: Date): Promise<void> {
        await this.prisma.users.update({
            where: { userId },
            data: {
                activeToken: token,
                tokenExpiresAt: expiresAt,
            },
        });
    }

    async clearUserToken(userId: string): Promise<void> {
        await this.prisma.users.update({
            where: { userId },
            data: {
                activeToken: null,
                tokenExpiresAt: null,
            },
        });
    }

    async getUserByToken(token: string): Promise<Users | null> {
        return this.prisma.users.findFirst({
            where: { activeToken: token },
        });
    }

    async isTokenValid(userId: string, token: string): Promise<boolean> {
        const user = await this.findById(userId);
        if (!user || !user.activeToken || !user.tokenExpiresAt) {
            return false;
        }

        // Check if token matches and is not expired
        const isTokenMatch = user.activeToken === token;
        const isNotExpired = new Date() < user.tokenExpiresAt;

        return isTokenMatch && isNotExpired;
    }
}
