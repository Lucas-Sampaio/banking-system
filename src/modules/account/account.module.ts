import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccountController } from 'src/presentation/controllers/account.controller';
import { MakeTransferUserUseCase } from 'src/application/use-cases/account/make-bank-transfer.usecase';
import { PrismaAccountRepository } from 'src/infra/repositories/prisma/account.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { AccountService } from 'src/infra/services/account.service';
import { AddCreditUserUseCase } from 'src/application/use-cases/account/add-credit.usecase';
import { RefundTransferUserUseCase } from 'src/application/use-cases/account/refund-transfer.usercase';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AccountController],
  providers: [
    MakeTransferUserUseCase,
    AddCreditUserUseCase,
    RefundTransferUserUseCase,
    {
      provide: 'IAccountRepository',
      useClass: PrismaAccountRepository,
    },
    {
      provide: 'IAccountService',
      useClass: AccountService,
    },
    PrismaService,
  ],
  exports: ['IAccountRepository'],
})
export class AccountModule {}
