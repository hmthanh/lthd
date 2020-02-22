import {DEBT_FAILED, DEBT_LOADING, DEBT_SUCCESS} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllDebt = (id) => (dispatch) => {
    dispatch(loadingDebt());
    return fetchFrom(UrlApi + '/api/accounts/id', 'POST', {id})
        .then(response => {
            response = {
                val: [
                    {id: 1, day: new Date(), total: 120000, userdebt: 'thanh'},
                    {id: 2, day: new Date(), total: 120000, userdebt: 'sdf'},
                    {id: 3, day: new Date(), total: 120000, userdebt: 'sdas'}
                ]
            };
            // console.log(response)
            dispatch(successDebt(response));
        })
        .catch(err => {
            console.log(err);
            dispatch(failedDebt(err));
        })
};

export const loadingDebt = () => ({
    type: DEBT_LOADING
});

export const successDebt = (response) => ({
    type: DEBT_SUCCESS,
    payload: response
});


export const failedDebt = (error_msg) => ({
    type: DEBT_FAILED,
    payload: error_msg
});