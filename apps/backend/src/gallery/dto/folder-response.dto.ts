import { ApiProperty } from '@nestjs/swagger';

export class FolderResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    slug: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    coverImageUrl?: string;

    @ApiProperty()
    imageCount: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class ImageResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    folderId: number;

    @ApiProperty()
    filename: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    size: number;

    @ApiProperty()
    mimeType: string;

    @ApiProperty({ required: false })
    width?: number;

    @ApiProperty({ required: false })
    height?: number;

    @ApiProperty()
    uploadedAt: Date;
}
