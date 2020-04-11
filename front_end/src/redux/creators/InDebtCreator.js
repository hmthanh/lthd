import {
    DEBT_FAILED,
    DEBT_LOADING,
    DEBT_SUCCESS,
    NAME_DEBT_EDIT,
    NAME_DEBT_LOADING
} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getInDebt = (id, accessToken) => (dispatch) => {
    dispatch(loadingDebt());
    return fetchFrom(UrlApi + `/api/indebt/${id}`, 'POST', {id}, accessToken)
        .then(res => {
            // console.log(res);
            res = {
                val: [
                    {
                        id: 1,
                        account_num: 123123,
                        name: 'hmthanh',
                        debt_val: '999999',
                        note: 'note',
                        date_time: '22/2/2020'
                    },
                    {
                        id: 2,
                        account_num: 123123,
                        name: 'hmthanh',
                        debt_val: '999999',
                        note: 'note',
                        date_time: '22/2/2020'
                    }
                ]
            };
            dispatch(successDebt(res))
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

export const Loading = () => ({
    type: NAME_DEBT_LOADING
});

export const SuccessEdit = (response) => ({
    type: NAME_DEBT_EDIT,
    payload: response
});
