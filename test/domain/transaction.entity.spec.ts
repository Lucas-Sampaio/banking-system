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
    transaction.CreatedAt = new Date('2025-04-06T12:00:00Z');
  });

  it('should return the correct transaction ID', () => {
    expect(transaction.Id).toBe('transaction-id');
  });

  it('should return the correct source account ID', () => {
    expect(transaction.SourceAccountId).toBe('source-account-id');
  });

  it('should return the correct destination account ID', () => {
    expect(transaction.DestinationAccountId).toBe('destination-account-id');
  });

  it('should return null for destination account ID if not set', () => {
    const transactionWithoutDestination = new Transaction(
      'transaction-id',
      'source-account-id',
      null,
      100,
      'reversal-target-id',
    );
    expect(transactionWithoutDestination.DestinationAccountId).toBeNull();
  });

  it('should return the correct amount', () => {
    expect(transaction.Amount).toBe(100);
  });

  it('should return the correct reversal target ID', () => {
    expect(transaction.ReversalTargetId).toBe('reversal-target-id');
  });

  it('should return null for reversal target ID if not set', () => {
    const transactionWithoutReversal = new Transaction(
      'transaction-id',
      'source-account-id',
      'destination-account-id',
      100,
      null,
    );
    expect(transactionWithoutReversal.ReversalTargetId).toBeNull();
  });

  it('should set and get the correct creation date', () => {
    const createdAt = new Date('2025-04-06T12:00:00Z');
    transaction.CreatedAt = createdAt;
    expect(transaction.CreatedAt).toEqual(createdAt);
  });
});
