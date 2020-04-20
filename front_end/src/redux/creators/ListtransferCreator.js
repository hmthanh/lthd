import {
    TRANSFER_FAILED,
    TRANSFER_LOADING,
    TRANSFER_SUCCESS,
} from '../actions/actionType'

  import {fetchFrom} from '../../utils/fetchHelper'
  import {UrlApi} from '../../shares/baseUrl'
  
  export const transfer = (id, accessToken) => {
    return (dispatch) => {
      dispatch({type: TRANSFER_LOADING});
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetchFrom(UrlApi + `/api/listtransfer/all`, 'POST', {id:id}, accessToken);
          dispatch({type: TRANSFER_SUCCESS, payload: response});
          resolve(response);
        } catch (e) {
          reject(e);
          console.log(e);
          dispatch({type: TRANSFER_FAILED, payload: e});
        }
      });
    };
  };
  