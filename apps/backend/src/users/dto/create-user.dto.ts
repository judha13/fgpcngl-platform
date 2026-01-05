import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRolesEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsEmail()
    @IsOptional()
    @ApiProperty({ example: 'admin@gmail.com' })
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: '1234567890' })
    phoneNumber?: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({ example: 'admin@123' })
    password: string;

    @IsEnum(UserRolesEnum)
    @IsOptional()
    @ApiProperty({ example: 'ADMIN' })
    role?: UserRolesEnum;
}
