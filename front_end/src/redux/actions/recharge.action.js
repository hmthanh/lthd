import {
    RECHARGE_FAILED,
    RECHARGE_LOADING,
    RECHARGE_SUCCESS
} from './actionType'

export const RechargeInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case RECHARGE_LOADING:
            return {isLoading: true, errorCode: 0, errMess: null, data: []};
        case RECHARGE_FAILED:
            return {...state, isLoading: false, errorCode: -1, errMess: action.payload, data: []};
        case RECHARGE_SUCCESS:
            return {...state, isLoading: false, errorCode: 1, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};