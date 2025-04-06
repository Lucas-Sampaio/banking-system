import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';
import { ITransactionRepository } from 'src/domain/transaction-aggregate/transaction.repository.interface';
import { TransactionMapper } from 'src/infra/database/mappers/transaction.mapper';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private prisma: PrismaService) {}

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
