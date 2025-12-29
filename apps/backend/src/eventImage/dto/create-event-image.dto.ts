import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateEventImageDto {
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  eventId: string;

  @IsInt()
  @ApiProperty({ example: 2023 })
  year: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'image.jpg' })
  imagePath: string;
}
