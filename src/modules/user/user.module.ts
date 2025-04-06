import { Module } from '@nestjs/common';
import { FindAllUserUseCase } from 'src/application/use-cases/user/findall-user.usecase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { PrismaUserRepository } from 'src/infra/repositories/prisma/user.repository';
import { UserController } from 'src/presentation/controllers/user.controller';
import { AuthModule } from '../auth/auth.module';
import { AddUserAccountUseCase } from 'src/application/use-cases/user/add-account.usecase';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [AuthModule, AccountModule],
  controllers: [UserController],
  providers: [
    FindAllUserUseCase,
    AddUserAccountUseCase,
    {
      provide: 'IUsersRepository',
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
})
export class UserModule {}
