import {
  INTERBANK_ASSOCIATE_FAILED,
  INTERBANK_ASSOCIATE_LOADING,
  INTERBANK_ASSOCIATE_SUCCESS,
  RECEIVER_SAVED_FAILED,
  RECEIVER_SAVED_LOADING,
  RECEIVER_SAVED_SUCCESS,
  TRANSFER_FAILED,
  TRANSFER_INVALID,
  TRANSFER_LOADING,
  TRANSFER_SUCCESS,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_INVALID,
  VERIFY_OTP_LOADING,
  VERIFY_OTP_SUCCESS
} from '../actionType'

export const TransferCreator = (state = {
  isLoading: false,
  statusId: 0,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case TRANSFER_LOADING:
      return {isLoading: true, statusId: 0, errMess: action.payload, data: []};
    case TRANSFER_FAILED:
      return {...state, isLoading: false, statusId: 1, errMess: action.payload, data: []};
    case TRANSFER_INVALID:
      return {...state, isLoading: false, statusId: 2, data: {...action.payload}};
    case TRANSFER_SUCCESS:
      return {...state, isLoading: false, statusId: 3, data: {...action.payload}};
    default:
      return state;
  }
};

export const InterBank = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case INTERBANK_ASSOCIATE_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case INTERBANK_ASSOCIATE_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case INTERBANK_ASSOCIATE_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};

export const ReceiverSaved = (state = {
  isLoading: false,
  errMess: null,
  data: []
}, action) => {
  switch (action.type) {
    case RECEIVER_SAVED_LOADING:
      return {isLoading: true, errMess: null, data: []};
    case RECEIVER_SAVED_FAILED:
      return {...state, isLoading: false, errMess: action.payload, data: []};
    case RECEIVER_SAVED_SUCCESS:
      return {...state, isLoading: false, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};

export const VerifyResult = (state = {
  isLoading: false,
  errMess: null,
  statusId: 0,
  data: []
}, action) => {
  switch (action.type) {
    case VERIFY_OTP_LOADING:
      return {isLoading: true, statusId: 0, errMess: null, data: []};
    case VERIFY_OTP_FAILED:
      return {...state, isLoading: false, statusId: 1, errMess: action.payload, data: []};
    case VERIFY_OTP_INVALID:
      return {...state, isLoading: false, statusId: 2, errMess: null, data: {...action.payload}};
    case VERIFY_OTP_SUCCESS:
      return {...state, isLoading: false, statusId: 3, errMess: null, data: {...action.payload}};
    default:
      return state;
  }
};
