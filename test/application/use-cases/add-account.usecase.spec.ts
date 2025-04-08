import { Test, TestingModule } from '@nestjs/testing';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { IAccountRepository } from 'src/domain/account/account.repository.interface';
import {
  AccountAlreadyExistsError,
  UserAlreadyExistingAccountError,
  UserNotFound,
} from 'src/domain/exceptions/user.errors';
import { Account } from 'src/domain/account/account.entity';
import { AddUserAccountUseCase } from 'src/application/use-cases/user/add-account.usecase';
import { User } from 'src/domain/user-aggregate/user.entity';

describe('AddUserAccountUseCase', () => {
  let addUserAccountUseCase: AddUserAccountUseCase;
  let userRepository: jest.Mocked<IUsersRepository>;
  let accountRepository: jest.Mocked<IAccountRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddUserAccountUseCase,
        {
          provide: 'IUsersRepository',
          useValue: {
            findById: jest.fn(),
            addAccount: jest.fn(),
          },
        },
        {
          provide: 'IAccountRepository',
          useValue: {
            existsAccountNumber: jest.fn(),
          },
        },
      ],
    }).compile();

    addUserAccountUseCase = module.get<AddUserAccountUseCase>(
      AddUserAccountUseCase,
    );
    userRepository = module.get('IUsersRepository');
    accountRepository = module.get('IAccountRepository');
  });

  it('should add an account successfully', async () => {
    const input = {
      id: 'user-id',
      accountNumber: 15547,
    };

    const user = {
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed-password',
      accountNumber: null,
      getId: jest.fn().mockReturnValue('user-id'),
      getAccountNumber: jest.fn().mockReturnValue(null),
    } as unknown as User;

    userRepository.findById.mockResolvedValue(user);
    accountRepository.existsAccountNumber.mockResolvedValue(false);

    await addUserAccountUseCase.execute(input);

    expect(userRepository.findById).toHaveBeenCalledWith(input.id);
    expect(accountRepository.existsAccountNumber).toHaveBeenCalledWith(
      input.accountNumber,
    );
    expect(userRepository.addAccount).toHaveBeenCalledWith(
      user.Id,
      expect.any(Account),
    );
  });

  it('should throw UserNotFound if user does not exist', async () => {
    const input = {
      id: 'non-existent-user-id',
      accountNumber: 1234567890,
    };

    userRepository.findById.mockResolvedValue(null);

    await expect(addUserAccountUseCase.execute(input)).rejects.toThrow(
      UserNotFound,
    );

    expect(userRepository.findById).toHaveBeenCalledWith(input.id);
    expect(accountRepository.existsAccountNumber).not.toHaveBeenCalled();
    expect(userRepository.addAccount).not.toHaveBeenCalled();
  });

  it('should throw UserAlreadyExistingAccountError if user already has an account', async () => {
    const input = {
      id: 'user-id',
      accountNumber: 1234567890,
    };

    const user = {
      id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed-password',
      accountNumber: null,
      get Id() {
        return 'user-id';
      },
      get AccountNumber() {
        return 154878;
      },
    } as unknown as User;

    userRepository.findById.mockResolvedValue(user);

    await expect(addUserAccountUseCase.execute(input)).rejects.toThrow(
      UserAlreadyExistingAccountError,
    );

    expect(userRepository.findById).toHaveBeenCalledWith(input.id);
    expect(accountRepository.existsAccountNumber).not.toHaveBeenCalled();
    expect(userRepository.addAccount).not.toHaveBeenCalled();
  });

  it('should throw AccountAlreadyExistsError if account number already exists', async () => {
    const input = {
      id: 'user-id',
      accountNumber: 1234567890,
    };

    const user = {
      getId: jest.fn().mockReturnValue('user-id'),
      getAccountNumber: jest.fn().mockReturnValue(null),
    } as unknown as User;

    userRepository.findById.mockResolvedValue(user);
    accountRepository.existsAccountNumber.mockResolvedValue(true);

    await expect(addUserAccountUseCase.execute(input)).rejects.toThrow(
      AccountAlreadyExistsError,
    );

    expect(userRepository.findById).toHaveBeenCalledWith(input.id);
    expect(accountRepository.existsAccountNumber).toHaveBeenCalledWith(
      input.accountNumber,
    );
    expect(userRepository.addAccount).not.toHaveBeenCalled();
  });
});
