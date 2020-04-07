import {
  HISTORY_USER_DEPT_FAILED, HISTORY_USER_DEPT_LOADING,
  HISTORY_USER_DEPT_SUCCESS,
  HISTORY_USER_TRANS_FAILED,
  HISTORY_USER_TRANS_LOADING,
  HISTORY_USER_TRANS_SUCCESS
} from './actionType'

export const UserHistoryTrans = (state = {
  isLoading: true,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case HISTORY_USER_TRANS_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case HISTORY_USER_TRANS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case HISTORY_USER_TRANS_SUCCESS:
      return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
    default:
      return state;
  }
};

export const HistoryDebt = (state = {
  isLoading: true,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case HISTORY_USER_DEPT_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case HISTORY_USER_DEPT_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case HISTORY_USER_DEPT_SUCCESS:
      return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
    default:
      return state;
  }
};