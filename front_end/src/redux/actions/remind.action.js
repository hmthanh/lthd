import {NOTIFY_DELETED, NOTIFY_FAILED, NOTIFY_LOADING, NOTIFY_SUCCESS, REMIND_FAILED, REMIND_LOADING, REMIND_SUCCESS} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getCountReminder = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: REMIND_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/remind/count`, 'POST', {id}, accessToken);
        dispatch({type: REMIND_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: REMIND_FAILED, payload: e});
      }
    })
  };
}

export const getNotify = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: NOTIFY_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/notify`, 'POST', {id}, accessToken);
        dispatch({type: NOTIFY_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: NOTIFY_FAILED, payload: e});
      }
    })
  };
}

export const delNotify = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: NOTIFY_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/notify`, 'DELETE', {id}, accessToken);
        dispatch({type: NOTIFY_DELETED, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: NOTIFY_FAILED, payload: e});
      }
    })
  };
}