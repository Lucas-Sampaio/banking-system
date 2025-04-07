import { Test, TestingModule } from '@nestjs/testing';
import { AuthService, UserPayload } from 'src/infra/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginUserUseCase } from 'src/application/use-cases/user/login-user.usecase';

describe('LoginUserUseCase', () => {
  let loginUserUseCase: LoginUserUseCase;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUserUseCase,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    loginUserUseCase = module.get<LoginUserUseCase>(LoginUserUseCase);
    authService = module.get(AuthService);
  });

  it('should return a JWT token if user credentials are valid', async () => {
    const input = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const mockUser = {
      id: 'user-id',
      email: input.email,
      name: 'John Doe',
      accountNumber: 12345678,
    } as unknown as UserPayload;

    const mockToken = { accessToken: 'jwt-token' };

    authService.validateUser.mockResolvedValue(mockUser);
    authService.login.mockResolvedValue(mockToken as never);

    const result = await loginUserUseCase.execute(input);

    expect(authService.validateUser).toHaveBeenCalledWith(
      input.email,
      input.password,
    );
    expect(authService.login).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockToken);
  });

  it('should throw UnauthorizedException if user credentials are invalid', async () => {
    const input = {
      email: 'john.doe@example.com',
      password: 'wrong-password',
    };

    authService.validateUser.mockResolvedValue(null);

    await expect(loginUserUseCase.execute(input)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(authService.validateUser).toHaveBeenCalledWith(
      input.email,
      input.password,
    );
    expect(authService.login).not.toHaveBeenCalled();
  });
});
