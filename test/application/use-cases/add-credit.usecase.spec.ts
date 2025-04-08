import { Test, TestingModule } from '@nestjs/testing';
import { AddCreditUserUseCase } from 'src/application/use-cases/account/add-credit.usecase';
import {
  AddCreditInputDto,
  AddCreditOutputDto,
} from 'src/application/use-cases/account/dto/add-credit.dto';
import { IAccountService } from 'src/domain/services/account.service.interface';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';

describe('AddCreditUserUseCase', () => {
  let addCreditUserUseCase: AddCreditUserUseCase;
  let accountService: jest.Mocked<IAccountService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddCreditUserUseCase,
        {
          provide: 'IAccountService',
          useValue: {
            AddCredit: jest.fn(),
          },
        },
      ],
    }).compile();

    addCreditUserUseCase =
      module.get<AddCreditUserUseCase>(AddCreditUserUseCase);
    accountService = module.get('IAccountService');
  });

  it('should add credit successfully and return transaction details', async () => {
    const amount = 100;
    const date = new Date();
    const input: AddCreditInputDto = {
      sourceAccountNumber: 1234567890,
      amount: amount,
    };

    const mockTransaction: Transaction = {
      get Id() {
        return 'transaction-id';
      },
      get SourceAccountId() {
        return 'source-account-id';
      },
      get DestinationAccountId() {
        return null;
      },
      get Amount() {
        return amount;
      },
      get ReversalTargetId() {
        return null;
      },
      get CreatedAt() {
        return date;
      },
    } as unknown as Transaction;
    accountService.AddCredit.mockResolvedValue(mockTransaction);

    const result: AddCreditOutputDto =
      await addCreditUserUseCase.execute(input);

    expect(accountService.AddCredit).toHaveBeenCalledWith(
      input.sourceAccountNumber,
      input.amount,
    );

    expect(result).toEqual({
      transactionId: 'transaction-id',
      sourceAccountNumber: input.sourceAccountNumber,
      amount: amount,
      createdAt: date,
    });
  });

  it('should throw an error if AddCredit fails', async () => {
    const input: AddCreditInputDto = {
      sourceAccountNumber: 1234567890,
      amount: 100,
    };

    accountService.AddCredit.mockRejectedValue(new Error('Account not found'));

    await expect(addCreditUserUseCase.execute(input)).rejects.toThrow(
      'Account not found',
    );

    expect(accountService.AddCredit).toHaveBeenCalledWith(
      input.sourceAccountNumber,
      input.amount,
    );
  });
});
