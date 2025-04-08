import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/account/account.entity';
import { User } from 'src/domain/user-aggregate/user.entity';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { AccountMapper } from 'src/infra/database/mappers/account.mapper';
import { UserMapper } from 'src/infra/database/mappers/user.mapper';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        account: true,
      },
    });
    if (!user) {
      return null;
    }
    return UserMapper.toDomain(user);
  }
  async addAccount(userId: string, account: Account): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        account: {
          create: {
            id: account.Id,
            number: account.Number,
            balance: account.Balance,
          },
        },
      },
    });
    return;
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        account: true,
      },
    });
    return UserMapper.toDomainList(users);
  }
  async updateBalance(accountId: string, balance: number): Promise<void> {
    await this.prisma.account.update({
      where: { id: accountId },
      data: {
        balance: balance,
      },
    });
  }

  async getAccountsByNumbers(numbers: number[]): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        number: {
          in: numbers,
        },
      },
    });

    return AccountMapper.toDomainList(accounts);
  }

  async existsAccountNumber(numberAccount: number): Promise<boolean> {
    const count = await this.prisma.account.count({
      where: { number: numberAccount },
    });
    return count > 0;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        account: true,
      },
    });

    if (!user) {
      return null;
    }

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.account
        ? new Account(user.account.id, user.account.number, user.id)
        : null,
    );
  }

  async create(user: User): Promise<void> {
    const account = user.Account;
    if (!account) {
      await this.prisma.user.create({
        data: UserMapper.toPersistence(user),
      });
    } else {
      await this.prisma.user.create({
        data: {
          id: user.Id,
          name: user.Name,
          email: user.Email,
          password: user.Password,
          account: {
            create: {
              id: account.Id,
              number: account.Number,
            },
          },
        },
      });
    }

    return;
  }
}
