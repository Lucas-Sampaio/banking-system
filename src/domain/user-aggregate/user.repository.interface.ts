import { User } from './user.entity';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
}
