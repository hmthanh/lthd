import {
    ALL_STAFF_FAILED,
    ALL_STAFF_LOADING,
    ALL_STAFF_SUCCESS,
    CREATE_STAFF_SUCCESS,
    CREATE_STAFF_LOADING,
    CREATE_STAFF_FAILED,
    
  } from '../actions/actionType'
  import {fetchFrom} from '../../utils/fetchHelper'
  import {UrlApi} from '../../shares/baseUrl'
  
  export const getAllStaff = (id, accessToken) => {
    return (dispatch) => {
      dispatch({type: loadingStaff()});
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetchFrom(UrlApi + `/api/liststaff/all`, 'POST', {id:id}, accessToken);
          dispatch({type: ALL_STAFF_SUCCESS, payload: response});
          resolve(response);
        } catch (e) {
          reject(e);
          console.log(e);
          dispatch({type: ALL_STAFF_FAILED, payload: e});
        }
      });
    };
  };
  


  export const Edit = (data, accessToken) => (dispatch) => {
    dispatch(loadingStaff());
    return fetchFrom(UrlApi + '/api/liststaff', 'PATCH', data, accessToken)
        .then(res => {
            if (res.err !== 200) {
                dispatch(ALL_STAFF_FAILED('Lỗi hệ thống'));
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
    return fetchFrom(UrlApi + '/api/liststaff', 'DELETE', {id:id}, accessToken)
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

export const Create = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: CREATE_STAFF_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/admin/employee', 'POST', data, accessToken)
        dispatch({type: CREATE_STAFF_SUCCESS, payload: response});
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: CREATE_STAFF_FAILED, payload: e});
        reject(e);
      }
    })
  };
}


export const loadingStaff = () => ({
  type: ALL_STAFF_LOADING
});

export const staffsuccess = (response) => ({
  type: ALL_STAFF_SUCCESS,
  payload: response
});


export const stafffailed = (error_msg) => ({
  type: ALL_STAFF_FAILED,
  payload: error_msg
});