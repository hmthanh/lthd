import { CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_LOADING, CHANGE_PASSWORD_SUCCESS } from '../actions/actionType'
import { UrlApi } from '../../shares/baseUrl';
import { fetchFrom } from '../../utils/fetchHelper'

export const changepwd = (uId, newPwd, OTP) => (dispatch) => {
  dispatch(ChangePasswordLoading());

  return fetchFrom(UrlApi + '/api/auth', 'PATCH', {uId, newPwd, OTP}).then(response => {
    console.log(response)
    if(response.error !== 0)
      dispatch(ChangePasswordFailed('sai otp'))
    else
      dispatch(ChangePasswordSuccess(response))
  }).catch(err => {
    console.log(err);
    dispatch(ChangePasswordFailed());
  })

};


export const verifyPassword = (uId, oldPwd, newPw1, newPw2) => (dispatch) => {
  dispatch(ChangePasswordLoading());
  if (newPw1.localeCompare(newPw2) !== 0) {
    return new Promise((resolve, reject) => {
      resolve(dispatch(ChangePasswordFailed('Mật Khẩu 2 lần không giống nhau')))
    })
  } else {
    return fetchFrom(UrlApi + '/api/auth/verify', 'POST', { oldPwd, uId }).then(response => {
      dispatch(ChangePasswordSuccess(response))
    }).catch(err => {
      console.log(err);
      dispatch(ChangePasswordFailed());
    })
  }

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