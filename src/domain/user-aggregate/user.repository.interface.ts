import { User } from './user.entity';

export interface IUsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
  existsAccountNumber(numberAccount: bigint): Promise<boolean>;
}
