import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/infra/services/account.service';
import { AddCreditInputDto, AddCreditOutputDto } from './dto/add-credit.dto';

@Injectable()
export class AddCreditUserUseCase {
  constructor(private accountService: AccountService) {}

  async execute(input: AddCreditInputDto): Promise<AddCreditOutputDto> {
    const result = await this.accountService.AddCredit(
      input.sourceAccountNumber,
      input.amount,
    );
    return {
      transactionId: result.getId(),
      sourceAccountNumber: input.sourceAccountNumber,
      amount: result.getAmount(),
      createdAt: result.getCreatedAt(),
    };
  }
}
