import { Module } from '@nestjs/common';
import { PrismaService } from './infra/database/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
