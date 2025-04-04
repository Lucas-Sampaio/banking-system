// src/application/use-cases/create-user.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { CreateUserInputDto, CreateUserOutputDto } from './dto/create-user.dto';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { User } from 'src/domain/user-aggregate/user.entity';
import { Account } from 'src/domain/user-aggregate/account.entity';
import {
  AccountAlreadyExistsError,
  EmailAlreadyExistsError,
} from 'src/domain/exceptions/user.errors';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(input.email);
    }

    const existingAccount = await this.userRepository.existsAccountNumber(
      input.accountNumber,
    );

    if (existingAccount) {
      throw new AccountAlreadyExistsError(input.accountNumber);
    }
    const hashedPassword = await bcrypt.hash(input.password, 8);
    const userId = crypto.randomUUID();
    const accountId = crypto.randomUUID();
    const user = new User(
      userId,
      input.name,
      input.email,
      hashedPassword,
      new Account(accountId, input.accountNumber, userId),
    );

    await this.userRepository.create(user);

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      accountNumber: user.getAccountNumber(),
    };
  }
}
