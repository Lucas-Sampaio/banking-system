export class Account {
  constructor(
    public id: string,
    public number: bigint,
    public userId: string,
  ) {
    this.balance = 0;
  }

  public balance: number;
}
