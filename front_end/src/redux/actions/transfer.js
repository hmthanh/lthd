import {
    INTERBANK_ASSOCIATE_FAILED,
    INTERBANK_ASSOCIATE_LOADING,
    INTERBANK_ASSOCIATE_SUCCESS,
    TRANSFER_FAILED,
    TRANSFER_INVALID,
    TRANSFER_LOADING,
    TRANSFER_SUCCESS
} from './actionType'

export const TransferInfo = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case TRANSFER_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case TRANSFER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case TRANSFER_INVALID:
            return {...state, isLoading: false, errMess: null, data: {...action.payload}};
        case TRANSFER_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};

export const InterbankAssociate = (state = {
    isLoading: true,
    errMess: null,
    data: []
}, action) => {
    switch (action.type) {
        case INTERBANK_ASSOCIATE_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case INTERBANK_ASSOCIATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case INTERBANK_ASSOCIATE_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0, data: {...action.payload}};
        default:
            return state;
    }
};