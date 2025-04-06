import { BankingSystemError } from './banking-exceptions';
import { ErrorCode } from './errors-code';

export class AccountAlreadyExistsError extends BankingSystemError {
  constructor(accountNumber: number) {
    super(`Account ${accountNumber} already exists`, ErrorCode.ALREADY_EXISTS);
  }
}

export class EmailAlreadyExistsError extends BankingSystemError {
  constructor(email: string) {
    super(`Email ${email} already exists`, ErrorCode.ALREADY_EXISTS);
  }
}

export class UserNotFound extends BankingSystemError {
  constructor(id: string) {
    super(`User ${id} not found`, ErrorCode.NOT_FOUND);
  }
}

export class UserAlreadyExistingAccountError extends BankingSystemError {
  constructor() {
    super(`User already has an existing account.`, ErrorCode.ALREADY_EXISTS);
  }
}
