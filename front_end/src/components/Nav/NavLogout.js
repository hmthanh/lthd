import React from 'react';
import {NavItem, NavLink} from "reactstrap";
import {useDispatch} from "react-redux";
import {AuthFailed} from "../../redux/actions/auth.action";

const NavLogout = () => {
  const dispatch = useDispatch();

  function logout() {
    localStorage.clear();
    dispatch(AuthFailed());
  }

  return (
      <NavItem onClick={logout}>
        <NavLink href="/login">Đăng xuất</NavLink>
      </NavItem>);
};

export default NavLogout;