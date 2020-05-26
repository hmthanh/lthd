import {HISTORY_USER_TRANS_FAILED, HISTORY_USER_TRANS_LOADING, HISTORY_USER_TRANS_SUCCESS} from './actionType'

export const UserTransHistory = (state = {
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