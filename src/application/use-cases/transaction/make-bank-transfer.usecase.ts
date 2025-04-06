import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from 'src/domain/transaction-aggregate/transaction.repository.interface';
import {
  MakeTransferInputDto,
  MakeTransferOutputDto,
} from './dto/make-bank-transfer.dto';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { AccountNotFound } from 'src/domain/exceptions/account.errors';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';

@Injectable()
export class MakeTransferUserUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute(input: MakeTransferInputDto): Promise<MakeTransferOutputDto> {
    const accounts = await this.userRepository.getAccountsByNumbers([
      input.sourceAccountNumber,
      input.destinationAccountNumber,
    ]);
    const sourceAccount = accounts.find(
      (account) => account.getNumber() === input.sourceAccountNumber,
    );

    if (!sourceAccount) {
      throw new AccountNotFound(input.sourceAccountNumber);
    }

    const destinationAccount = accounts.find(
      (account) => account.getNumber() === input.sourceAccountNumber,
    );

    if (!destinationAccount) {
      throw new AccountNotFound(input.sourceAccountNumber);
    }

    sourceAccount.makeDebit(input.amount);
    destinationAccount.makeCredit(input.amount);

    const transactionId = crypto.randomUUID();
    const transaction = new Transaction(
      transactionId,
      sourceAccount.getId(),
      destinationAccount.getId(),
      input.amount,
      null,
    );

    const result = await this.transactionRepository.create(transaction);
    await this.userRepository.updateBalance(
      sourceAccount.getId(),
      sourceAccount.getBalance(),
    );
    await this.userRepository.updateBalance(
      destinationAccount.getId(),
      destinationAccount.getBalance(),
    );

    return {
      transactionId: result.getId(),
      sourceAccountNumber: sourceAccount.getNumber(),
      destinationAccountNumber: destinationAccount.getNumber(),
      amount: result.getAmount(),
      createdAt: result.getCreatedAt(),
    };
  }
}
