import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from './actionType'

export const LoginInfo = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case LOGIN:
      return {isLoading: true, errMess: null, data: []};
    case LOGIN_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case LOGIN_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};
