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
  