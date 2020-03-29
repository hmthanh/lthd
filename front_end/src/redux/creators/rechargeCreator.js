import {RECHARGE_FAILED, RECHARGE_LOADING, RECHARGE_SUCCESS} from '../actions/actionType'

import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const recharge = (data, accessToken) => {
  return (dispatch) => {
    dispatch({type: RECHARGE_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + '/api/recharge', 'POST', data, accessToken);
        dispatch({type: RECHARGE_SUCCESS});
        resolve(response.data);
      }
      catch (e) {
        console.log(e);
        reject(e);
        dispatch({type: RECHARGE_FAILED});
      }
    });
  };
};