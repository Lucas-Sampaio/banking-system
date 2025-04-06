import { Transaction } from './transaction.entity';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  hasbeenReversed(id: string): Promise<boolean>;
}
