import { DEBT_SUCCESS, DEBT_LOADING, DEBT_FAILED } from './actionType'

export const GetDebtInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case DEBT_FAILED:
            return { isLoading: true, errMess: null, data: [] };
        case DEBT_LOADING:
            return {...state, isLoading: false, errMess: action.payload, data: [] };
        case DEBT_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload } }
        default:
            return state;
    }
}