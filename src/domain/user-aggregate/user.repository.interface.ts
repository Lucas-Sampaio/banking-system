import { Account } from '../account/account.entity';
import { User } from './user.entity';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
  addAccount(userId: string, Account: Account): Promise<void>;
}
