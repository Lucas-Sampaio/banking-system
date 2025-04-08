import { Test, TestingModule } from '@nestjs/testing';
import { IUsersRepository } from 'src/domain/user-aggregate/user.repository.interface';
import { User } from 'src/domain/user-aggregate/user.entity';
import { FindAllUserUseCase } from 'src/application/use-cases/user/findall-user.usecase';

describe('FindAllUserUseCase', () => {
  let findAllUserUseCase: FindAllUserUseCase;
  let userRepository: jest.Mocked<IUsersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUserUseCase,
        {
          provide: 'IUsersRepository',
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllUserUseCase = module.get<FindAllUserUseCase>(FindAllUserUseCase);
    userRepository = module.get('IUsersRepository');
  });

  it('should return a list of users', async () => {
    const accountNumber = 12345678;
    const mockUsers = [
      {
        get Id() {
          return 'user-id-1';
        },
        get Name() {
          return 'John Doe';
        },
        get Email() {
          return 'john.doe@example.com';
        },
        get AccountNumber() {
          return accountNumber;
        },
      },
      {
        get Id() {
          return 'user-id-2';
        },
        get Name() {
          return 'Jane Doe';
        },
        get Email() {
          return 'jane.doe@example.com';
        },
        get AccountNumber() {
          return null;
        },
      },
    ];

    userRepository.findAll.mockResolvedValue(mockUsers as unknown as User[]);

    const result = await findAllUserUseCase.execute();

    expect(userRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: 'user-id-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        accountNumber: accountNumber,
      },
      {
        id: 'user-id-2',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        accountNumber: null,
      },
    ]);
  });

  it('should return an empty list if no users are found', async () => {
    userRepository.findAll.mockResolvedValue([]);

    const result = await findAllUserUseCase.execute();

    expect(userRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
