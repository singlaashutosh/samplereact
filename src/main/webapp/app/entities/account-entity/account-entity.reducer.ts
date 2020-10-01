import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAccountEntity, defaultValue } from 'app/shared/model/account-entity.model';

export const ACTION_TYPES = {
  FETCH_ACCOUNTENTITY_LIST: 'accountEntity/FETCH_ACCOUNTENTITY_LIST',
  FETCH_ACCOUNTENTITY: 'accountEntity/FETCH_ACCOUNTENTITY',
  CREATE_ACCOUNTENTITY: 'accountEntity/CREATE_ACCOUNTENTITY',
  UPDATE_ACCOUNTENTITY: 'accountEntity/UPDATE_ACCOUNTENTITY',
  DELETE_ACCOUNTENTITY: 'accountEntity/DELETE_ACCOUNTENTITY',
  RESET: 'accountEntity/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAccountEntity>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AccountEntityState = Readonly<typeof initialState>;

// Reducer

export default (state: AccountEntityState = initialState, action): AccountEntityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTENTITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNTENTITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ACCOUNTENTITY):
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNTENTITY):
    case REQUEST(ACTION_TYPES.DELETE_ACCOUNTENTITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTENTITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNTENTITY):
    case FAILURE(ACTION_TYPES.CREATE_ACCOUNTENTITY):
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNTENTITY):
    case FAILURE(ACTION_TYPES.DELETE_ACCOUNTENTITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTENTITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNTENTITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACCOUNTENTITY):
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNTENTITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACCOUNTENTITY):
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

const apiUrl = 'api/account-entities';

// Actions

export const getEntities: ICrudGetAllAction<IAccountEntity> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACCOUNTENTITY_LIST,
  payload: axios.get<IAccountEntity>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAccountEntity> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACCOUNTENTITY,
    payload: axios.get<IAccountEntity>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAccountEntity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACCOUNTENTITY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAccountEntity> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNTENTITY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAccountEntity> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACCOUNTENTITY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
