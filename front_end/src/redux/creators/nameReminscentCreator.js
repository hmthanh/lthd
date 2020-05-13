import {
  CREATE_DEBT_FAILED,
  CREATE_DEBT_LOADING,
  CREATE_DEBT_SUCCESS,
  NAME_REMINISCENT_DELETED,
  NAME_REMINISCENT_EDIT,
  NAME_REMINISCENT_FAILED,
  NAME_REMINISCENT_LOADING,
  NAME_REMINISCENT_SUCCESS
} from '../actions/actionType'
import {UrlApi} from '../../shares/baseUrl'
import {fetchFrom} from '../../utils/fetchHelper'

export const Fetch = (id, accessToken) => (dispatch) => {
  dispatch(Loading());
  console.log(`=====/api/receiver/${id}`)
  return fetchFrom(UrlApi + `/api/receiver/${id}`, 'POST', {}, accessToken)
      .then(res => {
        console.log(res);
        dispatch(Success({item: res}))
      })
      .catch(err => {
        console.log(err);
        dispatch(ErrorAccount('không thể kết nối server'));
      })
};

export const Create = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: CREATE_DEBT_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/receiver', 'POST', data, accessToken);
        if (response.err == 200) {
          dispatch({type: CREATE_DEBT_SUCCESS, payload: response});
        } else {
          dispatch({type: CREATE_DEBT_FAILED, payload: response});
        }
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
  return fetchFrom(UrlApi + '/api/receiver', 'PATCH', data, accessToken)
      .then(res => {
        if (res.err !== 200) {
          dispatch(ErrorAccount('Lỗi hệ thống'));
        } else {
          dispatch(SuccessEdit(res.item))
        }
      }).catch(err => {
        console.log(err);
        dispatch(ErrorAccount('không thể kết nối server'));
      })
};

export const Delete = (id, accessToken) => (dispatch) => {
  dispatch(Loading());
  return fetchFrom(UrlApi + '/api/receiver', 'DELETE', {id}, accessToken)
      .then(res => {
        console.log(res)
        if (res.err !== 200) {
          dispatch(ErrorAccount('Lỗi hệ thống'));
        } else {
          dispatch(SuccessDelete(res.item))
        }
      }).catch(err => {
        console.log('Delete==================', err);
        dispatch(ErrorAccount('không thể kết nối server'));
      })
};

export const ErrorAccount = (msg) => ({
  type: NAME_REMINISCENT_FAILED,
  payload: msg
});

export const Loading = () => ({
  type: NAME_REMINISCENT_LOADING
});


export const Success = (data) => ({
  type: NAME_REMINISCENT_SUCCESS,
  payload: data
});

export const SuccessEdit = (data) => ({
  type: NAME_REMINISCENT_EDIT,
  payload: data
});

export const SuccessDelete = (data) => ({
  type: NAME_REMINISCENT_DELETED,
  payload: data
});