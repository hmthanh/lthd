import {AUTH_ADMIN, AUTH_CUSTOMER, AUTH_EMPLOYEE, AUTH_FAILED} from '../actionType'


export const AuthFailed = () => ({
  type: AUTH_FAILED
});

export const AuthCustomer = () => ({
  type: AUTH_CUSTOMER
});

export const AuthEmployee = () => ({
  type: AUTH_EMPLOYEE
});

export const AuthAdmin = () => ({
  type: AUTH_ADMIN
});

export const DispatchRole = (role, dispatch) => {
  if (role === 3) {
    dispatch(AuthCustomer());
  } else if (role === 2) {
    dispatch(AuthEmployee());
  } else if (role === 1) {
    dispatch(AuthAdmin());
  } else {
    dispatch(AuthFailed());
  }
};