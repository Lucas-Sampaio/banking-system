import { InsufficientFunds } from '../exceptions/account.errors';

export class Account {
  constructor(
    private readonly _id: string,
    private _number: number,
    private _userId: string,
  ) {
    this.balance = 0;
  }

  private balance: number;

  public get Id(): string {
    return this._id;
  }

  public get Number(): number {
    return this._number;
  }

  public get UserId(): string {
    return this._userId;
  }

  public get Balance(): number {
    return this.balance;
  }

  public setBalance(balance: number): void {
    this.balance = balance;
  }
  public makeDebit(value: number): void {
    if (value > this.balance) {
      throw new InsufficientFunds();
    }
    this.balance -= value;
  }
  public makeCredit(value: number): void {
    this.balance += value;
  }
}
