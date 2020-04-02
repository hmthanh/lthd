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


export const transfer = (data, accessToken) => {
  return dispatch => {
    dispatch({type: TRANSFER_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/transfer', 'POST', data, accessToken);
        if (response.errorCode === 0) {
          dispatch({type: TRANSFER_SUCCESS, payload: response});
        } else {
          dispatch({type: TRANSFER_INVALID, payload: response});
        }
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: TRANSFER_FAILED, payload: e});
      }
    });
  }
};

export const getInterbank = (accessToken) => {
  return dispatch => {
    dispatch({type: INTERBANK_ASSOCIATE_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/associate', 'POST', {}, accessToken);
        dispatch({type: INTERBANK_ASSOCIATE_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: INTERBANK_ASSOCIATE_FAILED, payload: e});
      }
    });
  };
};

export const getReceiverSaved = (uid, accessToken) => {
  return dispatch => {
    dispatch({type: RECEIVER_SAVED_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/receiver/${uid}`, 'POST', {}, accessToken);
        dispatch({type: RECEIVER_SAVED_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: RECEIVER_SAVED_FAILED, payload: e});
      }
    });
  }
};

export const verifyOTP = (transID, data, accessToken) => {
  return dispatch => {
    dispatch({type: VERIFY_OTP_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/transfer/${transID}`, 'POST', data, accessToken);
        if (response.errorCode === 0) {
          dispatch({type: VERIFY_OTP_SUCCESS, payload: response});
        } else {
          dispatch({type: VERIFY_OTP_INVALID, payload: response});
        }
        resolve(response);
      } catch (e) {
        console.log(e);
        reject(e);
        dispatch({type: VERIFY_OTP_FAILED, payload: e});
      }
    });
  }
};
