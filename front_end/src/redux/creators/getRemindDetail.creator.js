import { REMIND_DETAIL_SUCCESS, REMIND_DETAIL_LOADING, REMIND_DETAIL_FAILED } from '../actionType'

export const GetRemindDetailCreator = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case REMIND_DETAIL_FAILED:
            return {isLoading: true, errMess: null, data: []};
        case REMIND_DETAIL_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case REMIND_DETAIL_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};