import {
  LOGIN_LOADING,
  LOGIN_FAILED,
  LOGIN_AUTH_SUCCESS,
  LOGIN_AUTH_FAILED,
  ACTIVE_ACCOUNT_LOADING,
  ACTIVE_ACCOUNT_FAILED, ACTIVE_ACCOUNT_SUCCESS
} from '../actionType'
import {UrlApi} from '../../shares/baseUrl';
import {fetchFrom} from '../../utils/fetchHelper'

export const login = (data) => {
  return (dispatch) => {
    dispatch({type: LOGIN_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth', 'POST', data);
        if (response.authenticated){
          if (response.user.role)
          dispatch({type: LOGIN_AUTH_SUCCESS, payload: response});
        }
        else{
          dispatch({type: LOGIN_AUTH_FAILED, payload: response});
        }
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch(LoginFailed());
      }
    });
  };
};

export const activeAccount = (data) => {
  return (dispatch) => {
    dispatch({type: ACTIVE_ACCOUNT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth/activate', 'POST', data);
        dispatch({type: ACTIVE_ACCOUNT_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: ACTIVE_ACCOUNT_FAILED, payload: e});
      }
    });
  };
};

export const relogin = (uId) => {
  return (dispatch) => {
    dispatch({type: LOGIN_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth/relogin', 'POST', {uId});
        console.log("relogin", response);
        dispatch(LoginSuccess(response));
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch(LoginFailed());
        reject(e);
      }
    });
  };
};

// export const logoutFail =() => {
//   return undefined;
// }

// export const logout = (uId) => {
//   return (dispatch) => {
//     return new Promise(async (resolve, reject) => {
//
//
//       try {
//         const response = await fetchFrom(UrlApi + '/api/logout/', 'POST', {uId});
//         console.log("relogin", response);
//         dispatch(logoutSuccess(response));
//         resolve(response);
//       } catch (e) {
//         console.log(e);
//         dispatch(logoutFail());
//         reject(e);
//       }
//     });
//   };
// };


export const logout = () => () => {
  localStorage.clear()
};

export const LoginSuccess = (data) => ({
  type: LOGIN_AUTH_SUCCESS,
  payload: data
});

export const LoginFailed = (errMsg = 'Không thể kết nối đến server!!!') => ({
  type: LOGIN_FAILED,
  payload: errMsg
});