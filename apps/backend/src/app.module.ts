import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EventModule } from './events/event.module';
import { MembersModule } from './members/members.module';
import { EventImageModule } from './eventImage/event-image.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
    imports: [
        PrismaModule,
        EventModule,
        MembersModule,
        EventImageModule,
        AuthModule,
        UsersModule,
        GalleryModule,
    ],
})
export class AppModule { }
