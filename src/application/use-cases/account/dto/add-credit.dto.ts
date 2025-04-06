import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, ValidateIf } from 'class-validator';

export class AddCreditInputDto {
  @ApiHideProperty()
  @ValidateIf(() => false)
  sourceAccountNumber: number;

  @ApiProperty({ example: '0.1' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class AddCreditOutputDto {
  @ApiProperty()
  transactionId: string;
  @ApiProperty()
  sourceAccountNumber: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  createdAt: Date;
}
