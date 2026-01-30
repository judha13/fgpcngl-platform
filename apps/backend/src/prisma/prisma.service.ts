import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    this.$use(async (_params, next) => {
      const result = await next(_params);

      return JSON.parse(
        JSON.stringify(result, (_, v) =>
          typeof v === 'bigint' ? v.toString() : v,
        ),
      );
    });

    await this.$connect();
  }

  async enableShutdownHooks() {
    await this.$disconnect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
