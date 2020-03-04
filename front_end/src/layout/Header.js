import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap'
import { Link } from 'react-router-dom'
import { logout, relogin } from '../redux/creators/loginCreator';
import AdministratorNav from '../components/Nav/AdministratorNav';
import CustomerNav from '../components/Nav/CustomerNav';
import EmployeeNav from '../components/Nav/EmployeeNav';

const InfoUser = ({authenticated, permistion}) => {

  console.log('InfoUser render Header', authenticated, permistion)

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen)

  if (!authenticated) {
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
    if (permistion === '3') {
      return (
        <div>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <CustomerNav logout={logout}></CustomerNav>
          </Collapse>
        </div>
      )
    } else if (permistion === '2') {
      return (
        <div>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <EmployeeNav logout={logout}></EmployeeNav>
        </div>
      )
    } else {
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
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      isOpen: false
    };
    // }
  }

  logout() {
    localStorage.clear()
    this.props.logout()
    // this.props.history.push("/")
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(props) {
    
    console.log('componentWillReceiveProps Header', props.Login)
  }

  render() {
    const uid = localStorage.getItem('uid')
    const role = localStorage.getItem('role')
    const isAuthen = !uid
    console.log('render Header', uid, role, isAuthen)
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="text-info">New ViMo</NavbarBrand>
          <InfoUser authenticated={!isAuthen} permistion={role}
            logout={this.logout}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
