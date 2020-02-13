import { ALL_ACCOUNT_SUCCESS, ALL_ACCOUNT_FAILED, ALL_ACCOUNT_LOADING } from './actionType'

export const GetAllAccount = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case ALL_ACCOUNT_LOADING:
            return { isLoading: true, errMess: null, data: [] };
        case ALL_ACCOUNT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, data: [] };
        case ALL_ACCOUNT_SUCCESS:
            return { ...state, isLoading: false, errMess: null, next: 0, data: { ...action.payload } }
        default:
            return state;
    }
}