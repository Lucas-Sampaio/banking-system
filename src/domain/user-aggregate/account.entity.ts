export class Account {
  constructor(
    private id: string,
    private number: bigint,
    private userId: string,
  ) {
    this.balance = 0;
  }

  private balance: number;

  public getId(): string {
    return this.id;
  }

  public getNumber(): bigint {
    return this.number;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getBalance(): number {
    return this.balance;
  }
}
