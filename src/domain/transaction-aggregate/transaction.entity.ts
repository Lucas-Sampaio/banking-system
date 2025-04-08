export class Transaction {
  constructor(
    private readonly _id: string,
    private readonly _sourceAccountId: string,
    private readonly _destinationAccountId: string | null,
    private readonly _amount: number,
    private readonly _reversalTargetId: string | null,
  ) {}

  private _createdAt: Date;

  public get CreatedAt(): Date {
    return this._createdAt;
  }
  public set CreatedAt(date: Date) {
    this._createdAt = date;
  }
  public get Id(): string {
    return this._id;
  }

  public get SourceAccountId(): string {
    return this._sourceAccountId;
  }

  public get DestinationAccountId(): string | null {
    return this._destinationAccountId;
  }

  public get Amount(): number {
    return this._amount;
  }

  public get ReversalTargetId(): string | null {
    return this._reversalTargetId;
  }
}
