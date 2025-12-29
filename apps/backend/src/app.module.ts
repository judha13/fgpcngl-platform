import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EventModule } from './events/event.module';
import { MembersModule } from './members/members.module';
import { EventImageModule } from './eventImage/event-image.module';

@Module({
    imports: [
        PrismaModule,
        EventModule,
        MembersModule,
        EventImageModule,
    ],
})
export class AppModule { }
