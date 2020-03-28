import {RECHARGE_FAILED, RECHARGE_LOADING, RECHARGE_SUCCESS} from './actionType'

const initialState = {
  isLoading: false,
  messageId: 0,
  data: []
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case RECHARGE_LOADING:
      return {isLoading: true, messageId: 0, data: []};
    case RECHARGE_FAILED:
      return {...state, isLoading: false, messageId: 1, data: []};
    case RECHARGE_SUCCESS:
      return {...state, isLoading: false, messageId: 2, data: payload};
    default:
      return state;
  }
};