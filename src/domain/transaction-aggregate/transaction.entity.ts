export enum TransactionType {
  Credit = 'Credito',
  Debit = 'Debito',
}

export class Transaction {
  constructor(
    public id: string,
    public sourceAccountId: string,
    public destinationAccountId: string,
    public value: number,
    public transactionType: TransactionType,
    public reversalTargetId: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
