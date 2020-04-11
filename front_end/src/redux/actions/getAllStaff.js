import {ALL_STAFF_FAILED, ALL_STAFF_LOADING, ALL_STAFF_SUCCESS} from './actionType'

export const GetAllStaff = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case ALL_STAFF_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case ALL_STAFF_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case ALL_STAFF_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        default:
            return state;
    }
};