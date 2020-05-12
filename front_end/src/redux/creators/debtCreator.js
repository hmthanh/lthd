import {
  CREATE_DEBT_FAILED,
  CREATE_DEBT_LOADING,
  CREATE_DEBT_SUCCESS,
  DEBT_FAILED,
  DEBT_LOADING,
  DEBT_SUCCESS,
  NAME_DEBT_DELETED,
  NAME_DEBT_EDIT,
  NAME_DEBT_LOADING
} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllDebt = (id, accessToken) => {
  return (dispatch) => {
    dispatch({type: DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/debt/${id}`, 'POST', {id}, accessToken);
        dispatch({type: DEBT_SUCCESS, payload: response});
        console.log(response);
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: DEBT_FAILED, payload: e});
        reject(e);
      }
    })
  };
}


export const Create = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: CREATE_DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/debt', 'POST', data, accessToken)
        dispatch({type: CREATE_DEBT_SUCCESS, payload: response});
        console.log(response);
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: CREATE_DEBT_FAILED, payload: e});
        reject(e);
      }
    })
  };
}

export const Edit = (data, accessToken) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/debt', 'PATCH', data, accessToken)
      .then(res => {
        if (res.err !== 200) {
          dispatch(failedDebt('Lỗi hệ thống'));
        } else {
          dispatch(SuccessEdit(res.item))
        }
      }).catch(err => {
        console.log(err);
        dispatch(failedDebt('không thể kết nối server'));
      })
};

export const Delete = (id, accessToken) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/debt', 'DELETE', {id}, accessToken)
      .then(res => {
        console.log(res);
        if (res.err !== 200) {
          dispatch(failedDebt('Lỗi hệ thống'));
        } else {
          dispatch(SuccessDelete(res.item))
        }
      }).catch(err => {
        console.log('Delete==================', err);
        dispatch(failedDebt('không thể kết nối server'));
      })
};


export const loadingDebt = () => ({
  type: DEBT_LOADING
});

export const successDebt = (response) => ({
  type: DEBT_SUCCESS,
  payload: response
});


export const failedDebt = (error_msg) => ({
  type: DEBT_FAILED,
  payload: error_msg
});

export const Loading = () => ({
  type: NAME_DEBT_LOADING
});

export const SuccessEdit = (response) => ({
  type: NAME_DEBT_EDIT,
  payload: response
});

export const SuccessDelete = (response) => ({
  type: NAME_DEBT_DELETED,
  payload: response
});