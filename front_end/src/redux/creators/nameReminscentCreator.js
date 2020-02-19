import {
  NAME_REMINISCENT_SUCCESS, NAME_REMINISCENT_LOADING, NAME_REMINISCENT_FAILED,
  NAME_REMINISCENT_DELETED, NAME_REMINISCENT_EDIT
} from '../actions/actionType'
import { UrlApi } from '../../shares/baseUrl'
import { fetchFrom } from '../../utils/fetchHelper'

export const Create = (data) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/receiver', 'POST', data)
    .then(response => {
      console.log(response)
      if (response.item) {
        fetchFrom(UrlApi + '/api/reminscent', 'POST', data)
          .then(res => {
            if (res.err !== 200) {
              dispatch(ErrorAccount('Lỗi hệ thống'));
            } else {
              Success(res.item)
            }
          }).catch(err => {
            console.log(err)
            dispatch(ErrorAccount('không thể kết nối server'));
          })
      } else {
        dispatch(ErrorAccount('Tài Khoản Không Tồn Tại'));
      }
    })
    .catch(err => {
      console.log(err)
      dispatch(ErrorAccount('không thể kết nối server'));
    })
}

export const Edit = (data) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/reminscent/id', 'POST', data)
    .then(res => {
      if (res.err !== 200) {
        dispatch(ErrorAccount('Lỗi hệ thống'));
      } else {
        Success(res.item)
      }
    }).catch(err => {
      console.log(err)
      dispatch(ErrorAccount('không thể kết nối server'));
    })
}

export const ErrorAccount = (msg) => ({
  type: NAME_REMINISCENT_FAILED,
  payload: msg
})

export const Loading = () => ({
  type: NAME_REMINISCENT_LOADING
})


export const Success = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
})