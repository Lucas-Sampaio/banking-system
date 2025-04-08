import { Prisma } from '@prisma/client';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';
import { ITransactionRepository } from 'src/domain/transaction-aggregate/transaction.repository.interface';
import { TransactionMapper } from 'src/infra/database/mappers/transaction.mapper';

export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private prisma: Prisma.TransactionClient) {}
  async hasbeenReversed(id: string): Promise<boolean> {
    const count = await this.prisma.transaction.count({
      where: { reversalTargetId: id },
    });
    console.log('count', count);
    return count > 0;
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const transactionOutput = await this.prisma.transaction.create({
      data: {
        sourceAccountId: transaction.SourceAccountId,
        destinationAccountId: transaction.DestinationAccountId,
        amount: transaction.Amount,
        id: transaction.Id,
        reversalTargetId: transaction.ReversalTargetId,
      },
    });

    return TransactionMapper.toDomain(transactionOutput);
  }
}
