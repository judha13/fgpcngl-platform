import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:8080',
        credentials: true,
    });

    // Configure static file serving for gallery uploads
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    app.use(helmet());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('ChurchHub API')
        .setDescription('The ChurchHub API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const PORT = process.env.PORT || 3001;
    await app.listen(PORT);
    console.log(`🚀 ChurchHub API is running on port ${PORT}`);
}
bootstrap();
