import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { relogin, logout } from '../redux/creators/loginCreator';
import AdministratorNav from '../components/Nav/AdministratorNav';
import CustomerNav from '../components/Nav/CustomerNav';
import EmployeeNav from '../components/Nav/EmployeeNav';

const InfoUser = (props) => {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const permistion = 1

  if(!props.authenticated){
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
    if (permistion === 1) {
      return (
        <div>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <CustomerNav logout={logout}></CustomerNav>
          </Collapse >
        </div>
      )
    } else if (permistion === 2) {
      return (
        <div>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <EmployeeNav logout={logout}></EmployeeNav>
        </div>
      )
    }
    else {
      return (
        <div>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <AdministratorNav logout={logout}></AdministratorNav>
        </div>
      )
    }
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
    // this.props.logout()
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
