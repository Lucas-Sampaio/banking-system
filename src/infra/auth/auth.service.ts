import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserPayload | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.Password))) {
      return {
        id: user.Id,
        name: user.Name,
        email: user.Email,
        accountNumber: user.AccountNumber?.toString(),
      };
    }
    return null;
  }

  login(user: UserPayload) {
    const payload = {
      username: user.name,
      sub: user.id,
      email: user.email,
      accountNumber: user.accountNumber,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export interface UserPayload {
  name: string;
  email: string;
  accountNumber: string | undefined;
  id: string;
}
