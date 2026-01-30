import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFolderDto {
    @ApiProperty({
        description: 'Display name for the gallery folder',
        example: 'New Year 2026',
        minLength: 1,
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'Optional description for the folder',
        example: 'Pictures from our New Year celebration',
        maxLength: 500,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;
}
