import { QUERY_ACCNUM_LOADING, QUERY_ACCNUM_SUCCESS, QUERY_ACCNUMP_FAILED} from '../actions/actionType'

export const AccountNum = (state = {
  isLoading: true,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
      case QUERY_ACCNUM_LOADING:
          return {isLoading: true, errMess: null, data: []};
      case QUERY_ACCNUMP_FAILED:
          return {...state, isLoading: false, errMess: action.payload, data: []};
      case QUERY_ACCNUM_SUCCESS:
          return {...state, isLoading: false, errMess: null, data: {...action.payload}};
      default:
          return state;
  }
};