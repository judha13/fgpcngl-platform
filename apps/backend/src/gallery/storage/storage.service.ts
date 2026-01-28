import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export interface StorageFile {
    path: string;
    url: string;
}

@Injectable()
export class StorageService {
    private s3Client: S3Client | null = null;
    private storageType: 'local' | 's3';
    private uploadPath: string;
    private bucketName: string;

    constructor(private configService: ConfigService) {
        this.storageType = this.configService.get<string>('STORAGE_TYPE', 'local') as 'local' | 's3';
        this.uploadPath = this.configService.get<string>('UPLOAD_PATH', './uploads/gallery');

        if (this.storageType === 's3') {
            const awsAccessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
            const awsSecretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
            const awsBucket = this.configService.get<string>('AWS_S3_BUCKET');

            // Validate required AWS credentials
            if (!awsAccessKeyId || !awsSecretAccessKey || !awsBucket) {
                throw new Error(
                    'AWS credentials are required when STORAGE_TYPE is set to "s3". ' +
                    'Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET environment variables.'
                );
            }

            this.bucketName = awsBucket;
            this.s3Client = new S3Client({
                region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
                credentials: {
                    accessKeyId: awsAccessKeyId,
                    secretAccessKey: awsSecretAccessKey,
                },
            });
        }
    }

    async uploadFile(
        file: Express.Multer.File,
        folderSlug: string,
    ): Promise<StorageFile> {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname.replace(/\s+/g, '-')}`;
        const relativePath = `${folderSlug}/${filename}`;

        if (this.storageType === 's3') {
            return this.uploadToS3(file, relativePath);
        } else {
            return this.uploadToLocal(file, relativePath);
        }
    }

    private async uploadToLocal(
        file: Express.Multer.File,
        relativePath: string,
    ): Promise<StorageFile> {
        const fullPath = join(this.uploadPath, relativePath);
        const directory = join(this.uploadPath, relativePath.split('/')[0]);

        // Ensure directory exists
        await fs.mkdir(directory, { recursive: true });

        // Write file
        await fs.writeFile(fullPath, file.buffer);

        return {
            path: relativePath,
            url: `/uploads/gallery/${relativePath}`,
        };
    }

    private async uploadToS3(
        file: Express.Multer.File,
        relativePath: string,
    ): Promise<StorageFile> {
        if (!this.s3Client) {
            throw new Error('S3 client is not initialized');
        }

        const key = `gallery/${relativePath}`;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        });

        await this.s3Client.send(command);

        const url = `https://${this.bucketName}.s3.amazonaws.com/${key}`;

        return {
            path: key,
            url,
        };
    }

    async deleteFile(storagePath: string): Promise<void> {
        if (this.storageType === 's3') {
            await this.deleteFromS3(storagePath);
        } else {
            await this.deleteFromLocal(storagePath);
        }
    }

    private async deleteFromLocal(relativePath: string): Promise<void> {
        try {
            const fullPath = join(this.uploadPath, relativePath);
            await fs.unlink(fullPath);
        } catch (error) {
            // File might not exist, which is fine
            console.warn(`Failed to delete file: ${relativePath}`, error);
        }
    }

    private async deleteFromS3(key: string): Promise<void> {
        if (!this.s3Client) {
            throw new Error('S3 client is not initialized');
        }

        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            await this.s3Client.send(command);
        } catch (error) {
            console.warn(`Failed to delete S3 object: ${key}`, error);
        }
    }

    async deleteFolder(folderSlug: string): Promise<void> {
        if (this.storageType === 'local') {
            try {
                const folderPath = join(this.uploadPath, folderSlug);
                await fs.rm(folderPath, { recursive: true, force: true });
            } catch (error) {
                console.warn(`Failed to delete folder: ${folderSlug}`, error);
            }
        }
        // For S3, individual file deletions handle cleanup
    }
}
