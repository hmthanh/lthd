import {
  HISTORY_TRANS_FAILED,
  HISTORY_TRANS_LOADING,
  HISTORY_TRANS_SUCCESS,
  HISTORY_USER_TRANS_FAILED,
  HISTORY_USER_TRANS_LOADING, HISTORY_USER_TRANS_SUCCESS
} from '../actionType'

export const TransHistoryCreator = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case HISTORY_TRANS_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case HISTORY_TRANS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case HISTORY_TRANS_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};

export const TransHistoryUser = (state = {
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