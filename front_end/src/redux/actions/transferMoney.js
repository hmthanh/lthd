import {TRANSFER_MONEY_FAILED, TRANSFER_MONEY_LOADING, TRANSFER_MONEY_SUCCESS} from './actionType'

export const TransferMoney = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case TRANSFER_MONEY_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case TRANSFER_MONEY_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case TRANSFER_MONEY_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};


