import {CREATE_ACC_FAILED, CREATE_ACC_LOADING, CREATE_ACC_SUCCESS} from '../actionType'

export const CreateAccCreator =  (state = {
  isLoading: false,
  statusId: 0,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case CREATE_ACC_LOADING:
      return {isLoading: true, statusId: 0, errMess: null, data: []};
    case CREATE_ACC_FAILED:
      return {...state, isLoading: false, statusId: 1, errMess: action.payload, data: []};
    case CREATE_ACC_SUCCESS:
      return {...state, isLoading: false, statusId: 2, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};
