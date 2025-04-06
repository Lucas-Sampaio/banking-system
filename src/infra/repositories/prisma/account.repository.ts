import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/account/account.entity';
import { IAccountRepository } from 'src/domain/account/account.repository.interface';
import { AccountMapper } from 'src/infra/database/mappers/account.mapper';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class PrismaAccountRepository implements IAccountRepository {
  constructor(private prisma: PrismaService) {}

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
  // Método para transações
  static forTransaction(tx: any): IAccountRepository {
    return new PrismaAccountRepository(tx);
  }
}
