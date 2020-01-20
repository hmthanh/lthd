import { REGISTER_LOADING, REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_DEAULFT } from '../actions/actionType'
import { UrlApi } from '../../shares/baseUrl';
import { fetchFrom } from '../../utils/fetchHelper'

export const register = (data) => (dispatch) => {
  dispatch(registerLoading());
  return fetchFrom(UrlApi + '/api/register', 'POST', data)
        .then(response => response.json())
        .then(response=>{
            dispatch(registerSuccess(response));
        })
        .catch(err => {
          console.log(err)
          dispatch(registerFailed());
        })
}

export const registerLoading = () => ({
  type: REGISTER_LOADING
})


export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data
})

export const registerFailed = () => ({
  type: REGISTER_FAILED,
  payload: 'không thể kết nối đến server!!!'
})

export const backRegister = () => (dispatch) => {
  dispatch({
    type: REGISTER_DEAULFT
  })
}