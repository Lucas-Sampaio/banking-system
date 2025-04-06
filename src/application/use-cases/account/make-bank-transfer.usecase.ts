import { Injectable } from '@nestjs/common';
import {
  MakeTransferInputDto,
  MakeTransferOutputDto,
} from './dto/make-bank-transfer.dto';
import { AccountService } from 'src/infra/services/account.service';

@Injectable()
export class MakeTransferUserUseCase {
  constructor(private accountService: AccountService) {}

  async execute(input: MakeTransferInputDto): Promise<MakeTransferOutputDto> {
    const result = await this.accountService.MakeTransfer(
      input.sourceAccountNumber,
      input.destinationAccountNumber,
      input.amount,
      null,
    );
    return {
      transactionId: result.getId(),
      sourceAccountNumber: input.sourceAccountNumber,
      destinationAccountNumber: input.destinationAccountNumber,
      amount: result.getAmount(),
      createdAt: result.getCreatedAt(),
    };
  }
}
