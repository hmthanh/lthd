import {TRANSFER_FAILED, TRANSFER_LOADING, TRANSFER_SUCCESS} from './actionType'

export const ListTransferInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case TRANSFER_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case TRANSFER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case TRANSFER_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        default:
            return state;
    }
};