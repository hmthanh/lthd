import { QUERY_ACCNUM_LOADING, QUERY_ACCNUM_SUCCESS, QUERY_ACCNUMP_FAILED} from '../actions/actionType'
import { fetchFrom } from '../../utils/fetchHelper'
import { UrlApi } from '../../shares/baseUrl'

export const queryAccountNum = (uid, accessToken) => (dispatch) => {
  dispatch(queryAccountNumLoading())
  return fetchFrom(UrlApi + `/api/accounts/${uid}`, 'POST', {}, accessToken)
    .then(response => {
      if (response.errorCode === 0) {
        console.log(response);
        console.log("success");
        dispatch(queryAccountNumSuccess(response));
      } else {
        dispatch(queryAccountNumFail(response.msg));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(queryAccountNumFail(err));
    })
}

export const queryAccountNumLoading = () => ({
  type: QUERY_ACCNUM_LOADING
})

export const queryAccountNumSuccess = (response) => ({
  type: QUERY_ACCNUM_SUCCESS,
  payload: response
});

export const queryAccountNumFail = (errorMsg = 'Không thể kết nối đến server!!!') => ({
  type: QUERY_ACCNUMP_FAILED,
  payload: errorMsg
});