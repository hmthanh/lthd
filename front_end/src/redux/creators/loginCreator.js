import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from '../actions/actionType'
import {UrlApi} from '../../shares/baseUrl';
import {fetchFrom} from '../../utils/fetchHelper'

export const login = (data) => {
  return (dispatch) => {
    dispatch(LoginLoading());
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/auth', 'POST', data);
        dispatch(LoginSuccess(response));
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch(LoginFailed());
      }
    });
  };
};

export const relogin = (uId) => {
  return (dispatch) => {
    dispatch(LoginLoading());
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


export const logout = () => (dispatch) => {
  dispatch(LoginSuccess({}));
};

export const LoginLoading = () => ({
  type: LOGIN
});

export const LoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const LoginFailed = (errMsg = 'Không thể kết nối đến server!!!') => ({
  type: LOGIN_FAILED,
  payload: errMsg
});