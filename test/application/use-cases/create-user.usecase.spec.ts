import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { User } from 'src/domain/user-aggregate/user.entity';
import {
  AccountAlreadyExistsError,
  EmailAlreadyExistsError,
} from 'src/domain/exceptions/user.errors';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.usecase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUsersRepository>;

  beforeEach(async () => {
    userRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      existsAccountNumber: jest.fn().mockResolvedValue(false),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'IUsersRepository',
          useValue: userRepository,
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should create a user successfully', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      accountNumber: BigInt(1234567890),
    };

    userRepository.findByEmail.mockImplementation(() => Promise.resolve(null));

    userRepository.existsAccountNumber.mockResolvedValue(false);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

    const result = await createUserUseCase.execute(input);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.existsAccountNumber).toHaveBeenCalledWith(
      input.accountNumber,
    );
    expect(userRepository.create).toHaveBeenCalled();
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
      accountNumber: BigInt(1234567890),
    };

    userRepository.findByEmail.mockResolvedValue({} as User);

    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      EmailAlreadyExistsError,
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.existsAccountNumber).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw AccountAlreadyExistsError if account number already exists', async () => {
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      accountNumber: BigInt(1234567890),
    };

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.existsAccountNumber.mockResolvedValue(true);

    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      AccountAlreadyExistsError,
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.existsAccountNumber).toHaveBeenCalledWith(
      input.accountNumber,
    );
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
