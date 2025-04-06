import { BankingSystemError } from './banking-exceptions';
import { ErrorCode } from './errors-code';

export class AccountNotFound extends BankingSystemError {
  constructor(accountNumber: number) {
    super(`Account ${accountNumber} not found`, ErrorCode.NOT_FOUND);
  }
}

export class InsufficientFunds extends BankingSystemError {
  constructor() {
    super(
      'Your transaction failed due to insufficient funds',
      ErrorCode.DomainError,
    );
  }
}

export class AccountCannotSame extends BankingSystemError {
  constructor() {
    super(
      'Source and destination accounts cannot be the same',
      ErrorCode.DomainError,
    );
  }
}
