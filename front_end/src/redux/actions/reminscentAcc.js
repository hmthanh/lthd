import {
  NAME_REMINISCENT_SUCCESS, NAME_REMINISCENT_LOADING, NAME_REMINISCENT_FAILED,
  NAME_REMINISCENT_DELETED, NAME_REMINISCENT_EDIT
} from '../actions/actionType'

export const ReminscentAcction = (state = {
  isLoading: true,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case NAME_REMINISCENT_LOADING:
      return { isLoading: true, errMess: null, data: [] };
    case NAME_REMINISCENT_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, data: [] };
    case NAME_REMINISCENT_SUCCESS:
      return { ...state, isLoading: false, errMess: null, data: { ...action.payload } }
    case NAME_REMINISCENT_DELETED:
      return { ...state, isLoading: false, errMess: null, data: { ...action.payload } }
    case NAME_REMINISCENT_EDIT:
      return { ...state, isLoading: false, errMess: null, data: { ...action.payload } }
    default:
      return state;
  }
}