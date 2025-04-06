import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class MakeTransferInputDto {
  @ApiHideProperty()
  sourceAccountNumber: bigint;

  @ApiProperty({ example: '123456' })
  @IsNumber()
  @Min(1)
  destinationAccountNumber: bigint;

  @ApiProperty({ example: '0.1' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export interface MakeTransferOutputDto {
  transactionId: string;
  sourceAccountNumber: bigint;
  destinationAccountNumber: bigint;
  amount: number;
  createdAt: Date;
}
