import {ALL_USER_FAILED, ALL_USER_LOADING, ALL_USER_SUCCESS} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllUser = () => (dispatch) => {
    dispatch(loadingAllUser());
    return fetchFrom(UrlApi + `/api/listuser/all`, 'POST')
        .then(res => {
        
            dispatch(successAllUser(res));
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            dispatch(failedAllUser(err));
        })
};


export const loadingAllUser = () => ({
    type: ALL_USER_LOADING
});


export const successAllUser = (response) => ({
    type: ALL_USER_SUCCESS,
    payload: response
});


export const failedAllUser = (error_msg) => ({
    type: ALL_USER_FAILED,
    payload: error_msg
});