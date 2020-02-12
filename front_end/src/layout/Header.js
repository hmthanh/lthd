import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { relogin, logout } from '../redux/creators/loginCreator';

const InfoUser = (props) => {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)


  // if(!props.authenticated){
  if (false) {
    return (
      <div>
        <Button color="info" outline className="mr-2">
          <Link to="/login">Đăng nhập</Link>
        </Button>

        <Button color="success" outline className="mr-4">
          <Link to="/register">Đăng ký</Link>
        </Button>
      </div>
    )
  } else {
    return (
      <div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* Phân hệ khách hàng */}
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
              <NavLink href="/transfer/">Quản lý nhắc nợ</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/setting">Thông Tin Người Nhận</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Tài khoản
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={props.infoUser}>
                  <NavLink href="/info">Thông tin</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/history">Lịch sử giao dịch</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/history">Đổi mật khẩu</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/history">Quên mật khẩu</NavLink>
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>
            {/* Phân hệ giao dịch viên */}
            <NavItem>
              <NavLink href="/create-account/">Tạo tài khoản</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/recharge/">Nạp tiền</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/history-account/">Lịch sử khách hàng</NavLink>
            </NavItem>
            {/* Phân hệ quản trị viên */}
            <NavItem>
              <NavLink href="/list-staff/">Danh sách nhân viên</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/recharge/">Danh sách giao dịch</NavLink>
            </NavItem>
            {/* Chung */}
            <DropdownItem onClick={props.logout}>
              <NavLink href="/logout">Đăng xuất</NavLink>
            </DropdownItem>
          </Nav>
        </Collapse>
      </div>
    )
  }
}

class Header extends Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
      isOpen: false,
      authenticated: false
    }
    let uid = localStorage.getItem('uid')
    if (uid) {
      this.props.relogin(uid)
        .then(() => {
          if (this.props.Login.data.authenticated) {
            this.setState({ authenticated: true })
          }
        })
    }
  }

  logout() {
    localStorage.clear()
    this.props.logout()
    // this.props.history.push("/")
  }

  componentWillReceiveProps(props) {
    if (props.Login.data.authenticated) {
      this.setState({ authenticated: true })
    } else {
      this.setState({ authenticated: false })
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="text-info">New ViMo</NavbarBrand>
          <InfoUser authenticated={this.state.authenticated} user={this.props.Login.data.user} logout={this.logout}
            infoUser={this.infoUser} />
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  relogin: (uid) => dispatch(relogin(uid)),
  logout: (uid) => dispatch(logout()),
});

const mapStateToProps = (state) => {
  return {
    Login: state.Login,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
