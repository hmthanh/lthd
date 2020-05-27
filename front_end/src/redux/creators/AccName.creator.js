import {
    GET_ACC_NAME_FAILED,
    GET_ACC_NAME_LOADING,
    GET_ACC_NAME_SUCCESS
} from '../actionType'

export const AccName = (state = {
    isLoading: false,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case GET_ACC_NAME_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case GET_ACC_NAME_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case GET_ACC_NAME_SUCCESS:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        default:
            return state;
    }
};