import {
  FORGET_PASSWORD_FAILED,
  FORGET_PASSWORD_LOADING,
  FORGET_PASSWORD_SUCCESS, VERIFY_FORGET_FAILED, VERIFY_FORGET_LOADING, VERIFY_FORGET_SUCCESS
} from '../actionType'

export const ForgetPassword = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case FORGET_PASSWORD_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case FORGET_PASSWORD_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};


export const VerifyForget = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case VERIFY_FORGET_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case VERIFY_FORGET_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case VERIFY_FORGET_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};