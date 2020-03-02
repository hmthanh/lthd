import {REMIND_FAILED, REMIND_LOADING, REMIND_SUCCESS} from './actionType'

export const GetRemindInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case REMIND_FAILED:
            return {isLoading: true, errMess: null, data: []};
        case REMIND_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case REMIND_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};