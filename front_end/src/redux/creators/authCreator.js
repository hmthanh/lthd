import {AUTH_ADMIN, AUTH_CUSTOMER, AUTH_EMPLOYEE, AUTH_FAILED} from '../actions/actionType'
import {useDispatch} from "react-redux";


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

export const AuthLogout = () => {
  localStorage.clear();
  const dispatch = useDispatch();
  dispatch(AuthFailed());
};

export const DispatchRole = (role, dispatch) => {
  if (role == 3){
    dispatch(AuthCustomer());
  }
  else if (role == 2){
    dispatch(AuthEmployee());
  }
  else if (role == 1){
    dispatch(AuthAdmin());
  }else{
    dispatch(AuthFailed());
  }
};