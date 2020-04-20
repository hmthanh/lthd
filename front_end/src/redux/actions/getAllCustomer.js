import {ALL_CUSTOMER_FAILED, ALL_CUSTOMER_LOADING, ALL_CUSTOMER_SUCCESS} from './actionType'

export const GetAllCustomer = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case ALL_CUSTOMER_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case ALL_CUSTOMER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case ALL_CUSTOMER_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        default:
            return state;
    }
};