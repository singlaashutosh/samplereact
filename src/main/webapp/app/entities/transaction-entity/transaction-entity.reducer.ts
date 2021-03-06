import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransactionEntity, defaultValue } from 'app/shared/model/transaction-entity.model';

export const ACTION_TYPES = {
  FETCH_TRANSACTIONENTITY_LIST: 'transactionEntity/FETCH_TRANSACTIONENTITY_LIST',
  FETCH_TRANSACTIONENTITY: 'transactionEntity/FETCH_TRANSACTIONENTITY',
  CREATE_TRANSACTIONENTITY: 'transactionEntity/CREATE_TRANSACTIONENTITY',
  UPDATE_TRANSACTIONENTITY: 'transactionEntity/UPDATE_TRANSACTIONENTITY',
  DELETE_TRANSACTIONENTITY: 'transactionEntity/DELETE_TRANSACTIONENTITY',
  FETCH_TRANSACTIONENTITY_LIST_DATE: 'transactionEntity/FETCH_TRANSACTIONENTITY_LIST_DATE',

  RESET: 'transactionEntity/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITransactionEntity>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TransactionEntityState = Readonly<typeof initialState>;

// Reducer

export default (state: TransactionEntityState = initialState, action): TransactionEntityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSACTIONENTITY):
    case REQUEST(ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST_DATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };

    case REQUEST(ACTION_TYPES.CREATE_TRANSACTIONENTITY):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSACTIONENTITY):
    case REQUEST(ACTION_TYPES.DELETE_TRANSACTIONENTITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST_DATE):
    case FAILURE(ACTION_TYPES.FETCH_TRANSACTIONENTITY):
    case FAILURE(ACTION_TYPES.CREATE_TRANSACTIONENTITY):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSACTIONENTITY):
    case FAILURE(ACTION_TYPES.DELETE_TRANSACTIONENTITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSACTIONENTITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST_DATE):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };

    case SUCCESS(ACTION_TYPES.CREATE_TRANSACTIONENTITY):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSACTIONENTITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSACTIONENTITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };

    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/transaction-entities';

// Actions

export const getEntities: ICrudGetAllAction<ITransactionEntity> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST,
  payload: axios.get<ITransactionEntity>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITransactionEntity> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSACTIONENTITY,
    payload: axios.get<ITransactionEntity>(requestUrl),
  };
};

export const getEntitiesbydate: ICrudGetAction<ITransactionEntity> = id => {
  const requestUrl = `${apiUrl}/Date/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSACTIONENTITY_LIST_DATE,
    payload: axios.get<ITransactionEntity>(requestUrl),
  };
};
export const createEntity: ICrudPutAction<ITransactionEntity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSACTIONENTITY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransactionEntity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSACTIONENTITY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITransactionEntity> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSACTIONENTITY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
