import { Module } from '@nestjs/common';
import { FindAllUserUseCase } from 'src/application/use-cases/user/findall-user.usecase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { PrismaUserRepository } from 'src/infra/repositories/prisma/user.repository';
import { UserController } from 'src/presentation/controllers/user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    FindAllUserUseCase,
    {
      provide: 'IUsersRepository',
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
})
export class UserModule {}
