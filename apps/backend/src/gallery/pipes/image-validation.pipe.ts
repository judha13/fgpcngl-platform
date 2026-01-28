import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
    private readonly allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
    ];
    private readonly maxSize = 5 * 1024 * 1024; // 5MB

    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException('No files uploaded');
        }

        const files = Array.isArray(value) ? value : [value];

        for (const file of files) {
            // Check file type
            if (!this.allowedMimeTypes.includes(file.mimetype)) {
                throw new BadRequestException(
                    `Invalid file type: ${file.mimetype}. Allowed types: ${this.allowedMimeTypes.join(', ')}`,
                );
            }

            // Check file size
            if (file.size > this.maxSize) {
                throw new BadRequestException(
                    `File ${file.originalname} exceeds maximum size of ${this.maxSize / (1024 * 1024)}MB`,
                );
            }

            // Check if file has valid extension
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            const fileExtension = file.originalname
                .toLowerCase()
                .substring(file.originalname.lastIndexOf('.'));

            if (!validExtensions.includes(fileExtension)) {
                throw new BadRequestException(
                    `Invalid file extension: ${fileExtension}`,
                );
            }
        }

        return value;
    }
}
