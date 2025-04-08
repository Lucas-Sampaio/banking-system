import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.usecase';
import { LoginUserUseCase } from 'src/application/use-cases/user/login-user.usecase';
import { AuthService } from 'src/infra/auth/auth.service';
import { JwtStrategy } from 'src/infra/auth/jwt.strategy';
import { PrismaService } from 'src/infra/database/prisma.service';
import { PrismaUserRepository } from 'src/infra/repositories/prisma/user.repository';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    forwardRef(() => AccountModule),
  ],
  controllers: [AuthController],
  providers: [
    CreateUserUseCase,
    LoginUserUseCase,
    {
      provide: 'IUsersRepository',
      useClass: PrismaUserRepository,
    },
    PrismaService,
    AuthService,
    JwtStrategy,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
