import { Inject, Injectable } from '@nestjs/common';
import {
  MakeTransferInputDto,
  MakeTransferOutputDto,
} from './dto/make-bank-transfer.dto';
import { IAccountService } from 'src/domain/services/account.service.interface';

@Injectable()
export class MakeTransferUserUseCase {
  constructor(
    @Inject('IAccountService')
    private accountService: IAccountService,
  ) {}

  async execute(input: MakeTransferInputDto): Promise<MakeTransferOutputDto> {
    const result = await this.accountService.MakeTransfer(
      input.sourceAccountNumber,
      input.destinationAccountNumber,
      input.amount,
      null,
    );
    return {
      transactionId: result.Id,
      sourceAccountNumber: input.sourceAccountNumber,
      destinationAccountNumber: input.destinationAccountNumber,
      amount: result.Amount,
      createdAt: result.CreatedAt,
    };
  }
}
