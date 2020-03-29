import {HISTORY_TRANSFER_FAILED, HISTORY_TRANSFER_LOADING, HISTORY_TRANSFER_SUCCESS} from './actionType'

export const HistoryTransfer = (state = {
  isLoading: true,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case HISTORY_TRANSFER_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case HISTORY_TRANSFER_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case HISTORY_TRANSFER_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};