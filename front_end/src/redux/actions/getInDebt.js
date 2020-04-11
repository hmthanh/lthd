import {DEBT_FAILED, DEBT_LOADING, DEBT_SUCCESS} from './actionType'

export const GetInDebtInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case DEBT_FAILED:
            return {isLoading: true, errMess: null, data: []};
        case DEBT_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case DEBT_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};