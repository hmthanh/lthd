import { ALL_ACCOUNT_SUCCESS, ALL_ACCOUNT_FAILED, ALL_ACCOUNT_LOADING } from '../actions/actionType'
import { fetchFrom } from '../../utils/fetchHelper'
import { UrlApi, epAccount } from '../../shares/baseUrl'

export const getAllAccount = (id) => (dispatch) => {
  dispatch(loadingAllAccount());
  return fetchFrom(UrlApi + '/api/accounts/id', 'POST', { id })
    .then(response => {
      response = {
        val: [
          { id: 1, type: 'Thanh toán', number: '12312', money: 120000 },
          { id: 2, type: 'Tiết kiêm', number: '123123123', money: 990000 },
          { id: 3, type: 'Tiết kiệm', number: '645674567', money: 10000 }
        ]
      };
      // console.log(response)
      dispatch(successAllAccount(response));
    })
    .catch(err => {
      console.log(err)
      dispatch(failedAllAccount(err));
    })
}


export const loadingAllAccount = () => ({
  type: ALL_ACCOUNT_LOADING
})


export const successAllAccount = (response) => ({
  type: ALL_ACCOUNT_SUCCESS,
  payload: response
})


export const failedAllAccount = (error_msg) => ({
  type: ALL_ACCOUNT_FAILED,
  payload: error_msg
})