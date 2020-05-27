import { RECEIVER_SAVED_LOADING, RECEIVER_SAVED_SUCCESS, RECEIVER_SAVED_FAILED } from '../actionType'
import { fetchFrom } from '../../utils/fetchHelper'
import { UrlApi } from '../../shares/baseUrl'

export const queryReceiverSaved = (uid, partner, accessToken) => (dispatch) => {
  dispatch(receiverSavedLoading())
  // console.log("uid", uid, "accessToken", accessToken)
  return fetchFrom(UrlApi + `/api/receiver/${uid}`, 'POST', {partnerCode: partner}, accessToken)
    .then(res => {
      if(res.errorCode === 0)
        dispatch(receiverSavedSuccess(res))
      else dispatch(receiverSavedFailed(res.msg))
    })
    .catch(err => {
      console.log(err);
      dispatch(receiverSavedFailed());
    })
}


export const receiverSavedLoading = () => ({
  type: RECEIVER_SAVED_LOADING
})

export const receiverSavedSuccess = (response) => ({
  type: RECEIVER_SAVED_SUCCESS,
  payload: response
})

export const receiverSavedFailed = (errorMsg = 'Không thể Kết nối server !!!') => ({
  type: RECEIVER_SAVED_FAILED,
  payload: errorMsg
})