import { Transaction as PrismaTransaction } from '@prisma/client';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';

export class TransactionMapper {
  static toDomain(raw: PrismaTransaction): Transaction {
    const transaction = new Transaction(
      raw.id,
      raw.sourceAccountId,
      raw.destinationAccountId,
      raw.amount,
      raw.reversalTargetId,
    );
    transaction.CreatedAt = raw.createdAt;
    return transaction;
  }
}
