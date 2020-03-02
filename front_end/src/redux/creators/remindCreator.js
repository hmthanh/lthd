import { REMIND_FAILED, REMIND_LOADING, REMIND_SUCCESS } from '../actions/actionType'
import { fetchFrom } from '../../utils/fetchHelper'
import { UrlApi } from '../../shares/baseUrl'

export const getAllRemind = (account_num, accessToken) => (dispatch) => {
  dispatch(loadingRemind());
  return fetchFrom(UrlApi + `/api/remind/${account_num}`, 'POST', { account_num }, accessToken)
    .then(res => {
      // console.log(res);
      dispatch(successRemind(res))
    })
    .catch(err => {
      console.log(err);
      dispatch(failedRemind(err));
    })
};



export const loadingRemind = () => ({
  type: REMIND_LOADING
});

export const successRemind = (response) => ({
  type: REMIND_SUCCESS,
  payload: response
});


export const failedRemind = (error_msg) => ({
  type: REMIND_FAILED,
  payload: error_msg
});

export const Loading = () => ({
  type: REMIND_LOADING
});

