import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from './storage/storage.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import sharp from 'sharp';

@Injectable()
export class GalleryService {
    constructor(
        private prisma: PrismaService,
        private storageService: StorageService,
    ) { }

    // Helper function to generate slug from name
    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Create a new gallery folder
    async createFolder(createFolderDto: CreateFolderDto) {
        const slug = this.generateSlug(createFolderDto.name);

        // Check if slug already exists
        const existing = await this.prisma.galleryFolder.findUnique({
            where: { slug },
        });

        if (existing) {
            throw new BadRequestException(
                `A folder with slug "${slug}" already exists. Please use a different name.`,
            );
        }

        return this.prisma.galleryFolder.create({
            data: {
                name: createFolderDto.name,
                slug,
                description: createFolderDto.description,
            },
        });
    }

    // Get all folders with pagination
    async getAllFolders(page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;

        const [folders, total] = await Promise.all([
            this.prisma.galleryFolder.findMany({
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                include: {
                    _count: {
                        select: { images: true },
                    },
                },
            }),
            this.prisma.galleryFolder.count(),
        ]);

        return {
            data: folders,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Get folder by ID with images
    async getFolderById(id: number, page: number = 1, limit: number = 50) {
        const folder = await this.prisma.galleryFolder.findUnique({
            where: { id },
        });

        if (!folder) {
            throw new NotFoundException(`Folder with ID ${id} not found`);
        }

        const skip = (page - 1) * limit;

        const [images, totalImages] = await Promise.all([
            this.prisma.galleryImage.findMany({
                where: { folderId: id },
                skip,
                take: limit,
                orderBy: { uploaded_at: 'desc' },
            }),
            this.prisma.galleryImage.count({
                where: { folderId: id },
            }),
        ]);

        return {
            ...folder,
            images: {
                data: images,
                meta: {
                    total: totalImages,
                    page,
                    limit,
                    totalPages: Math.ceil(totalImages / limit),
                },
            },
        };
    }

    // Update folder
    async updateFolder(id: number, updateFolderDto: UpdateFolderDto) {
        const folder = await this.prisma.galleryFolder.findUnique({
            where: { id },
        });

        if (!folder) {
            throw new NotFoundException(`Folder with ID ${id} not found`);
        }

        const updateData: any = { ...updateFolderDto };

        // If name is being updated, regenerate slug
        if (updateFolderDto.name) {
            const newSlug = this.generateSlug(updateFolderDto.name);

            // Check if new slug conflicts with existing folder
            if (newSlug !== folder.slug) {
                const existing = await this.prisma.galleryFolder.findUnique({
                    where: { slug: newSlug },
                });

                if (existing) {
                    throw new BadRequestException(
                        `A folder with slug "${newSlug}" already exists.`,
                    );
                }

                updateData.slug = newSlug;
            }
        }

        return this.prisma.galleryFolder.update({
            where: { id },
            data: updateData,
        });
    }

    // Delete folder with cascade (deletes all images)
    async deleteFolder(id: number) {
        const folder = await this.prisma.galleryFolder.findUnique({
            where: { id },
            include: { images: true },
        });

        if (!folder) {
            throw new NotFoundException(`Folder with ID ${id} not found`);
        }

        // Delete all physical files
        for (const image of folder.images) {
            await this.storageService.deleteFile(image.storagePath);
        }

        // Delete folder directory
        await this.storageService.deleteFolder(folder.slug);

        // Delete from database (cascade will handle images)
        await this.prisma.galleryFolder.delete({
            where: { id },
        });

        return { message: `Folder "${folder.name}" and ${folder.images.length} images deleted successfully` };
    }

    // Upload images to a folder
    async uploadImages(folderId: number, files: Express.Multer.File[]) {
        const folder = await this.prisma.galleryFolder.findUnique({
            where: { id: folderId },
        });

        if (!folder) {
            throw new NotFoundException(`Folder with ID ${folderId} not found`);
        }

        if (!files || files.length === 0) {
            throw new BadRequestException('No files provided');
        }

        const uploadedImages = [];

        try {
            for (const file of files) {
                // Get image dimensions
                let width: number | null = null;
                let height: number | null = null;

                try {
                    const metadata = await sharp(file.buffer).metadata();
                    width = metadata.width;
                    height = metadata.height;
                } catch (error) {
                    console.warn('Failed to extract image metadata:', error);
                }

                // Upload to storage
                const { path, url } = await this.storageService.uploadFile(
                    file,
                    folder.slug,
                );

                // Save to database
                const image = await this.prisma.galleryImage.create({
                    data: {
                        folderId: folder.id,
                        filename: file.originalname,
                        storagePath: path,
                        url,
                        size: file.size,
                        mimeType: file.mimetype,
                        width,
                        height,
                    },
                });

                uploadedImages.push(image);
            }

            // Update folder's image count and cover image if needed
            await this.updateFolderMetadata(folderId);

            return {
                message: `Successfully uploaded ${uploadedImages.length} images`,
                images: uploadedImages,
            };
        } catch (error) {
            // Rollback: delete any uploaded files
            for (const image of uploadedImages) {
                await this.storageService.deleteFile(image.storagePath);
                await this.prisma.galleryImage.delete({ where: { id: image.id } });
            }

            // throw new InternalServerErrorException(
            //     `Failed to upload images: ${error.message}`,
            // );
        }
    }

    // Get images by folder
    async getImagesByFolder(folderId: number, page: number = 1, limit: number = 50) {
        const folder = await this.prisma.galleryFolder.findUnique({
            where: { id: folderId },
        });

        if (!folder) {
            throw new NotFoundException(`Folder with ID ${folderId} not found`);
        }

        const skip = (page - 1) * limit;

        const [images, total] = await Promise.all([
            this.prisma.galleryImage.findMany({
                where: { folderId },
                skip,
                take: limit,
                orderBy: { uploaded_at: 'desc' },
            }),
            this.prisma.galleryImage.count({ where: { folderId } }),
        ]);

        return {
            data: images,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Delete a single image
    async deleteImage(id: number) {
        const image = await this.prisma.galleryImage.findUnique({
            where: { id },
        });

        if (!image) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }

        // Delete physical file
        await this.storageService.deleteFile(image.storagePath);

        // Delete from database
        await this.prisma.galleryImage.delete({
            where: { id },
        });

        // Update folder metadata
        await this.updateFolderMetadata(image.folderId);

        return { message: 'Image deleted successfully' };
    }

    // Update folder metadata (image count and cover image)
    private async updateFolderMetadata(folderId: number) {
        const imageCount = await this.prisma.galleryImage.count({
            where: { folderId },
        });

        const firstImage = await this.prisma.galleryImage.findFirst({
            where: { folderId },
            orderBy: { uploaded_at: 'asc' },
        });

        await this.prisma.galleryFolder.update({
            where: { id: folderId },
            data: {
                imageCount,
                coverImageUrl: firstImage?.url || null,
            },
        });
    }
}
