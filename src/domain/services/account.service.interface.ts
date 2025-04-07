import { Transaction } from '../transaction-aggregate/transaction.entity';

export interface IAccountService {
  MakeTransfer(
    sourceAccountNumber: number,
    destinationAccountNumber: number,
    amount: number,
    reversalTargetId: string | null,
  ): Promise<Transaction>;

  AddCredit(sourceAccountNumber: number, amount: number): Promise<Transaction>;
  refundTransfer(transactionId: string): Promise<Transaction | null>;
}
