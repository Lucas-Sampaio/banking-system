export class Transaction {
  constructor(
    private id: string,
    private sourceAccountId: string,
    private destinationAccountId: string,
    private amount: number,
    private reversalTargetId: string | null,
  ) {}

  private CreatedAt: Date;

  public getCreatedAt(): Date {
    return this.CreatedAt;
  }
  public setCreatedAt(date: Date) {
    this.CreatedAt = date;
  }
  public getId(): string {
    return this.id;
  }

  public getSourceAccountId(): string {
    return this.sourceAccountId;
  }

  public getDestinationAccountId(): string {
    return this.destinationAccountId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getReversalTargetId(): string | null {
    return this.reversalTargetId;
  }
}
