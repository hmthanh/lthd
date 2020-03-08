import {
    INTERBANK_ASSOCIATE_FAILED,
    INTERBANK_ASSOCIATE_LOADING,
    INTERBANK_ASSOCIATE_SUCCESS,
    RECEIVER_SAVED_FAILED,
    RECEIVER_SAVED_LOADING,
    RECEIVER_SAVED_SUCCESS,
    TRANSFER_FAILED,
    TRANSFER_INVALID,
    TRANSFER_LOADING,
    TRANSFER_SUCCESS
} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const transfer = (data, accessToken) => (dispatch) => {
    console.log("4data", data);
    console.log("5accessToken", accessToken);
    dispatch(transferLoading());
    return fetchFrom(UrlApi + '/api/transfer', 'POST', data, accessToken)
        .then(response => {
            if (response.errorCode === 0) {
                console.log("success");
                dispatch(transferSuccess(response));
            } else {
                dispatch(transferInvalid(response));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(transferFailed(err));
        })
};

export const getInterbankAssociate = (accessToken) => (dispatch) => {
    dispatch(interbankAssociateLoading());
    return fetchFrom(UrlApi + '/api/associate', 'POST', {}, accessToken)
        .then(res => {
            // console.log(res);
            dispatch(interbankAssociateSuccess(res))
        })
        .catch(err => {
            console.log(err);
            dispatch(interbankAssociateFail(err));
        })
};

export const getListReceiverSaved = (uid, accessToken) => (dispatch) => {
    dispatch(receiverSavedLoading());
    return fetchFrom(UrlApi + `/api/receiver/${uid}`, 'POST', {}, accessToken)
        .then(res => {
            dispatch(receiverSavedSuccess(res))
        })
        .catch(err => {
            console.log(err);
            dispatch(receiverSavedFailed(err));
        })
};

export const interbankAssociateLoading = () => ({
    type: INTERBANK_ASSOCIATE_LOADING
});
export const interbankAssociateSuccess = (response) => ({
    type: INTERBANK_ASSOCIATE_SUCCESS,
    payload: response
});
export const interbankAssociateFail = (error_msg) => ({
    type: INTERBANK_ASSOCIATE_FAILED,
    payload: error_msg
});


export const transferLoading = () => ({
    type: TRANSFER_LOADING
});
export const transferSuccess = (response) => ({
    type: TRANSFER_SUCCESS,
    payload: response
});
export const transferInvalid = (response) => ({
    type: TRANSFER_INVALID,
    payload: response
});
export const transferFailed = (error_msg) => ({
    type: TRANSFER_FAILED,
    payload: error_msg
});


export const receiverSavedLoading = () => ({
    type: RECEIVER_SAVED_LOADING
});
export const receiverSavedSuccess = (response) => ({
    type: RECEIVER_SAVED_SUCCESS,
    payload: response
});
export const receiverSavedFailed = (error_msg) => ({
    type: RECEIVER_SAVED_FAILED,
    payload: error_msg
});