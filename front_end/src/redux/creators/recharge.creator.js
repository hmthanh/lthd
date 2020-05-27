import {RECHARGE_FAILED, RECHARGE_LOADING, RECHARGE_SUCCESS} from '../actionType'

export const RechargeCreator = (state = {
  isLoading: false,
  statusId: 0,
  data: []
}, action) => {
  const {type, payload} = action;
  switch (type) {
    case RECHARGE_LOADING:
      return {isLoading: true, statusId: 0, data: []};
    case RECHARGE_FAILED:
      return {...state, isLoading: false, statusId: 1, data: []};
    case RECHARGE_SUCCESS:
      return {...state, isLoading: false, statusId: 2, data: payload};
    default:
      return state;
  }
};