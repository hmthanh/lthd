import {
    DEBT_FAILED,
    DEBT_LOADING,
    DEBT_SUCCESS,
    NAME_DEBT_DELETED,
    NAME_DEBT_EDIT,
    NAME_DEBT_LOADING
} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllDebt = (id, accessToken) => (dispatch) => {
    dispatch(loadingDebt());
    return fetchFrom(UrlApi + `/api/debt/${id}`, 'POST', {id}, accessToken)
        .then(res => {
            // console.log(res);
            dispatch(successDebt(res))
        })
        .catch(err => {
            console.log(err);
      dispatch(failedDebt(err));
    })
};

export const Create = (data) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/debt', 'POST', data)
    .then(res => {
      console.log(res)
      if (res.err !== 200) {
        dispatch(failedDebt('Lỗi hệ thống'));
      } else {
        dispatch(successDebt(res.item))
      }
    }).catch(err => {
      console.log(err);
      dispatch(failedDebt('không thể kết nối server'));
    })
};

export const Edit = (data) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/debt', 'PATCH', data)
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

export const Delete = (id) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/debt', 'DELETE', { id })
    .then(res => {
      console.log(res)
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