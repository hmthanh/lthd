import {BANKING_INFO_LOADING, BANKING_INFO_FAILED, BANKING_INFO_SUCCESS} from '../actions/actionType'
import { UrlApi } from '../../shares/baseUrl'
import { fetchFrom } from '../../utils/fetchHelper'

export const getBankingInfo = (id) => (dispatch) => {
  dispatch(BankingLoading());
  return fetchFrom(UrlApi + '/api/accounts/id', 'POST', {id})
        .then(response=>{
            // console.log(response)
            dispatch(BankingSuccess(response));
        })
        .catch(err => {
          console.log(err)
          dispatch(BankingFailed());
        })
}

export const BankingLoading = () => ({
  type: BANKING_INFO_LOADING
})


export const BankingSuccess = (data) => ({
  type: BANKING_INFO_SUCCESS,
  payload: data
})

export const BankingFailed = (errMsg = 'không thể kết nối đến server!!!') => ({
  type: BANKING_INFO_FAILED,
  payload: errMsg
})
