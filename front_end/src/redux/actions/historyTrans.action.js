import {
  HISTORY_TRANS_FAILED,
  HISTORY_TRANS_LOADING,
  HISTORY_TRANS_SUCCESS,
  HISTORY_USER_TRANS_FAILED,
  HISTORY_USER_TRANS_LOADING,
  HISTORY_USER_TRANS_SUCCESS
} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getUserTransHistory = (data, accessToken) => {
  return dispatch => {
    dispatch({type: HISTORY_USER_TRANS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/history-user`, 'POST', data, accessToken);
        dispatch({type: HISTORY_USER_TRANS_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: HISTORY_USER_TRANS_FAILED, payload: e});
      }
    });
  };
};

export const getTransHistory = (data, index, accessToken) => {
  return dispatch => {
    dispatch({type: HISTORY_TRANS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/history/${index}`, 'POST', data, accessToken);
        dispatch({type: HISTORY_TRANS_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: HISTORY_TRANS_FAILED, payload: e});
      }
    });
  };
};