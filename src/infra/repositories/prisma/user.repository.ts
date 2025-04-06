import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/user-aggregate/account.entity';
import { User } from 'src/domain/user-aggregate/user.entity';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { AccountMapper } from 'src/infra/database/mappers/account.mapper';
import { UserMapper } from 'src/infra/database/mappers/user.mapper';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}
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

  async getAccountsByNumbers(numbers: bigint[]): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        number: {
          in: numbers,
        },
      },
    });

    return AccountMapper.toDomainList(accounts);
  }

  async existsAccountNumber(numberAccount: bigint): Promise<boolean> {
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
    const account = user.getAccount();
    if (!account) {
      await this.prisma.user.create({
        data: UserMapper.toPersistence(user),
      });
    } else {
      await this.prisma.user.create({
        data: {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
          account: {
            create: {
              id: account.getId(),
              number: account.getNumber(),
            },
          },
        },
      });
    }

    return;
  }
}
