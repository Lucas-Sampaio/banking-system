import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountController } from 'src/presentation/controllers/account.controller';
import { MakeTransferUserUseCase } from 'src/application/use-cases/account/make-bank-transfer.usecase';
import { PrismaAccountRepository } from 'src/infra/repositories/prisma/account.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { TransferService } from 'src/infra/services/transfer.service';

@Module({
  imports: [AuthModule],
  controllers: [AccountController],
  providers: [
    MakeTransferUserUseCase,
    {
      provide: 'IAccountRepository',
      useClass: PrismaAccountRepository,
    },
    PrismaService,
    TransferService,
  ],
})
export class AccountModule {}
