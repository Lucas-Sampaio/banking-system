import { Inject, Injectable } from '@nestjs/common';
import { TransactionNotFound } from 'src/domain/exceptions/transaction.errors';
import { IAccountService } from 'src/domain/services/account.service.interface';

@Injectable()
export class RefundTransferUserUseCase {
  constructor(
    @Inject('IAccountService')
    private accountService: IAccountService,
  ) {}

  async execute(
    id: string,
  ): Promise<{ id: string; amount: number; createdAt: Date }> {
    const result = await this.accountService.refundTransfer(id);
    if (!result) {
      throw new TransactionNotFound();
    }
    return {
      id: result.Id,
      amount: result.Amount,
      createdAt: result.CreatedAt,
    };
  }
}
