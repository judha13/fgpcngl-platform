import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  IsInt,
} from 'class-validator';
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

  @ApiPropertyOptional({ example: '10:00' })
  @IsOptional()
  @IsString()
  event_time?: string;

  @ApiPropertyOptional({ example: 'Main Hall' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/live/xyz' })
  @IsOptional()
  @IsUrl()
  live_stream_url?: string;

  @ApiPropertyOptional({ example: 'https://example.com/register' })
  @IsOptional()
  @IsUrl()
  registration_url?: string;

  @ApiPropertyOptional({ example: 'https://cdn.app.com/cover.jpg' })
  @IsOptional()
  @IsString()
  cover_image?: string;

  @ApiPropertyOptional({ example: 'https://cdn.app.com/thumb.jpg' })
  @IsOptional()
  @IsString()
  thumbnail_image?: string;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsInt()
  attendees?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  created_by?: number;
}
