import { BankingSystemError } from './banking-exceptions';
import { ErrorCode } from './errors-code';

export class AccountNotFound extends BankingSystemError {
  constructor(accountNumber: bigint) {
    super(`Account ${accountNumber} not found`, ErrorCode.NOT_FOUND);
  }
}
