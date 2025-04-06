// src/presentation/controllers/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddUserAccountUseCase } from 'src/application/use-cases/user/add-account.usecase';
import { AddUserAccountInputDto } from 'src/application/use-cases/user/dto/add-account.dto';
import { UserOutputDto } from 'src/application/use-cases/user/dto/user.dto';
import { FindAllUserUseCase } from 'src/application/use-cases/user/findall-user.usecase';
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private readonly findallUser: FindAllUserUseCase,
    private readonly addAccountUsecase: AddUserAccountUseCase,
  ) {}

  @ApiOperation({ summary: 'Retorna todos os usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os usuarios',
    type: UserOutputDto,
    isArray: true,
  })
  @Get()
  async getAll() {
    return await this.findallUser.execute();
  }

  @ApiOperation({ summary: 'Adiciona uma conta para o usuario' })
  @ApiResponse({
    status: 204,
    description: 'Adiciona uma conta para o usuario',
  })
  @Patch(':id/account')
  @HttpCode(204)
  async addAccount(
    @Param('id') id: string,
    @Body() body: AddUserAccountInputDto,
  ) {
    body.id = id;
    return await this.addAccountUsecase.execute(body);
  }
}
