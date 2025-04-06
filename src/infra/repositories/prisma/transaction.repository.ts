import { Prisma } from '@prisma/client';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';
import { ITransactionRepository } from 'src/domain/transaction-aggregate/transaction.repository.interface';
import { TransactionMapper } from 'src/infra/database/mappers/transaction.mapper';

export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private prisma: Prisma.TransactionClient) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const transactionOutput = await this.prisma.transaction.create({
      data: {
        sourceAccountId: transaction.getSourceAccountId(),
        destinationAccountId: transaction.getDestinationAccountId(),
        amount: transaction.getAmount(),
        id: transaction.getId(),
      },
    });

    return TransactionMapper.toDomain(transactionOutput);
  }
}
