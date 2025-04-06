import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddCreditUserUseCase } from 'src/application/use-cases/account/add-credit.usecase';
import { AddCreditInputDto } from 'src/application/use-cases/account/dto/add-credit.dto';
import {
  MakeTransferInputDto,
  MakeTransferOutputDto,
} from 'src/application/use-cases/account/dto/make-bank-transfer.dto';
import { MakeTransferUserUseCase } from 'src/application/use-cases/account/make-bank-transfer.usecase';
import { RefundTransferUserUseCase } from 'src/application/use-cases/account/refund-transfer.usercase';

@UseGuards(AuthGuard('jwt'))
@Controller('account')
export class AccountController {
  constructor(
    private readonly makeTransfer: MakeTransferUserUseCase,
    private readonly addCreditUsecase: AddCreditUserUseCase,
    private readonly RefundTransferUserUseCase: RefundTransferUserUseCase,
  ) {}

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
    return await this.makeTransfer.execute(body);
  }

  @ApiOperation({ summary: 'adiciona credito na conta' })
  @ApiResponse({
    status: 201,
    description: 'Retorna transacao criada',
    type: MakeTransferOutputDto,
  })
  @Post(':accountNumber/add-credit')
  async addCredit(
    @Param('accountNumber') accountNumber: number,
    @Body() body: AddCreditInputDto,
  ) {
    body.sourceAccountNumber = accountNumber;
    return await this.addCreditUsecase.execute(body);
  }

  @ApiOperation({ summary: 'estorna uma transferencia' })
  @ApiResponse({
    status: 201,
    description: 'estorna uma transferencia',
    schema: {
      example: {
        transactionId: 'string',
        amount: 0,
        createdAt: new Date(),
      },
    },
  })
  @Post('transfer/:id/refund')
  async refundTransaction(@Param('id') id: string) {
    return await this.RefundTransferUserUseCase.execute(id);
  }
}
