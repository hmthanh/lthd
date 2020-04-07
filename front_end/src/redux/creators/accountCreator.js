import {
  ALL_ACCOUNT_FAILED,
  ALL_ACCOUNT_LOADING,
  ALL_ACCOUNT_SUCCESS,
  CREATE_ACC_FAILED,
  CREATE_ACC_LOADING,
  CREATE_ACC_SUCCESS
} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllAccount = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: ALL_ACCOUNT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/accounts/id`, 'POST', {id:id}, accessToken);
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