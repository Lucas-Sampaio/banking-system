import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from 'src/infra/services/account.service';
import { TransactionNotFound } from 'src/domain/exceptions/transaction.errors';
import { RefundTransferUserUseCase } from 'src/application/use-cases/account/refund-transfer.usercase';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';

describe('RefundTransferUserUseCase', () => {
  let refundTransferUserUseCase: RefundTransferUserUseCase;
  let accountService: jest.Mocked<AccountService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundTransferUserUseCase,
        {
          provide: AccountService,
          useValue: {
            refundTransfer: jest.fn(),
          },
        },
      ],
    }).compile();

    refundTransferUserUseCase = module.get<RefundTransferUserUseCase>(
      RefundTransferUserUseCase,
    );
    accountService = module.get(AccountService);
  });

  it('should refund a transfer successfully and return transaction details', async () => {
    const transactionId = 'transaction-id';

    const mockTransaction: Transaction = {
      getId: jest.fn().mockReturnValue(transactionId),
      getAmount: jest.fn().mockReturnValue(100),
      getCreatedAt: jest.fn().mockReturnValue(new Date('2025-04-06T12:00:00Z')),
    } as unknown as Transaction;

    accountService.refundTransfer.mockResolvedValue(mockTransaction);

    const result = await refundTransferUserUseCase.execute(transactionId);

    expect(accountService.refundTransfer).toHaveBeenCalledWith(transactionId);
    expect(result).toEqual({
      id: transactionId,
      amount: 100,
      createdAt: new Date('2025-04-06T12:00:00Z'),
    });
  });

  it('should throw TransactionNotFound if the transaction does not exist', async () => {
    const transactionId = 'non-existent-transaction-id';

    accountService.refundTransfer.mockResolvedValue(null);

    await expect(
      refundTransferUserUseCase.execute(transactionId),
    ).rejects.toThrow(TransactionNotFound);

    expect(accountService.refundTransfer).toHaveBeenCalledWith(transactionId);
  });
});
