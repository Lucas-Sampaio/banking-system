import { Inject, Injectable } from '@nestjs/common';
import { AddCreditInputDto, AddCreditOutputDto } from './dto/add-credit.dto';
import { IAccountService } from 'src/domain/services/account.service.interface';

@Injectable()
export class AddCreditUserUseCase {
  constructor(
    @Inject('IAccountService')
    private accountService: IAccountService,
  ) {}

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
