// src/application/use-cases/create-user.usecase.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/infra/auth/auth.service';
import { LoginUserInputDto } from './dto/login-user.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(input: LoginUserInputDto) {
    const user = await this.authService.validateUser(
      input.email,
      input.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
