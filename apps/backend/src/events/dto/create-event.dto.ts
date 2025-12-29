import { IsDateString, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
    @ApiProperty({ example: 'Sunday Service' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'Weekly congregation gathering' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2023-12-25' })
    @IsDateString()
    event_date: string;

    @ApiPropertyOptional({ example: '10:00 AM' })
    @IsOptional()
    @IsString()
    event_time?: string;

    @ApiPropertyOptional({ example: 'Main Hall' })
    @IsOptional()
    @IsString()
    location?: string;
}
