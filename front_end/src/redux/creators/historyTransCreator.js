import {
  HISTORY_USER_DEPT_FAILED,
  HISTORY_USER_DEPT_LOADING, HISTORY_USER_DEPT_SUCCESS, HISTORY_USER_RECEIVE_FAILED, HISTORY_USER_RECEIVE_LOADING, HISTORY_USER_RECEIVE_SUCCESS,
  HISTORY_USER_TRANS_FAILED,
  HISTORY_USER_TRANS_LOADING,
  HISTORY_USER_TRANS_SUCCESS
} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getUserTransHistory = (data, index, accessToken) => {
  return dispatch => {
    dispatch({type: HISTORY_USER_TRANS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/history/${index}`, 'POST', data, accessToken);
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

export const getUserReceiveHistory = (id, accessToken) => {
  return dispatch => {
    dispatch({type: HISTORY_USER_RECEIVE_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/history/receive', 'POST', {uid: id}, accessToken);
        console.log("response", response);
        dispatch({type: HISTORY_USER_RECEIVE_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: HISTORY_USER_RECEIVE_FAILED, payload: e});
      }
    });
  };
};

export const getUserDeptHistory = (data, accessToken) => {
  return dispatch => {
    dispatch({type: HISTORY_USER_DEPT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/remind', 'POST', data, accessToken);
        console.log("response", response);
        dispatch({type: HISTORY_USER_DEPT_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: HISTORY_USER_DEPT_FAILED, payload: e});
      }
    });
  };
};

export const getHistoryTrans = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: HISTORY_USER_TRANS_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/history-account', 'POST', {uid: id}, accessToken);
        dispatch({type: HISTORY_USER_TRANS_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: HISTORY_USER_TRANS_FAILED, payload: e});
      }
    })
  };
};