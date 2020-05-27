import {CREATE_DEBT_FAILED, CREATE_DEBT_LOADING, CREATE_DEBT_SUCCESS, DEBT_FAILED, DEBT_LOADING, DEBT_SUCCESS} from '../actionType'

export const GetDebtInfo = (state = {
    isLoading: false,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case DEBT_FAILED:
            return {isLoading: true, errMess: null, data: []};
        case DEBT_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case DEBT_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        default:
            return state;
    }
};

export const CreateDebt = (state = {
    isLoading: false,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case CREATE_DEBT_FAILED:
            return {isLoading: true, errMess: null, data: []};
        case CREATE_DEBT_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case CREATE_DEBT_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        default:
            return state;
    }
};