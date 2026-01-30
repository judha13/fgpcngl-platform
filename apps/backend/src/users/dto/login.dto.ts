import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @IsEmail()
    @ApiProperty({ example: 'admin@gmail.com' })
    email: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({ example: 'admin@123' })
    password: string;
}
