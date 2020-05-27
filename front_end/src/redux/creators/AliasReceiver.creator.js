import {
  CREATE_ALIAS_CREATING,
  CREATE_ALIAS_DELETED,
  CREATE_ALIAS_EDIT,
  CREATE_ALIAS_FAILED,
  CREATE_ALIAS_LOADING,
  CREATE_ALIAS_FETCH
} from '../actionType'

export const AliasReceiverCreator = (state = {
  isLoading: false,
  errMess: null,
  fetch: [],
  create: [],
  delete: [],
  edit: []
}, action) => {
  switch (action.type) {
    case CREATE_ALIAS_LOADING:
      return {isLoading: true, fetch: [], create: [], delete: [], edit: []};
    case CREATE_ALIAS_FAILED:
      return {...state, isLoading: false, fetch: [], create: [], delete: [], edit: [], ...action.payload};
    case CREATE_ALIAS_FETCH:
      return {...state, isLoading: false, fetch: action.payload, create: [], delete: [], edit: []};
    case CREATE_ALIAS_CREATING:
      return {...state, isLoading: false, fetch: [], create: action.payload, delete: [], edit: []};
    case CREATE_ALIAS_DELETED:
      return {...state, isLoading: false, fetch: [], create: [], delete: action.payload, edit: []};
    case CREATE_ALIAS_EDIT:
      return {...state, isLoading: false, fetch: [], create: [], delete: [], edit: action.payload};
    default:
      return state;
  }
};