import {
    ALL_STAFF_FAILED,
    ALL_STAFF_LOADING,
    ALL_STAFF_SUCCESS,
    
  } from '../actions/actionType'
  import {fetchFrom} from '../../utils/fetchHelper'
  import {UrlApi} from '../../shares/baseUrl'
  
  export const getAllStaff = (id, accessToken) => {
    return (dispatch) => {
      dispatch({type: ALL_STAFF_LOADING});
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
  