// src/presentation/controllers/auth.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserOutputDto } from 'src/application/use-cases/user/dto/user.dto';
import { FindAllUserUseCase } from 'src/application/use-cases/user/findall-user.usecase';
@Controller('user')
export class UserController {
  constructor(private readonly findallUser: FindAllUserUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Retorna todos os usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os usuarios',
    type: UserOutputDto,
    isArray: true,
  })
  @Get()
  async getAll() {
    return this.findallUser.execute();
  }
}
