// src/presentation/controllers/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.usecase';
import { CreateUserInputDto } from 'src/application/use-cases/user/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  async register(@Body() createUserDto: CreateUserInputDto) {
    return this.createUserUseCase.execute(createUserDto);
  }
}
