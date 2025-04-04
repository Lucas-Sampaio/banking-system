import { Account } from './account.entity';

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private account: Account,
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
  getAccountNumber(): bigint {
    return this.account.getNumber();
  }
}
