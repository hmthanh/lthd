import {
  INDEBT_DELETED,
  INDEBT_FAILED,
  INDEBT_LOADING,
  INDEBT_SUCCESS,
} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getInDebt = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: INDEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/remind/`, 'POST', {id}, accessToken);
        dispatch({type: INDEBT_SUCCESS, payload: response});
        console.log(response);
        resolve(response);
      } catch (e) {
        dispatch({type: INDEBT_FAILED, payload: e});
        console.log(e);
        reject(e);
      }
    })
  };
}

export const DeleteInDebt = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: INDEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/remind/', 'DELETE', data, accessToken);
        resolve(response);
        dispatch({type: INDEBT_DELETED, payload: response})
      } catch (e) {
        console.log(e);
        reject(e);
        dispatch({type: INDEBT_FAILED, payload: e});
      }
    })
  };
}