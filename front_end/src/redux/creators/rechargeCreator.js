import {RECHARGE_FAILED, RECHARGE_LOADING, RECHARGE_SUCCESS} from '../actions/actionType'

import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const recharge = (data, accessToken) => (dispatch) => {
  dispatch(rechargeLoading());
  return fetchFrom(UrlApi + '/api/recharge', 'POST', data, accessToken)
      .then(response => {
        if (response.errorCode === 0) {
          dispatch(rechargeSuccess(response));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(rechargeFailed(err));
      })
};

export const rechargeLoading = () => ({
  type: RECHARGE_LOADING
});
export const rechargeSuccess = (response) => ({
  type: RECHARGE_SUCCESS,
  payload: response
});
export const rechargeFailed = (error_msg) => ({
  type: RECHARGE_FAILED,
  payload: error_msg
});
