import {AUTH_ADMIN, AUTH_CUSTOMER, AUTH_EMPLOYEE, AUTH_FAILED} from "../actionType";

export const AuthCreator = (state = {
  isAuth: false,
  role: 0,
  data: [],
}, action) => {
  let {type, payload} = action;
  switch (type) {
    case AUTH_FAILED:
      return {...state, isAuth: false, role: 0, data: {...payload}};
    case AUTH_ADMIN:
      return {...state, isAuth: true, role: 1, data: {...payload}};
    case AUTH_EMPLOYEE:
      return {...state, isAuth: true, role: 2, data: {...payload}};
    case AUTH_CUSTOMER:
      return {...state, isAuth: true, role: 3, data: {...payload}};
    default:
      return state;
  }
};