import { Create, FindOne, Update } from '@my-task-timer/shared-interfaces';
import { Account } from '../entities/account.entity';

export abstract class AccountRepository
  implements
    Create<Account, Account>,
    FindOne<Account, 'id', Account>,
    Update<Account, 'id', Account>
{
  abstract createOne(input: Account): Promise<Account>;

  abstract findOne(key: Account['id']): Promise<Account>;

  abstract findByEmailOrUsername(
    email?: string,
    username?: string
  ): Promise<Account>;

  abstract updateOne(id: string, input: Account): Promise<Account>;
}
