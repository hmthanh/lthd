import {
    INDEBT_FAILED,
    INDEBT_LOADING,
    INDEBT_SUCCESS,

} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getInDebt = (id, accessToken) => (dispatch) => {
    dispatch(loadinginDebt());
    return fetchFrom(UrlApi + `/api/remind/`, 'POST', {id}, accessToken)
        .then(response => {
            dispatch(successinDebt(response));
        })
        .catch(err => {
            console.log(err);
            dispatch(failedinDebt(err));
        })
};




export const loadinginDebt = () => ({
    type: INDEBT_LOADING
});

export const successinDebt = (response) => ({
    type: INDEBT_SUCCESS,
    payload: response
});


export const failedinDebt = (error_msg) => ({
    type: INDEBT_FAILED,
    payload: error_msg
});


