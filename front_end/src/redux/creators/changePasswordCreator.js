import {CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_LOADING, CHANGE_PASSWORD_SUCCESS} from '../actions/actionType'
import {UrlApi} from '../../shares/baseUrl';
import {fetchFrom} from '../../utils/fetchHelper'

export const changepwd = (uId, newPwd, OTP) => {
  return (dispatch) => {
    dispatch({type: CHANGE_PASSWORD_LOADING});

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth', 'PATCH', {uId, newPwd, OTP});
        console.log(response)
        if (response.error !== 0)
          dispatch({type: CHANGE_PASSWORD_FAILED, payload: "Sai mã OTP"});
        else
          dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: response})

        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: CHANGE_PASSWORD_FAILED, payload: e});
        reject(e);
      }
    });
  }
}


export const verifyPassword = (data, accessTocken) => {
  return (dispatch) => {
    dispatch({type: CHANGE_PASSWORD_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth/verify', 'POST', data, accessTocken)
        console.log(response)
        dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: response})
        resolve(response)
      } catch (e) {
        console.log(e);
        dispatch({type: CHANGE_PASSWORD_FAILED, payload: e});
        reject(e);
      }
    });
  };
};

export const ChangePasswordLoading = () => ({
  type: CHANGE_PASSWORD_LOADING
});


export const ChangePasswordSuccess = (data) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: data
});

export const ChangePasswordFailed = (errMsg = 'không thể kết nối đến server!!!') => ({
  type: CHANGE_PASSWORD_FAILED,
  payload: errMsg
});