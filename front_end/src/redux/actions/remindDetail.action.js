import { REMIND_DETAIL_SUCCESS, REMIND_DETAIL_LOADING, REMIND_DETAIL_FAILED } from '../actionType'
import { fetchFrom } from '../../utils/fetchHelper'
import { UrlApi } from '../../shares/baseUrl'

export const getAllRemindDetail = (id, accessToken) => (dispatch) => {
  dispatch(loadingRemindDetail());
  return fetchFrom(UrlApi + `/api/remind`, 'POST', { id }, accessToken)
    .then(res => {
      console.log(res.item.length)
      dispatch(successRemindDetail(res))
    })
    .catch(err => {
      console.log(err)
      dispatch(failedRemindDetail(err))
    })
};



export const loadingRemindDetail = () => ({
  type: REMIND_DETAIL_LOADING
});

export const successRemindDetail = (response) => ({
  type: REMIND_DETAIL_SUCCESS,
  payload: response
});


export const failedRemindDetail = (error_msg) => ({
  type: REMIND_DETAIL_FAILED,
  payload: error_msg
});

