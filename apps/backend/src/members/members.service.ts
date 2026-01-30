import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllMembers() {
        return this.prisma.member.findMany({
            orderBy: { created_at: 'desc' },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                join_date: true,
                status: true,
                created_at: true,
            },
        });
    }

    async createMember(dto: CreateMemberDto) {
        try {
            return await this.prisma.member.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    phone: dto.phone,
                    role: dto.role || 'Member',
                    status: 'active',
                    join_date: new Date(),
                },
            });
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }

    async getMemberById(id: string) {
        const member = await this.prisma.member.findUnique({
            where: { id },
        });

        if (!member) {
            throw new NotFoundException('Member not found');
        }
        return member;
    }

    async updateMember(id: string, dto: UpdateMemberDto) {
        await this.getMemberById(id); // Ensure exists

        return this.prisma.member.update({
            where: { id },
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                role: dto.role,
                status: dto.status,
            },
        });
    }

    async deleteMember(id: string) {
        await this.getMemberById(id); // Ensure exists

        return this.prisma.member.delete({
            where: { id },
        });
    }
}
