import {
  CREATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_SUCCESS,
  EMPLOYEE_FAILED,
  EMPLOYEE_LOADING,
  LOAD_EMPLOYEE_SUCCESS,
} from '../actionType'

export const EmployeeCreator = (state = {
  isLoading: true,
  fetch: [],
  add: [],
  edit: [],
  delete: []
}, action) => {
  switch (action.type) {
    case EMPLOYEE_LOADING:
      return {isLoading: true, fetch: [], add: [], edit: [], delete: []};
    case EMPLOYEE_FAILED:
      return {...state, isLoading: false, ...action.payload, fetch: [], add: [], edit: [], delete: []};
    case LOAD_EMPLOYEE_SUCCESS:
      return {...state, isLoading: false, fetch: {...action.payload}, add: [], edit: [], delete: []};
    case CREATE_EMPLOYEE_SUCCESS:
      return {...state, isLoading: false, fetch: [], add: {...action.payload}, edit: [], delete: []};
    case EDIT_EMPLOYEE_SUCCESS:
      return {...state, isLoading: false, fetch: [], add: [], edit: {...action.payload}, delete: []};
    case DELETE_EMPLOYEE_SUCCESS:
      return {...state, isLoading: false, fetch: [], add: [], edit: [], delete: {...action.payload}};
    default:
      return state;
  }
};