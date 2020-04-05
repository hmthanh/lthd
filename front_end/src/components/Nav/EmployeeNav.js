import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import {useDispatch} from "react-redux";
import {logout, relogin} from '../../redux/creators/loginCreator'

const CustomerNav = () => {
  const dispatch = useDispatch();

  return (
      <Nav>
        <NavItem>
          <NavLink href="/create-account/">Tạo tài khoản</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/recharge/">Nạp tiền</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/history-account/">Lịch sử khách hàng</NavLink>
        </NavItem>
        <NavItem onClick={logout}>
          <NavLink href="/logout">Đăng xuất</NavLink>
        </NavItem>
      </Nav>
  )
};

export default CustomerNav;