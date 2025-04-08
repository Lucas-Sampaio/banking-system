import { Account as PrismaAccount } from '@prisma/client';
import { Account } from 'src/domain/account/account.entity';

export class AccountMapper {
  static toDomain(raw: PrismaAccount): Account {
    const account = new Account(raw.id, raw.number, raw.userId ?? '');
    account.setBalance(raw.balance);
    return account;
  }
  static toDomainList(rawList: PrismaAccount[]): Account[] {
    return rawList.map((raw) => this.toDomain(raw));
  }
  static toPersistence(
    account: Account,
  ): Omit<PrismaAccount, 'createdAt' | 'updatedAt'> {
    return {
      id: account.Id,
      number: account.Number,
      balance: account.Balance,
      userId: account.UserId,
    };
  }
}
