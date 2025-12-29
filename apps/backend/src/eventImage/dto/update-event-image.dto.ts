import { PartialType } from '@nestjs/mapped-types';
import { CreateEventImageDto } from './create-event-image.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventImageDto extends PartialType(CreateEventImageDto) {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  eventId?: string;

  @ApiProperty({ example: 2023 })
  year?: number;

  @ApiProperty({ example: 'image.jpg' })
  imagePath?: string;
}
