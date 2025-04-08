import { Test, TestingModule } from '@nestjs/testing';
import { TransactionNotFound } from 'src/domain/exceptions/transaction.errors';
import { RefundTransferUserUseCase } from 'src/application/use-cases/account/refund-transfer.usercase';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';
import { IAccountService } from 'src/domain/services/account.service.interface';

describe('RefundTransferUserUseCase', () => {
  let refundTransferUserUseCase: RefundTransferUserUseCase;
  let accountService: jest.Mocked<IAccountService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefundTransferUserUseCase,
        {
          provide: 'IAccountService',
          useValue: {
            refundTransfer: jest.fn(),
          },
        },
      ],
    }).compile();

    refundTransferUserUseCase = module.get<RefundTransferUserUseCase>(
      RefundTransferUserUseCase,
    );
    accountService = module.get('IAccountService');
  });

  it('should refund a transfer successfully and return transaction details', async () => {
    const transactionId = 'transaction-id';

    const mockTransaction: Transaction = {
      get Id() {
        return transactionId;
      },
      get Amount() {
        return 100;
      },
      get CreatedAt() {
        return new Date('2025-04-06T12:00:00Z');
      },
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
