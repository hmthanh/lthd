import {
  CREATE_ALIAS_CREATING,
  CREATE_ALIAS_DELETED,
  CREATE_ALIAS_EDIT,
  CREATE_ALIAS_FAILED,
  CREATE_ALIAS_FETCH,
  CREATE_ALIAS_LOADING
} from '../actionType'
import {UrlApi} from '../../shares/baseUrl'
import {fetchFrom} from '../../utils/fetchHelper'

export const FetchAlias = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: CREATE_ALIAS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/receiver/${id}`, 'POST', {}, accessToken);
        console.log(response);
        dispatch({type: CREATE_ALIAS_FETCH, payload: response})
        resolve(response);
      } catch (e) {
        reject(e);
        dispatch({type: CREATE_ALIAS_FAILED, payload: e});
      }
    });
  };
}

export const CreateAlias = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: CREATE_ALIAS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/receiver', 'POST', data, accessToken);
        dispatch({type: CREATE_ALIAS_CREATING, payload: response});
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: CREATE_ALIAS_FAILED, payload: e});
        reject(e);
      }
    })
  };
}

export const EditAlias = (data, accessToken) => {
  return dispatch => {
    dispatch({type: CREATE_ALIAS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/receiver', 'PATCH', data, accessToken);
        resolve(response);
        dispatch({type: CREATE_ALIAS_EDIT, payload: response});
      } catch (e) {
        reject(e);
        dispatch({type: CREATE_ALIAS_FAILED, payload: e})
      }
    });
  }
}


export const DeleteAlias = (id, accessToken) => {
  return dispatch => {
    dispatch({type: CREATE_ALIAS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/receiver', 'DELETE', {id}, accessToken);
        dispatch({type: CREATE_ALIAS_DELETED, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        dispatch({type: CREATE_ALIAS_FAILED, payload: e});
      }
    })
  };
}
