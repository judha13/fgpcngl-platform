import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EventModule } from './events/event.module';
import { MembersModule } from './members/members.module';

@Module({
    imports: [PrismaModule, EventModule, MembersModule],
})
export class AppModule { }
