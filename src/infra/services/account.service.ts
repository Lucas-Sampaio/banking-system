import { Injectable } from '@nestjs/common';
import {
  AccountCannotSame,
  AccountNotFound,
} from 'src/domain/exceptions/account.errors';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';
import { PrismaService } from '../database/prisma.service';
import { PrismaTransactionRepository } from '../repositories/prisma/transaction.repository';
import { PrismaAccountRepository } from '../repositories/prisma/account.repository';
import {
  RefundNotCompleted,
  TransactionAlreadyReversedError,
} from 'src/domain/exceptions/transaction.errors';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async MakeTransfer(
    sourceAccountNumber: number,
    destinationAccountNumber: number,
    amount: number,
    reversalTargetId: string | null,
  ): Promise<Transaction> {
    if (sourceAccountNumber === destinationAccountNumber) {
      throw new AccountCannotSame();
    }
    return await this.prisma.$transaction(async (tx) => {
      const accountRepository = PrismaAccountRepository.forTransaction(tx);
      const transactionRepository = new PrismaTransactionRepository(tx);

      const accounts = await accountRepository.getAccountsByNumbers([
        sourceAccountNumber,
        destinationAccountNumber,
      ]);
      const sourceAccount = accounts.find(
        (account) => account.getNumber() === sourceAccountNumber,
      );

      if (!sourceAccount) {
        throw new AccountNotFound(sourceAccountNumber);
      }

      const destinationAccount = accounts.find(
        (account) => account.getNumber() === destinationAccountNumber,
      );

      if (!destinationAccount) {
        throw new AccountNotFound(destinationAccountNumber);
      }
      const transactionId = crypto.randomUUID();

      sourceAccount.makeDebit(amount);
      destinationAccount.makeCredit(amount);

      if (reversalTargetId) {
        if (await transactionRepository.hasbeenReversed(reversalTargetId)) {
          throw new TransactionAlreadyReversedError(reversalTargetId);
        }
      }
      const transaction = new Transaction(
        transactionId,
        sourceAccount.getId(),
        destinationAccount.getId(),
        amount,
        reversalTargetId,
      );

      const result = await transactionRepository.create(transaction);

      await accountRepository.updateBalance(
        sourceAccount.getId(),
        sourceAccount.getBalance(),
      );

      await accountRepository.updateBalance(
        destinationAccount.getId(),
        destinationAccount.getBalance(),
      );
      return result;
    });
  }
  async AddCredit(
    sourceAccountNumber: number,
    amount: number,
  ): Promise<Transaction> {
    return await this.prisma.$transaction(async (tx) => {
      const accountRepository = PrismaAccountRepository.forTransaction(tx);
      const transactionRepository = new PrismaTransactionRepository(tx);

      const accounts = await accountRepository.getAccountsByNumbers([
        sourceAccountNumber,
      ]);
      const sourceAccount = accounts.find(
        (account) => account.getNumber() === sourceAccountNumber,
      );

      if (!sourceAccount) {
        throw new AccountNotFound(sourceAccountNumber);
      }

      const transactionId = crypto.randomUUID();

      sourceAccount.makeCredit(amount);

      const transaction = new Transaction(
        transactionId,
        sourceAccount.getId(),
        null,
        amount,
        null,
      );

      const result = await transactionRepository.create(transaction);

      await accountRepository.updateBalance(
        sourceAccount.getId(),
        sourceAccount.getBalance(),
      );
      return result;
    });
  }
  async refundTransfer(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        sourceAccount: true,
        destinationAccount: true,
      },
    });

    if (!transaction) {
      return null;
    }

    if (!transaction.destinationAccount) {
      throw new RefundNotCompleted(transaction.sourceAccount.number);
    }
    const result = await this.MakeTransfer(
      transaction.destinationAccount.number,
      transaction.sourceAccount.number,
      transaction.amount,
      id,
    );
    return result;
  }
}
