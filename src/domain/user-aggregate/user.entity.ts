import { Account } from '../account/account.entity';

export class User {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _email: string,
    private _password: string,
    private _account: Account | null,
  ) {}

  get Id(): string {
    return this._id;
  }
  get Name(): string {
    return this._name;
  }
  get Email(): string {
    return this._email;
  }
  get Password(): string {
    return this._password;
  }
  get AccountNumber(): number | undefined {
    return this._account?.Number;
  }
  get Account(): Account | null {
    return this._account;
  }
}
