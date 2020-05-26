import { INTERBANK_ASSOCIATE_LOADING, INTERBANK_ASSOCIATE_SUCCESS, INTERBANK_ASSOCIATE_FAILED } from '../actionType'
import { fetchFrom } from '../../utils/fetchHelper'
import { UrlApi } from '../../shares/baseUrl'

export const queryBankingAssociate = (accessToken) => (dispatch) => {
  dispatch(interbankAssociateLoading());
  return fetchFrom(UrlApi + '/api/associate', 'POST', {}, accessToken)
    .then(res => {
      if (res.errorCode === 0)
        dispatch(interbankAssociateSuccess(res))
      else dispatch(interbankAssociateFail(res.msg))
    })
    .catch(err => {
      dispatch(interbankAssociateFail());
    })
};

export const interbankAssociateLoading = () => ({
  type: INTERBANK_ASSOCIATE_LOADING
});
export const interbankAssociateSuccess = (response) => ({
  type: INTERBANK_ASSOCIATE_SUCCESS,
  payload: response
});
export const interbankAssociateFail = (errorMsg = 'Không thể kết nối server') => ({
  type: INTERBANK_ASSOCIATE_FAILED,
  payload: errorMsg
});