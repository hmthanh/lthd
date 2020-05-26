import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS, VERIFY_FORGET_FAILED, VERIFY_FORGET_LOADING, VERIFY_FORGET_SUCCESS,
  VERIFY_PASSWORD_FAILED,
  VERIFY_PASSWORD_LOADING,
  VERIFY_PASSWORD_SUCCESS
} from '../actionType'
import {UrlApi} from '../../shares/baseUrl';
import {fetchFrom} from '../../utils/fetchHelper'

export const changePwd = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: CHANGE_PASSWORD_LOADING});

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth', 'PATCH', data, accessToken);
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
    dispatch({type: VERIFY_PASSWORD_LOADING});
    return new Promise(async (resolve, reject) => {
      try {

        const response = await fetchFrom(UrlApi + '/api/auth/verify', 'POST', data, accessTocken)
        console.log(response)
        dispatch({type: VERIFY_PASSWORD_SUCCESS, payload: response})
        resolve(response)
      } catch (e) {
        console.log(e);
        dispatch({type: VERIFY_PASSWORD_FAILED, payload: e});
        reject(e);
      }
    });
  };
};

export const verifyForget = (data) => {
  return (dispatch) => {
    dispatch({type: VERIFY_FORGET_LOADING});

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth/forget', 'PATCH', data);
        console.log(response);
        dispatch({type: VERIFY_FORGET_SUCCESS, payload: response})
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: VERIFY_FORGET_FAILED, payload: e});
        reject(e);
      }
    });
  }
}