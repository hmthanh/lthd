import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {Button, Collapse, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'
import {Link} from 'react-router-dom'
import {logout, relogin} from '../redux/creators/loginCreator'
import AdministratorNav from '../components/Nav/AdministratorNav'
import CustomerNav from '../components/Nav/CustomerNav'
import EmployeeNav from '../components/Nav/EmployeeNav'
import {getAllRemind} from '../redux/creators/remindCreator'

const InfoUser = ({authenticated, permistion, notifyCount}) => {

  console.log('InfoUser render Header', authenticated, permistion);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
            <CustomerNav logout={logout} notifyCount={notifyCount}></CustomerNav>
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
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      isOpen: false
    };
  }

  logout() {
    localStorage.clear();
    this.props.logout()
    // this.props.history.push("/")
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid');
    this.props.getAllRemind(uid)
  }

  componentWillReceiveProps(props) {

    console.log('componentWillReceiveProps Header', props.Login)
  }

  render() {
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const isAuthen = !uid;
    console.log('render Header', uid, role, isAuthen);
    return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/" className="text-info">New ViMo</NavbarBrand>
            <InfoUser authenticated={!isAuthen} permistion={role}
                      logout={this.logout}
                      infoUser={this.infoUser} notifyCount={this.props.RemindInfo.data.num}/>
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
