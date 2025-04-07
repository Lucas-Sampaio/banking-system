import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { IAccountRepository } from 'src/domain/account/account.repository.interface';
import {
  AccountAlreadyExistsError,
  EmailAlreadyExistsError,
} from 'src/domain/exceptions/user.errors';
import { User } from 'src/domain/user-aggregate/user.entity';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.usecase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUsersRepository>;
  let accountRepository: jest.Mocked<IAccountRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'IUsersRepository',
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
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

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get('IUsersRepository');
    accountRepository = module.get('IAccountRepository');
  });

  it('should create a user successfully', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      accountNumber: 1234567,
    };

    userRepository.findByEmail.mockResolvedValue(null);
    accountRepository.existsAccountNumber.mockResolvedValue(false);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

    const result = await createUserUseCase.execute(input);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(accountRepository.existsAccountNumber).toHaveBeenCalledWith(
      input.accountNumber,
    );
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
    expect(result).toEqual({
      id: expect.any(String) as unknown as string,
      name: input.name,
      email: input.email,
      accountNumber: input.accountNumber,
    });
  });

  it('should throw EmailAlreadyExistsError if email already exists', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      accountNumber: 12345678,
    };

    userRepository.findByEmail.mockResolvedValue({} as User);

    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      EmailAlreadyExistsError,
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(accountRepository.existsAccountNumber).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw AccountAlreadyExistsError if account number already exists', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      accountNumber: 12345678,
    };

    userRepository.findByEmail.mockResolvedValue(null);
    accountRepository.existsAccountNumber.mockResolvedValue(true);

    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      AccountAlreadyExistsError,
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(accountRepository.existsAccountNumber).toHaveBeenCalledWith(
      input.accountNumber,
    );
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
