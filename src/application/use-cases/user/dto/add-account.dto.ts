import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, ValidateIf } from 'class-validator';

export class AddUserAccountInputDto {
  @ApiHideProperty()
  @ValidateIf(() => false)
  id: string;

  @ApiProperty({ example: '1247' })
  @Min(1)
  @IsInt()
  accountNumber: number;
}
