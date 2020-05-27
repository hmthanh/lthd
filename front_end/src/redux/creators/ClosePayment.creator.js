import {CLOSE_PAYMENT_FAILED, CLOSE_PAYMENT_LOADING, CLOSE_PAYMENT_SUCCESS} from "../actionType";

const ClosePaymentCreator = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case CLOSE_PAYMENT_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case CLOSE_PAYMENT_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case CLOSE_PAYMENT_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};

export default ClosePaymentCreator;