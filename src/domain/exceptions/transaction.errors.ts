import { BankingSystemError } from './banking-exceptions';
import { ErrorCode } from './errors-code';

export class RefundNotCompleted extends BankingSystemError {
  constructor(accountNumber: number) {
    super(
      `The reversal could not be completed: destination account ${accountNumber} not found.`,
      ErrorCode.DomainError,
    );
  }
}

export class TransactionNotFound extends BankingSystemError {
  constructor() {
    super(`Transaction not found`, ErrorCode.NOT_FOUND);
  }
}

export class TransactionAlreadyReversedError extends BankingSystemError {
  constructor(id: string) {
    super(`Transaction ${id} already reversed`, ErrorCode.ALREADY_EXISTS);
  }
}
