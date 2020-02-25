import {BANKING_INFO_FAILED, BANKING_INFO_LOADING, BANKING_INFO_SUCCESS} from './actionType'

export const GetBankingInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case BANKING_INFO_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case BANKING_INFO_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case BANKING_INFO_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};