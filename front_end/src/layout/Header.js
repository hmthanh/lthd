import React, {Component, useEffect} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Button, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'
import {Link} from 'react-router-dom'
import AdministratorNav from '../components/Nav/AdministratorNav'
import CustomerNav from '../components/Nav/CustomerNav'
import EmployeeNav from '../components/Nav/EmployeeNav'
import {getAllRemind} from '../redux/creators/remindCreator'
import useToggle from "../utils/useToggle";
import {fetchFrom} from "../utils/fetchHelper";
import {UrlApi} from "../shares/baseUrl";
import {AuthAdmin, AuthCustomer, AuthEmployee, AuthFailed} from "../redux/creators/authCreator";
import history from "../utils/history";

const GetAccessTokenWorker = (uid, refresh) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {id: uid, refreshToken: refresh};
      const response = await fetchFrom(UrlApi + '/api/refresh', 'POST', data);
      console.log('=====================response', response)
      localStorage.setItem('accessToken', response.accessToken);
      resolve(response);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const InfoUser = () => {
  const dispatch = useDispatch();
  const navToggle = useToggle(false);
  const Auth = useSelector(state => {
    return state.Auth
  });
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const refreshToken = localStorage.getItem('refreshToken');
    const role = localStorage.getItem('role');

    if (!uid) {
      AuthFailed();
      history.push("/login");
    } else {
      if (role === '3') {
        dispatch(AuthCustomer());
      } else if (role === '2') {
        dispatch(AuthEmployee());
      } else if (role === '1') {
        dispatch(AuthAdmin());
      } else {
        dispatch(AuthFailed());
      }
      GetAccessTokenWorker(uid, refreshToken);
      setInterval(() => {
        GetAccessTokenWorker(uid, refreshToken)
      }, 1000 * 60 * 8)
    }
  }, [dispatch]);

  if (Auth.isAuth) {
    switch (Auth.role) {
      case 1:
        return (<>
          <NavbarToggler onClick={navToggle.toggle}></NavbarToggler>
          <AdministratorNav></AdministratorNav>
        </>);
      case 2:
        return (<>
          <NavbarToggler onClick={navToggle.toggle}></NavbarToggler>
          <EmployeeNav></EmployeeNav>
        </>);
      default:
        return (<>
          <NavbarToggler onClick={navToggle.toggle}></NavbarToggler>
          <CustomerNav></CustomerNav>
        </>);
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
  componentDidMount() {
    const uid = localStorage.getItem('uid');
    this.props.getAllRemind(uid)
  }

  render() {
    return (
        <Navbar color="light" light expand="md" style={{marginBottom: "15px"}}>
          <NavbarBrand href="/" className="text-info">New ViMo</NavbarBrand>
          <InfoUser/>
        </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // relogin: (uid) => dispatch(relogin(uid)),
  // logout: (uid) => dispatch(logout()),
  getAllRemind: (account_num) => dispatch(getAllRemind(account_num))
});

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    RemindInfo: state.RemindInfo,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
