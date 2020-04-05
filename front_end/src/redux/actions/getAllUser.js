import {ALL_USER_FAILED, ALL_USER_LOADING, ALL_USER_SUCCESS} from './actionType'

export const GetAllUser = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case ALL_USER_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case ALL_USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case ALL_USER_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};