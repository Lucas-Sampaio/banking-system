// src/application/use-cases/create-user.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { CreateUserInputDto } from './dto/create-user.dto';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { User } from 'src/domain/user-aggregate/user.entity';
import { Account } from 'src/domain/account/account.entity';
import {
  AccountAlreadyExistsError,
  EmailAlreadyExistsError,
} from 'src/domain/exceptions/user.errors';
import { UserOutputDto } from './dto/user.dto';
import { IAccountRepository } from 'src/domain/account/account.repository.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(input: CreateUserInputDto): Promise<UserOutputDto> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError(input.email);
    }

    if (input.accountNumber) {
      const existingAccount = await this.accountRepository.existsAccountNumber(
        input.accountNumber,
      );

      if (existingAccount) {
        throw new AccountAlreadyExistsError(input.accountNumber);
      }
    }

    const hashedPassword = await bcrypt.hash(input.password, 8);
    const userId = crypto.randomUUID();
    const accountId = crypto.randomUUID();
    const user = new User(
      userId,
      input.name,
      input.email,
      hashedPassword,
      input.accountNumber === null
        ? null
        : new Account(accountId, input.accountNumber, userId),
    );

    await this.userRepository.create(user);

    return {
      id: user.Id,
      name: user.Name,
      email: user.Email,
      accountNumber: user.AccountNumber,
    };
  }
}
