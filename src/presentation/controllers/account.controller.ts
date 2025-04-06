import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  MakeTransferInputDto,
  MakeTransferOutputDto,
} from 'src/application/use-cases/account/dto/make-bank-transfer.dto';
import { MakeTransferUserUseCase } from 'src/application/use-cases/account/make-bank-transfer.usecase';

@Controller('account')
export class AccountController {
  constructor(private readonly makeTrasnfer: MakeTransferUserUseCase) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'realiza uma transacao bancaria entre duas contas' })
  @ApiResponse({
    status: 201,
    description: 'Retorna transacao criada',
    type: MakeTransferOutputDto,
  })
  @Post(':accountNumber/transfer')
  async transfer(
    @Param('accountNumber') accountNumber: number,
    @Body() body: MakeTransferInputDto,
  ) {
    body.sourceAccountNumber = accountNumber;
    return await this.makeTrasnfer.execute(body);
  }
}
