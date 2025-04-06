import { Account } from './account.entity';
import { User } from './user.entity';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
  existsAccountNumber(numberAccount: bigint): Promise<boolean>;
  getAccountsByNumbers(numbers: bigint[]): Promise<Account[]>;
  updateBalance(accountId: string, balance: number): Promise<void>;
}
