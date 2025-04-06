import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  accountNumber: number | undefined;
}
