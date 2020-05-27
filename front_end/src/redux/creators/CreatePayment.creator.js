import {CREATE_PAYMENT_FAILED, CREATE_PAYMENT_LOADING, CREATE_PAYMENT_SUCCESS} from "../actionType";

const CreatePaymentCreator = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case CREATE_PAYMENT_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case CREATE_PAYMENT_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};

export default CreatePaymentCreator;