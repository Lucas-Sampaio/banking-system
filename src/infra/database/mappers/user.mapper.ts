import { User as PrismaUser, Account as PrismaAccount } from '@prisma/client';
import { User } from 'src/domain/user-aggregate/user.entity';
import { AccountMapper } from './account.mapper';

export class UserMapper {
  static toDomain(raw: PrismaUser & { account: PrismaAccount | null }): User {
    const account =
      raw.account === null ? null : AccountMapper.toDomain(raw.account);
    const user = new User(raw.id, raw.name, raw.email, raw.password, account);

    return user;
  }
  static toDomainList(
    rawList: (PrismaUser & { account: PrismaAccount | null })[],
  ): User[] {
    return rawList.map((raw) => this.toDomain(raw));
  }

  static toPersistence(
    user: User,
  ): Omit<PrismaUser, 'createdAt' | 'updatedAt'> {
    return {
      id: user.Id,
      name: user.Name,
      email: user.Email,
      password: user.Password,
    };
  }
}
