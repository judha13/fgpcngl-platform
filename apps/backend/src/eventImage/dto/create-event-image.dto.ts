import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateEventImageDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  eventId: number;

  @ApiProperty({ example: 2023 })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  year: number;

  @ApiProperty({ example: 'image.jpg' })
  @IsString()
  @IsNotEmpty()
  imagePath: string;
}
