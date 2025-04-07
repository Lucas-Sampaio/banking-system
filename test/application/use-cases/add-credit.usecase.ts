import { Test, TestingModule } from '@nestjs/testing';
import { AddCreditUserUseCase } from 'src/application/use-cases/account/add-credit.usecase';
import {
  AddCreditInputDto,
  AddCreditOutputDto,
} from 'src/application/use-cases/account/dto/add-credit.dto';
import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';
import { AccountService } from 'src/infra/services/account.service';

describe('AddCreditUserUseCase', () => {
  let addCreditUserUseCase: AddCreditUserUseCase;
  let accountService: jest.Mocked<AccountService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddCreditUserUseCase,
        {
          provide: AccountService,
          useValue: {
            AddCredit: jest.fn(),
          },
        },
      ],
    }).compile();

    addCreditUserUseCase =
      module.get<AddCreditUserUseCase>(AddCreditUserUseCase);
    accountService = module.get(AccountService);
  });

  it('should add credit successfully and return transaction details', async () => {
    const input: AddCreditInputDto = {
      sourceAccountNumber: 1234567890,
      amount: 100,
    };

    const mockTransaction = new Transaction(
      'transaction-id',
      'source-account-id',
      null,
      100,
      null,
    );

    accountService.AddCredit.mockResolvedValue(mockTransaction);

    const result: AddCreditOutputDto =
      await addCreditUserUseCase.execute(input);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(accountService.AddCredit).toHaveBeenCalledWith(
      input.sourceAccountNumber,
      input.amount,
    );

    expect(result).toEqual({
      transactionId: 'transaction-id',
      sourceAccountNumber: input.sourceAccountNumber,
      amount: 100,
      createdAt: new Date('2025-04-06T12:00:00Z'),
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

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(accountService.AddCredit).toHaveBeenCalledWith(
      input.sourceAccountNumber,
      input.amount,
    );
  });
});
