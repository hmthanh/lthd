import {ALL_RECEIVER_FAILED, ALL_RECEIVER_LOADING, ALL_RECEIVER_SUCESS} from '../actionType'
import {fetchFrom} from '../../utils/fetchHelper'
import {UrlApi} from '../../shares/baseUrl'

export const getAllReceiver = (id) => (dispatch) => {
    dispatch(loadingAllReceiver());
    return fetchFrom(UrlApi + '/api/accounts/id', 'POST', {id})
        .then(response => {
            response = {
                val: [
                    {
                        id: 1,
                        number: 123123,
                        name: 'hmthanh',
                    },
                    {
                        id: 2,
                        number: 567567,
                        name: 'phanminhtam',
                    }
                ]
            };
            // console.log(response)
            dispatch(successAllReceiver(response));
        })
        .catch(err => {
            console.log(err);
            dispatch(failedAllReceiver(err));
        })
};

export const loadingAllReceiver = () => ({
    type: ALL_RECEIVER_LOADING
});

export const successAllReceiver = (response) => ({
    type: ALL_RECEIVER_SUCESS,
    payload: response
});


export const failedAllReceiver = (error_msg) => ({
    type: ALL_RECEIVER_FAILED,
    payload: error_msg
});