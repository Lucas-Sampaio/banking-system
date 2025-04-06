import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/infra/services/account.service';
import { TransactionNotFound } from 'src/domain/exceptions/transaction.errors';

@Injectable()
export class RefundTransferUserUseCase {
  constructor(private accountService: AccountService) {}

  async execute(
    id: string,
  ): Promise<{ id: string; amount: number; createdAt: Date }> {
    const result = await this.accountService.refundTransfer(id);
    if (!result) {
      throw new TransactionNotFound();
    }
    return {
      id: result.getId(),
      amount: result.getAmount(),
      createdAt: result.getCreatedAt(),
    };
  }
}
