import {
  CREATE_DEBT_FAILED,
  CREATE_DEBT_LOADING,
  CREATE_DEBT_SUCCESS,
  DEBT_FAILED,
  DEBT_LOADING,
  DEBT_SUCCESS,
  NAME_DEBT_DELETED,
  NAME_DEBT_EDIT,
  NAME_DEBT_LOADING
} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const fetchDebtReminder = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/debt/${id}`, 'POST', {id}, accessToken);
        dispatch({type: DEBT_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: DEBT_FAILED, payload: e});
        reject(e);
      }
    })
  };
}

export const createDebtReminder = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: CREATE_DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/debt', 'POST', data, accessToken)
        dispatch({type: CREATE_DEBT_SUCCESS, payload: response});
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
  return (dispatch) => {
    dispatch({type: NAME_DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/debt', 'PATCH', data, accessToken);
        resolve(response);
        dispatch({type: NAME_DEBT_EDIT, payload: response.item});
      } catch (e) {
        console.log(e);
        dispatch({type: DEBT_FAILED, payload: e});
        reject(e);
      }
    })
  };
}


export const Delete = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: NAME_DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/debt', 'DELETE', data, accessToken);
        resolve(response);
        dispatch({type: NAME_DEBT_DELETED, payload: response})
      } catch (e) {
        console.log(e);
        reject(e);
        dispatch({type: DEBT_FAILED, payload: e});
      }
    })
  };
}

