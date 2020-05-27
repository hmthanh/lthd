import {FORGET_PASSWORD_FAILED, FORGET_PASSWORD_LOADING, FORGET_PASSWORD_SUCCESS} from '../actionType'
import {UrlApi} from '../../shares/baseUrl'
import {fetchFrom} from '../../utils/fetchHelper'

export const forgetPwd = (data) => {
  return (dispatch) => {
    dispatch({type: FORGET_PASSWORD_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/auth/forget`, 'POST', data);
        dispatch({type: FORGET_PASSWORD_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: FORGET_PASSWORD_FAILED, payload: e});
        reject(e);
      }
    });
  }
};
