import {
    ALL_CUSTOMER_FAILED,
    ALL_CUSTOMER_LOADING,
    ALL_CUSTOMER_SUCCESS,
    
  } from '../actions/actionType'
  import {fetchFrom} from '../../utils/fetchHelper'
  import {UrlApi} from '../../shares/baseUrl'
  
  export const getAllCustomer = (id, accessToken) => {
    return (dispatch) => {
      dispatch({type: ALL_CUSTOMER_LOADING});
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetchFrom(UrlApi + `/api/listuser/all`, 'POST', {id:id}, accessToken);
          dispatch({type: ALL_CUSTOMER_SUCCESS, payload: response});
          resolve(response);
        } catch (e) {
          reject(e);
          console.log(e);
          dispatch({type: ALL_CUSTOMER_FAILED, payload: e});
        }
      });
    };
  };
  

  

export const Edit = (data, accessToken) => (dispatch) => {
    dispatch(loadingStaff());
    return fetchFrom(UrlApi + '/api/listuser', 'PATCH', data, accessToken)
        .then(res => {
            if (res.err !== 200) {
                dispatch(ALL_CUSTOMER_FAILED('Lỗi hệ thống'));
            } else {
                dispatch(staffsuccess(res.item))
            }
        }).catch(err => {
            console.log(err);
            dispatch(stafffailed('không thể kết nối server'));
        })
};

export const Delete = (id, accessToken) => (dispatch) => {
    dispatch(loadingStaff());
    return fetchFrom(UrlApi + '/api/listuser', 'DELETE', {id:id}, accessToken)
        .then(res => {
            console.log(res);
            if (res.err !== 200) {
                dispatch(stafffailed('Lỗi hệ thống'));
            } else {
                dispatch(staffsuccess(res.item))
            }
        }).catch(err => {
            console.log('Delete==================', err);
            dispatch(stafffailed('không thể kết nối server'));
        })
};


export const loadingStaff = () => ({
  type: ALL_CUSTOMER_LOADING
});

export const staffsuccess = (response) => ({
  type: ALL_CUSTOMER_SUCCESS,
  payload: response
});


export const stafffailed = (error_msg) => ({
  type: ALL_CUSTOMER_FAILED,
  payload: error_msg
});