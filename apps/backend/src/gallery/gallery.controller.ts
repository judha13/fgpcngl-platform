import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    Query,
    UseInterceptors,
    UploadedFiles,
    ParseIntPipe,
    DefaultValuePipe,
    UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiConsumes,
    ApiBody,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderResponseDto, ImageResponseDto } from './dto/folder-response.dto';
import { ImageValidationPipe } from './pipes/image-validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Gallery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    // ===== FOLDER ENDPOINTS =====

    @Post('folders')
    @ApiOperation({ summary: 'Create a new gallery folder' })
    @ApiResponse({
        status: 201,
        description: 'Folder created successfully',
        type: FolderResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation error or duplicate slug' })
    async createFolder(@Body() createFolderDto: CreateFolderDto) {
        return this.galleryService.createFolder(createFolderDto);
    }

    @Get('folders')
    @ApiOperation({ summary: 'Get all gallery folders with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
    @ApiResponse({
        status: 200,
        description: 'List of folders with pagination metadata',
    })
    async getAllFolders(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    ) {
        return this.galleryService.getAllFolders(page, limit);
    }

    @Get('folders/:id')
    @ApiOperation({ summary: 'Get folder by ID with images' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
    @ApiResponse({
        status: 200,
        description: 'Folder details with images',
    })
    @ApiResponse({ status: 404, description: 'Folder not found' })
    async getFolderById(
        @Param('id', ParseIntPipe) id: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    ) {
        return this.galleryService.getFolderById(id, page, limit);
    }

    @Patch('folders/:id')
    @ApiOperation({ summary: 'Update folder details' })
    @ApiResponse({
        status: 200,
        description: 'Folder updated successfully',
        type: FolderResponseDto,
    })
    @ApiResponse({ status: 404, description: 'Folder not found' })
    async updateFolder(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFolderDto: UpdateFolderDto,
    ) {
        return this.galleryService.updateFolder(id, updateFolderDto);
    }

    @Delete('folders/:id')
    @ApiOperation({ summary: 'Delete folder and all its images (cascade)' })
    @ApiResponse({
        status: 200,
        description: 'Folder and images deleted successfully',
    })
    @ApiResponse({ status: 404, description: 'Folder not found' })
    async deleteFolder(@Param('id', ParseIntPipe) id: number) {
        return this.galleryService.deleteFolder(id);
    }

    // ===== IMAGE ENDPOINTS =====

    @Post('folders/:folderId/images')
    @ApiOperation({ summary: 'Upload multiple images to a folder' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Images uploaded successfully',
    })
    @ApiResponse({ status: 400, description: 'Invalid file type or size' })
    @ApiResponse({ status: 404, description: 'Folder not found' })
    @UseInterceptors(FilesInterceptor('files', 20)) // Max 20 files per upload
    async uploadImages(
        @Param('folderId', ParseIntPipe) folderId: number,
        @UploadedFiles(new ImageValidationPipe()) files: Express.Multer.File[],
    ) {
        return this.galleryService.uploadImages(folderId, files);
    }

    @Get('folders/:folderId/images')
    @ApiOperation({ summary: 'Get all images in a folder with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
    @ApiResponse({
        status: 200,
        description: 'List of images with pagination metadata',
        type: [ImageResponseDto],
    })
    @ApiResponse({ status: 404, description: 'Folder not found' })
    async getImagesByFolder(
        @Param('folderId', ParseIntPipe) folderId: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    ) {
        return this.galleryService.getImagesByFolder(folderId, page, limit);
    }

    @Delete('images/:id')
    @ApiOperation({ summary: 'Delete a single image' })
    @ApiResponse({
        status: 200,
        description: 'Image deleted successfully',
    })
    @ApiResponse({ status: 404, description: 'Image not found' })
    async deleteImage(@Param('id', ParseIntPipe) id: number) {
        return this.galleryService.deleteImage(id);
    }
}
