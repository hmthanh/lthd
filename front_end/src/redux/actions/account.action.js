import {
  ALL_ACCOUNT_FAILED,
  ALL_ACCOUNT_LOADING,
  ALL_ACCOUNT_SUCCESS,
  CLOSE_PAYMENT_FAILED,
  CLOSE_PAYMENT_LOADING,
  CLOSE_PAYMENT_SUCCESS,
  CREATE_ACC_FAILED,
  CREATE_ACC_LOADING,
  CREATE_ACC_SUCCESS,
  CREATE_PAYMENT_FAILED,
  CREATE_PAYMENT_LOADING,
  CREATE_PAYMENT_SUCCESS, PAYMENT_ACCOUNT_FAILED, PAYMENT_ACCOUNT_LOADING, PAYMENT_ACCOUNT_SUCCESS
} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllAccount = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: ALL_ACCOUNT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/accounts/id`, 'POST', {id: id}, accessToken);
        dispatch({type: ALL_ACCOUNT_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: ALL_ACCOUNT_FAILED, payload: e});
      }
    });
  };
};

export const getPaymentAcc = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: PAYMENT_ACCOUNT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/accounts/accpayment`, 'POST', {id: id}, accessToken);
        dispatch({type: PAYMENT_ACCOUNT_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: PAYMENT_ACCOUNT_FAILED, payload: e});
      }
    });
  };
};


export const createAcc = (data, accessToken) => {
  return dispatch => {
    dispatch({type: CREATE_ACC_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/accounts', 'POST', data, accessToken);
        dispatch({type: CREATE_ACC_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: CREATE_ACC_FAILED, payload: e});
      }
    });
  }
};

export const createPayment = (data, accessToken) => {
  return dispatch => {
    dispatch({type: CREATE_PAYMENT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/accounts/payment', 'POST', data, accessToken);
        dispatch({type: CREATE_PAYMENT_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: CREATE_PAYMENT_FAILED, payload: e});
      }
    });
  }
};

export const closeAccount = (data, accessToken) => {
  return dispatch => {
    dispatch({type: CLOSE_PAYMENT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/accounts/closed', 'POST', data, accessToken);
        dispatch({type: CLOSE_PAYMENT_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        reject(e);
        console.log(e);
        dispatch({type: CLOSE_PAYMENT_FAILED, payload: e});
      }
    });
  }
};