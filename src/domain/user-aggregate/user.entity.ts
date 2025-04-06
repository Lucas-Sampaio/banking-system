import { Account } from '../account/account.entity';

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private account: Account | null,
  ) {}

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }
  getPassword(): string {
    return this.password;
  }
  getAccountNumber(): number | undefined {
    return this.account?.getNumber();
  }
  getAccount(): Account | null {
    return this.account;
  }
}
