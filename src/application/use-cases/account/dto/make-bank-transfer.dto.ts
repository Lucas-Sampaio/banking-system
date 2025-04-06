import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min, ValidateIf } from 'class-validator';

export class MakeTransferInputDto {
  @ApiHideProperty()
  @ValidateIf(() => false)
  @IsInt()
  sourceAccountNumber: number;

  @ApiProperty({ example: '123456' })
  @IsInt()
  @Min(1)
  destinationAccountNumber: number;

  @ApiProperty({ example: '0.1' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class MakeTransferOutputDto {
  @ApiProperty()
  transactionId: string;
  @ApiProperty()
  sourceAccountNumber: number;
  @ApiProperty()
  destinationAccountNumber: number;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  createdAt: Date;
}
