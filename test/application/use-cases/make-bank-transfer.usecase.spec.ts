import { Test, TestingModule } from '@nestjs/testing';
import {
  MakeTransferInputDto,
  MakeTransferOutputDto,
} from 'src/application/use-cases/account/dto/make-bank-transfer.dto';
import { MakeTransferUserUseCase } from 'src/application/use-cases/account/make-bank-transfer.usecase';
import { IAccountService } from 'src/domain/services/account.service.interface';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';

describe('MakeTransferUserUseCase', () => {
  let makeTransferUserUseCase: MakeTransferUserUseCase;
  let accountService: jest.Mocked<IAccountService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MakeTransferUserUseCase,
        {
          provide: 'IAccountService',
          useValue: {
            MakeTransfer: jest.fn(),
          },
        },
      ],
    }).compile();

    makeTransferUserUseCase = module.get<MakeTransferUserUseCase>(
      MakeTransferUserUseCase,
    );
    accountService = module.get('IAccountService');
  });

  it('should make a bank transfer successfully and return transaction details', async () => {
    const input: MakeTransferInputDto = {
      sourceAccountNumber: 1234567890,
      destinationAccountNumber: 9876543210,
      amount: 200,
    };

    const date = new Date();
    const amount = 100;
    const mockTransaction: Transaction = {
      id: 'tx-id',
      sourceAccountId: 'source-id',
      destinationAccountId: 'dest-id',
      amount: amount,
      reversalTargetId: null,
      getId: jest.fn().mockReturnValue('tx-id'),
      getAmount: jest.fn().mockReturnValue(amount),
      getCreatedAt: jest.fn().mockReturnValue(date),
    } as unknown as Transaction;

    accountService.MakeTransfer.mockResolvedValue(mockTransaction);

    const result: MakeTransferOutputDto =
      await makeTransferUserUseCase.execute(input);

    expect(accountService.MakeTransfer).toHaveBeenCalledWith(
      input.sourceAccountNumber,
      input.destinationAccountNumber,
      input.amount,
      null,
    );
    expect(result).toEqual({
      transactionId: 'tx-id',
      sourceAccountNumber: input.sourceAccountNumber,
      destinationAccountNumber: input.destinationAccountNumber,
      amount: amount,
      createdAt: date,
    });
  });

  it('should throw an error if MakeTransfer fails', async () => {
    const input: MakeTransferInputDto = {
      sourceAccountNumber: 1234567890,
      destinationAccountNumber: 9876543210,
      amount: 200,
    };

    accountService.MakeTransfer.mockRejectedValue(new Error('Transfer failed'));

    await expect(makeTransferUserUseCase.execute(input)).rejects.toThrow(
      'Transfer failed',
    );

    expect(accountService.MakeTransfer).toHaveBeenCalledWith(
      input.sourceAccountNumber,
      input.destinationAccountNumber,
      input.amount,
      null,
    );
  });
});
