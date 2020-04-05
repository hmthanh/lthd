import React from 'react'
import {
  Badge,
  Card,
  CardImg,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";


const CustomerNav = () => {
  const dispatch = useDispatch();
  const RemindInfo = useSelector(state => {
    return state.RemindInfo
  });

  function logout() {

  }

  return (
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/list-account/">Danh sách tài khoản</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/list-receiver/">Danh sách người nhận</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/transfer/">Chuyển khoản</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/manage-debt/">Quản lý nhắc nợ</NavLink>
        </NavItem>

        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Tài khoản
          </DropdownToggle>
          <DropdownMenu right>
            {/* onClick={this.props.infoUser} */}
            <DropdownItem>
              <NavLink href="/info">Thông tin</NavLink>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>
              <NavLink href="/user-trans-history">Lịch sử giao dịch</NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink href="/change-password">Đổi mật khẩu</NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink href="/forgot-password">Quên mật khẩu</NavLink>
            </DropdownItem>

          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem onClick={logout}>
          <NavLink href="/logout">Đăng xuất</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/remind">
            <Card style={{position: "relative"}}>
              <Badge style={{position: "absolute", top: '0px', right: '0px', fontSize: '8px'}}
                     color="secondary">{RemindInfo.data.num}
              </Badge>
              <CardImg src="/image/notifi.png" style={{width: '20px'}}/>
            </Card>
          </NavLink>
        </NavItem>
      </Nav>
  )
};

export default CustomerNav;