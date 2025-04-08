// src/application/use-cases/create-user.usecase.ts
import { Inject, Injectable } from '@nestjs/common';

import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { Account } from 'src/domain/account/account.entity';
import {
  AccountAlreadyExistsError,
  UserAlreadyExistingAccountError,
  UserNotFound,
} from 'src/domain/exceptions/user.errors';
import { IAccountRepository } from 'src/domain/account/account.repository.interface';
import { AddUserAccountInputDto } from './dto/add-account.dto';

@Injectable()
export class AddUserAccountUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  async execute(input: AddUserAccountInputDto): Promise<void> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new UserNotFound(input.id);
    }

    if (user.AccountNumber) {
      throw new UserAlreadyExistingAccountError();
    }

    if (input.accountNumber) {
      const existingAccount = await this.accountRepository.existsAccountNumber(
        input.accountNumber,
      );

      if (existingAccount && user.AccountNumber !== input.accountNumber) {
        throw new AccountAlreadyExistsError(input.accountNumber);
      }
    }

    const accountId = crypto.randomUUID();
    const account = new Account(accountId, input.accountNumber, user.Id);
    await this.userRepository.addAccount(user.Id, account);
    return;
  }
}
