import {TRANSFER_MONEY_FAILED, TRANSFER_MONEY_LOADING, TRANSFER_MONEY_SUCCESS} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const transferMoney = (id) => (dispatch) => {
    dispatch(transferMoneyLoading());
    return fetchFrom(UrlApi + '/api/accounts/id', 'POST', {id})
        .then(response => {
            response = {
                val: [
                    {
                        id: 1,
                        day: new Date(),
                        type: 'Nội bộ',
                        send: 'thanh',
                        recieve: 'tam',
                        money: 120000,
                        excess: 100000
                    },
                    {
                        id: 2,
                        day: new Date(),
                        type: 'ngoaij bang',
                        send: 'sdf',
                        recieve: 'tam',
                        money: 990000,
                        excess: 1200000
                    },
                    {id: 3, day: new Date(), type: 'Nội bộ', send: 'sdas', recieve: 'asf', money: 10000, excess: 300000}
                ]
            };
            // console.log(response)
            dispatch(transferMoneySuccess(response));
        })
        .catch(err => {
            console.log(err);
            dispatch(transferMoneySuccessFailed(err));
        })
};

export const transferMoneyLoading = () => ({
    type: TRANSFER_MONEY_LOADING
});

export const transferMoneySuccess = (response) => ({
    type: TRANSFER_MONEY_SUCCESS,
    payload: response
});


export const transferMoneySuccessFailed = (error_msg) => ({
    type: TRANSFER_MONEY_FAILED,
    payload: error_msg
});