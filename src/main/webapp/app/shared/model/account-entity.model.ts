import { Moment } from 'moment';
import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';

export interface IAccountEntity {
  id?: number;
  code?: number;
  accountName?: string;
  description?: string;
  openingBalance?: number;
  closingBalance?: number;
  createdAt?: string;
  transactionEntities?: ITransactionEntity[];
}

export const defaultValue: Readonly<IAccountEntity> = {};
