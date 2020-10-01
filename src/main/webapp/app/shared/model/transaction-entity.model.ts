import { Moment } from 'moment';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { TransType } from 'app/shared/model/enumerations/trans-type.model';

export interface ITransactionEntity {
  id?: number;
  transAmmount?: number;
  transDate?: string;
  transType?: TransType;
  entryDate?: string;
  description?: string;
  accountEntity?: IAccountEntity;
}

export const defaultValue: Readonly<ITransactionEntity> = {};
