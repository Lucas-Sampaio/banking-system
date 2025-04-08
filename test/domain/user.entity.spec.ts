import { Account } from 'src/domain/account/account.entity';
import { User } from 'src/domain/user-aggregate/user.entity';

describe('User Entity', () => {
  let user: User;
  let account: Account;

  beforeEach(() => {
    account = new Account('account-id', 123456, 'user-id');
    user = new User(
      'user-id',
      'John Doe',
      'john.doe@example.com',
      'hashed-password',
      account,
    );
  });

  it('should return the correct user ID', () => {
    expect(user.Id).toBe('user-id');
  });

  it('should return the correct user name', () => {
    expect(user.Name).toBe('John Doe');
  });

  it('should return the correct user email', () => {
    expect(user.Email).toBe('john.doe@example.com');
  });

  it('should return the correct user password', () => {
    expect(user.Password).toBe('hashed-password');
  });

  it('should return the correct account number if account exists', () => {
    expect(user.AccountNumber).toBe(123456);
  });

  it('should return undefined for account number if account does not exist', () => {
    const userWithoutAccount = new User(
      'user-id',
      'John Doe',
      'john.doe@example.com',
      'hashed-password',
      null,
    );
    expect(userWithoutAccount.AccountNumber).toBeUndefined();
  });

  it('should return the correct account object if account exists', () => {
    expect(user.Account).toBe(account);
  });

  it('should return null for account if account does not exist', () => {
    const userWithoutAccount = new User(
      'user-id',
      'John Doe',
      'john.doe@example.com',
      'hashed-password',
      null,
    );
    expect(userWithoutAccount.Account).toBeNull();
  });
});
