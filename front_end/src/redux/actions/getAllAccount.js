import {ALL_ACCOUNT_FAILED, ALL_ACCOUNT_LOADING, ALL_ACCOUNT_SUCCESS} from './actionType'

export const GetAllAccount = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case ALL_ACCOUNT_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case ALL_ACCOUNT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case ALL_ACCOUNT_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        default:
            return state;
    }
};