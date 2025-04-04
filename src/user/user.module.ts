import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.usecase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { PrismaUserRepository } from 'src/infra/repositories/prisma/user.repository';
import { UserController } from 'src/presentation/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'IUsersRepository',
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
})
export class UserModule {}
