import { Injectable } from '@nestjs/common';
import { Account } from 'src/domain/user-aggregate/account.entity';
import { User } from 'src/domain/user-aggregate/user.entity';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async existsAccountNumber(numberAccount: bigint): Promise<boolean> {
    const count = await this.prisma.account.count({
      where: { number: numberAccount },
    });
    return count > 0;
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.' + id);
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
    //adicionar erro
    if (!user.account) {
      return null;
    }
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      new Account(user.account.id, user.account.number, user.id),
    );
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        account: {
          create: {
            number: user.getAccountNumber(),
          },
        },
      },
    });

    return;
  }
}
