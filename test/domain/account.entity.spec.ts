import { Account } from 'src/domain/account/account.entity';
import { InsufficientFunds } from 'src/domain/exceptions/account.errors';

describe('Account Entity', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account('account-id', 123456, 'user-id');
  });

  it('should initialize with a balance of 0', () => {
    expect(account.Balance).toBe(0);
  });

  it('should set and get balance correctly', () => {
    account.setBalance(500);
    expect(account.Balance).toBe(500);
  });

  it('should make a debit successfully if balance is sufficient', () => {
    account.setBalance(500);
    account.makeDebit(200);
    expect(account.Balance).toBe(300);
  });

  it('should throw InsufficientFunds error if debit amount exceeds balance', () => {
    account.setBalance(100);
    expect(() => account.makeDebit(200)).toThrow(InsufficientFunds);
  });

  it('should make a credit successfully', () => {
    account.setBalance(300);
    account.makeCredit(200);
    expect(account.Balance).toBe(500);
  });

  it('should return the correct account ID', () => {
    expect(account.Id).toBe('account-id');
  });

  it('should return the correct account number', () => {
    expect(account.Number).toBe(123456);
  });

  it('should return the correct user ID', () => {
    expect(account.UserId).toBe('user-id');
  });
});
