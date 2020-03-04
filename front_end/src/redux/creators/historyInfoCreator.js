import {HISTORY_FAILED, HISTORY_LOADING, HISTORY_SUCCESS} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllHistory = (id) => (dispatch) => {
    dispatch(loadingHistory());
    return fetchFrom(UrlApi + '/api/history', 'POST', {uid: id})
        .then(response => {
            console.log(response)
            dispatch(successHistory(response));
        })
        .catch(err => {
            console.log(err);
            dispatch(failedHistory(err));
        })
};

export const loadingHistory = () => ({
    type: HISTORY_LOADING
});

export const successHistory = (response) => ({
    type: HISTORY_SUCCESS,
    payload: response
});


export const failedHistory = (error_msg) => ({
    type: HISTORY_FAILED,
    payload: error_msg
});