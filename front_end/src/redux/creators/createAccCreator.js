import {
  INTERBANK_ASSOCIATE_FAILED,
  INTERBANK_ASSOCIATE_LOADING,
  INTERBANK_ASSOCIATE_SUCCESS,
  RECEIVER_SAVED_FAILED,
  RECEIVER_SAVED_LOADING,
  RECEIVER_SAVED_SUCCESS,
  TRANSFER_FAILED,
  TRANSFER_INVALID,
  TRANSFER_LOADING,
  TRANSFER_SUCCESS,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_INVALID,
  VERIFY_OTP_LOADING,
  VERIFY_OTP_SUCCESS
} from '../actions/actionType'

import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const createAcc = (data, accessToken) => {
  return dispatch => {
    dispatch({type: TRANSFER_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/accounts', 'POST', data, accessToken);
        dispatch({type: TRANSFER_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: TRANSFER_FAILED, payload: e});
      }
    });
  }
};
