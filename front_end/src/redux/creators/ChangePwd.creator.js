import {CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_LOADING, CHANGE_PASSWORD_SUCCESS} from '../actionType'

export const ChangePwdCreator = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case CHANGE_PASSWORD_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case CHANGE_PASSWORD_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};