import {ALL_RECEIVER_FAILED, ALL_RECEIVER_LOADING, ALL_RECEIVER_SUCESS} from './actionType'

export const GetAllReceiver = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case ALL_RECEIVER_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case ALL_RECEIVER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case ALL_RECEIVER_SUCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};