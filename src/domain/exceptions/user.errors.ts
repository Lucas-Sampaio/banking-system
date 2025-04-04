import { BankingSystemError } from './banking-exceptions';
import { ErrorCode } from './errors-code';

export class AccountAlreadyExistsError extends BankingSystemError {
  constructor(accountNumber: bigint) {
    super(`Account ${accountNumber} already exists`, ErrorCode.ALREADY_EXISTS);
  }
}

export class EmailAlreadyExistsError extends BankingSystemError {
  constructor(email: string) {
    super(`Email ${email} already exists`, ErrorCode.ALREADY_EXISTS);
  }
}
