import { Transaction } from 'src/domain/transaction-aggregate/transaction.entity';

describe('Transaction Entity', () => {
  let transaction: Transaction;

  beforeEach(() => {
    transaction = new Transaction(
      'transaction-id',
      'source-account-id',
      'destination-account-id',
      100,
      'reversal-target-id',
    );
    transaction.setCreatedAt(new Date('2025-04-06T12:00:00Z'));
  });

  it('should return the correct transaction ID', () => {
    expect(transaction.getId()).toBe('transaction-id');
  });

  it('should return the correct source account ID', () => {
    expect(transaction.getSourceAccountId()).toBe('source-account-id');
  });

  it('should return the correct destination account ID', () => {
    expect(transaction.getDestinationAccountId()).toBe(
      'destination-account-id',
    );
  });

  it('should return null for destination account ID if not set', () => {
    const transactionWithoutDestination = new Transaction(
      'transaction-id',
      'source-account-id',
      null,
      100,
      'reversal-target-id',
    );
    expect(transactionWithoutDestination.getDestinationAccountId()).toBeNull();
  });

  it('should return the correct amount', () => {
    expect(transaction.getAmount()).toBe(100);
  });

  it('should return the correct reversal target ID', () => {
    expect(transaction.getReversalTargetId()).toBe('reversal-target-id');
  });

  it('should return null for reversal target ID if not set', () => {
    const transactionWithoutReversal = new Transaction(
      'transaction-id',
      'source-account-id',
      'destination-account-id',
      100,
      null,
    );
    expect(transactionWithoutReversal.getReversalTargetId()).toBeNull();
  });

  it('should set and get the correct creation date', () => {
    const createdAt = new Date('2025-04-06T12:00:00Z');
    transaction.setCreatedAt(createdAt);
    expect(transaction.getCreatedAt()).toEqual(createdAt);
  });
});
