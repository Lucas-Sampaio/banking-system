import { Injectable } from '@nestjs/common';
import {
  MakeTransferInputDto,
  MakeTransferOutputDto,
} from './dto/make-bank-transfer.dto';
import { TransferService } from 'src/infra/services/transfer.service';

@Injectable()
export class MakeTransferUserUseCase {
  constructor(private transferService: TransferService) {}

  async execute(input: MakeTransferInputDto): Promise<MakeTransferOutputDto> {
    const result = await this.transferService.MakeTransfer(
      input.sourceAccountNumber,
      input.destinationAccountNumber,
      input.amount,
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
