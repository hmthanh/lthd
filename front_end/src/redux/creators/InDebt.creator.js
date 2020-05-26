import {INDEBT_FAILED, INDEBT_LOADING, INDEBT_SUCCESS} from '../actionType'

export const InDebt = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case INDEBT_FAILED:
            return {isLoading: true, errMess: null, data: []};
        case INDEBT_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case INDEBT_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};