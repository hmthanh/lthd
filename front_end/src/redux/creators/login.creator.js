import {
  ACTIVE_ACCOUNT_FAILED,
  ACTIVE_ACCOUNT_LOADING,
  ACTIVE_ACCOUNT_SUCCESS,
  LOGIN_AUTH_FAILED,
  LOGIN_AUTH_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOADING
} from '../actionType'

export const LoginCreator = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case LOGIN_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case LOGIN_AUTH_FAILED:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    case LOGIN_AUTH_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};


export const ActiveAccount = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case ACTIVE_ACCOUNT_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case ACTIVE_ACCOUNT_FAILED:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    case ACTIVE_ACCOUNT_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};
