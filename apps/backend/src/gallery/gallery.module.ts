import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { StorageService } from './storage/storage.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,
        ConfigModule,
        MulterModule.register({
            storage: undefined, // Use memory storage for buffer access
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
                files: 20, // Max 20 files per request
            },
        }),
    ],
    controllers: [GalleryController],
    providers: [GalleryService, StorageService],
    exports: [GalleryService],
})
export class GalleryModule { }
