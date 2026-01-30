import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRolesEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @ApiProperty({ example: 'user@gmail.com' })
    email?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '0000000000' })
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'user@123' })
    password?: string;

    @IsOptional()
    @IsEnum(UserRolesEnum)
    @ApiProperty({ example: 'MEDIA' })
    role?: UserRolesEnum;
}
