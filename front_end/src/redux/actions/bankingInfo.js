import {BANKING_INFO_FAILED, BANKING_INFO_LOADING, BANKING_INFO_SUCCESS} from '../actionType'
import {UrlApi} from '../../shares/baseUrl'
import {fetchFrom} from '../../utils/fetchHelper'

export const getBankingInfo = (id, accessTocken) => {
  return (dispatch) => {
    dispatch({type: BANKING_INFO_LOADING});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchFrom(UrlApi + `/api/accounts/${id}`, 'POST', {}, accessTocken);
        console.log(response);
        dispatch({type: BANKING_INFO_SUCCESS, payload: response.item});
        resolve(response);
      } catch (e) {
        console.log(e);
        dispatch({type: BANKING_INFO_FAILED, payload: e});
        reject(e);
      }
    });
  }
};
