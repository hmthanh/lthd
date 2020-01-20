import { REGISTER_LOADING, REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_DEAULFT } from './actionType'

export const Register = (state =  { isLoading: false,
    errMess: null,
    data:[]}, action) => {
    switch (action.type) {
        case REGISTER_LOADING:
            return {isLoading: true, errMess: null, data: []};
        case REGISTER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, data: []};
        case REGISTER_SUCCESS:
            return {...state, isLoading: false, errMess: null, next: 0,data: {...action.payload}}
        case REGISTER_DEAULFT:
          return {...state, isLoading: false, errMess: null, next: 0,data: []}
        default:
            return state;
    }
}