import {HISTORY_FAILED, HISTORY_LOADING, HISTORY_SUCCESS} from '../actions/actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllHistory = (id) => (dispatch) => {
    dispatch(loadingHistory());
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