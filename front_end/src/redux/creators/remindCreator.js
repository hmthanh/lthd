import {REMIND_FAILED, REMIND_LOADING, REMIND_SUCCESS} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllRemind = (id, accessToken) => (dispatch) => {
  dispatch({type: REMIND_LOADING});
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchFrom(UrlApi + `/api/remind/${id}`, 'POST', {id}, accessToken);
      dispatch({type: REMIND_SUCCESS, payload: response});
      resolve(response);
    } catch (e) {
      reject(e);
      console.log(e);
      dispatch({type: REMIND_FAILED, payload: e});
    }
  })
};