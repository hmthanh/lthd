import {HISTORY_FAILED, HISTORY_LOADING, HISTORY_SUCCESS} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getHistoryTransfer = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: HISTORY_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/history-accountD', 'POST', {uid: id}, accessToken);
        dispatch({type: HISTORY_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: HISTORY_FAILED, payload: e});
      }
    })
  };
};