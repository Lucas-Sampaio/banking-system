import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.usecase';
import { CreateUserInputDto } from 'src/application/use-cases/user/dto/create-user.dto';
import { LoginUserInputDto } from 'src/application/use-cases/user/dto/login-user.dto';
import { UserOutputDto } from 'src/application/use-cases/user/dto/user.dto';
import { LoginUserUseCase } from 'src/application/use-cases/user/login-user.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUsercase: LoginUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: UserOutputDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserInputDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @ApiOperation({ summary: 'Realiza login no sistema' })
  @ApiResponse({
    status: 200,
    description: 'Realiza login no sistema',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(@Body() body: LoginUserInputDto) {
    return this.loginUsercase.execute(body);
  }
}
