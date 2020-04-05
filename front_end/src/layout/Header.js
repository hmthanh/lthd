import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {Button, Collapse, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'
import {Link} from 'react-router-dom'
import {logout, relogin} from '../redux/creators/loginCreator'
import AdministratorNav from '../components/Nav/AdministratorNav'
import CustomerNav from '../components/Nav/CustomerNav'
import EmployeeNav from '../components/Nav/EmployeeNav'
import {getAllRemind} from '../redux/creators/remindCreator'
import useToggle from "../utils/useToggle";

const InfoUser = ({notifyCount}) => {
  // authenticated={!isAuthen}
  // permistion={role}
  function logout(){
    localStorage.clear();
    // this.props.logout()
    // this.props.history.push("/");
  }

  const uid = localStorage.getItem('uid');
  const role = localStorage.getItem('role');
  // console.log('InfoUser render Header', authenticated, permistion);



  const navToggle = useToggle(false);

  if (uid) {
    if (role === '3') {
      return (
          <>
            <NavbarToggler onClick={navToggle.toggle}></NavbarToggler>
            <Collapse isOpen={navToggle.active} navbar>
              <CustomerNav logout={logout} notifyCount={notifyCount}></CustomerNav>
            </Collapse>
          </>
      )
    } else if (role === '2') {
      return (
          <>
            <NavbarToggler onClick={navToggle.toggle}></NavbarToggler>
            <EmployeeNav logout={logout}></EmployeeNav>
          </>
      )
    } else {
      return (
          <>
            <NavbarToggler onClick={navToggle.toggle}></NavbarToggler>
            <AdministratorNav logout={logout}></AdministratorNav>
          </>
      )
    }
  } else {
    return (
        <>
          <Button color="info" outline className="mr-2">
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button color="info" outline className="mr-4">
            <Link to="/register">Đăng ký</Link>
          </Button>
        </>
    )
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid');
    this.props.getAllRemind(uid)
  }

  render() {
    return (
        <div style={{marginBottom:"15px"}}>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/" className="text-info">New ViMo</NavbarBrand>
            <InfoUser infoUser={this.infoUser} />
          </Navbar>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  relogin: (uid) => dispatch(relogin(uid)),
  logout: (uid) => dispatch(logout()),
  getAllRemind: (account_num) => dispatch(getAllRemind(account_num))
});

const mapStateToProps = (state) => {
  return {
    Login: state.Login,
    RemindInfo: state.RemindInfo,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
