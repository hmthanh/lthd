import {
  CREATE_DEBT_FAILED,
  CREATE_DEBT_LOADING,
  CREATE_DEBT_SUCCESS,
  NAME_REMINISCENT_DELETED,
  NAME_REMINISCENT_EDIT,
  NAME_REMINISCENT_FAILED,
  NAME_REMINISCENT_LOADING,
  NAME_REMINISCENT_SUCCESS
} from '../actions/actionType'
import {UrlApi} from '../../shares/baseUrl'
import {fetchFrom} from '../../utils/fetchHelper'

export const Fetch = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: NAME_REMINISCENT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/receiver/${id}`, 'POST', {}, accessToken);
        console.log(response);
        dispatch({type: NAME_REMINISCENT_SUCCESS, payload: response})
        resolve(response);
      } catch (e) {
        reject(e);
        dispatch({type: NAME_REMINISCENT_FAILED, payload: e});
      }
    });
  };
}

export const Create = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: CREATE_DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/receiver', 'POST', data, accessToken);
        if (response.err === 200) {
          dispatch({type: CREATE_DEBT_SUCCESS, payload: response});
        } else {
          dispatch({type: CREATE_DEBT_FAILED, payload: response});
        }
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: CREATE_DEBT_FAILED, payload: e});
        reject(e);
      }
    })
  };
}

export const Edit = (data, accessToken) => {
  return dispatch => {
    dispatch({type: NAME_REMINISCENT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/receiver', 'PATCH', data, accessToken);
        resolve(response);
        dispatch({type: NAME_REMINISCENT_EDIT, payload: response});
      } catch (e) {
        reject(e);
        dispatch({type: NAME_REMINISCENT_FAILED, payload: e})
      }
    });
  }
}


export const Delete = (id, accessToken) => {
  return dispatch => {
    dispatch({type: NAME_REMINISCENT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/receiver', 'DELETE', {id}, accessToken);
        dispatch({type: NAME_REMINISCENT_DELETED, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        dispatch({type: NAME_REMINISCENT_FAILED, payload: e});
      }
    })
  };
}
