import { Account } from '../account/account.entity';

export interface IAccountRepository {
  existsAccountNumber(numberAccount: number): Promise<boolean>;
  getAccountsByNumbers(numbers: number[]): Promise<Account[]>;
  updateBalance(accountId: string, balance: number): Promise<void>;
}
