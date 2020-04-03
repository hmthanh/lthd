import React, {Component, lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container, Spinner} from 'reactstrap'
import Header from '../layout/Header'
import Websocket from 'react-websocket'
// import {logout, relogin} from '../redux/creators/loginCreator'
import {fetchFrom} from '../utils/fetchHelper'
import {UrlApi} from '../shares/baseUrl'
import Recharge from "./Recharge/Recharge";
import HistoryTrans from "./HistoryTrans/HistoryTrans";
import CreateAccount from "./CreateAccount/CreateAccount";

const ListAccountPage = lazy(() => import('./ListAccountPage'));
const LoginPage = lazy(() => import('./Login/Login'));
const Register = lazy(() => import('./Register'));
const UserInfo = lazy(() => import('./UserInfo/UserInfo'));
const HistoryPage = lazy(() => import('./HistoryUserTrans/HistoryUserTrans'));
const Transfer = lazy(() => import('./Transfer/Transfer'));
const Transfer2 = lazy(() => import('./TransferPage'));
const debtPage = lazy(() => import('./Dept/Debt'));
const ChangePassword = lazy(() => import('./ChangePassword/ChangePassword'));
const ForgetPassword = lazy(() => import('./ForgetPassword/ForgetPassword'));
const SettingPage = lazy(() => import('./SettingRecieverPage'));
const remindPage = lazy(() => import('./Remind/Remind'));
const LogoutPage = lazy(() => import('./logoutPage'));


// lazy loading example
// const AlertPage = React.lazy(() => import('pages/AlertPage'));
// const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
// const BadgePage = React.lazy(() => import('pages/BadgePage'));
//

let GetAccessTokenWorker = (uid, refresh) => {
  return fetchFrom(UrlApi + '/api/refresh', 'POST', {id: uid, refreshToken: refresh})
      .then((res) => {
        console.log(res);
        localStorage.setItem('accessToken', res.accessToken)
      })
};

class Main extends Component {
  constructor(props) {
    super(props);
    const uid = localStorage.getItem('uid');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!uid) {
      // this.props.history.push("/login");
    } else {
      GetAccessTokenWorker(uid, refreshToken);
      setInterval(() => {
        GetAccessTokenWorker(uid, refreshToken)
      }, 1000 * 60 * 8)
    }
  }

  componentWillReceiveProps(props) {
    console.log('componentWillReceiveProps Main', props.Login)
  }

  componentDidMount() {
    console.log('componentDidMount Main', this.props)
  }

  handleOpen() {
    // alert("connected:)");
    console.log('connected:)')
  }

  handleClose() {
    // alert("disconnected:(");
    console.log('disconnected:(')
  }

  handleData(data) {
    // let result = JSON.parse(data)
  }

  render() {
    return (
        <div>
          <Websocket url='ws://localhost:6500'
                     onMessage={this.handleData.bind(this)} onOpen={this.handleOpen.bind(this)}
                     onClose={this.handleClose.bind(this)}/>
          <Container className="themed-container">
            <Header relogin={this.props.relogin} logout={this.props.logout}/>
            <main className="main">
              <Suspense fallback={<div>
                <Spinner type="grow" color="primary"/>
                <Spinner type="grow" color="secondary"/>
                <Spinner type="grow" color="success"/>
                <Spinner type="grow" color="danger"/>
                <Spinner type="grow" color="warning"/>
                <Spinner type="grow" color="info"/>
                <Spinner type="grow" color="light"/>
              </div>}>
                <Switch>
                  <Route exact path='/login' component={LoginPage}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/info' component={UserInfo}/>
                  <Route exact path='/user-trans-history' component={HistoryPage}/>
                  <Route exact path='/manage-debt' component={debtPage}/>
                  <Route exact path='/change-password' component={ChangePassword}/>
                  <Route exact path='/list-account' component={ListAccountPage}/>
                  <Route exact path='/forget-password' component={ForgetPassword}/>
                  <Route exact path='/list-receiver' component={SettingPage}/>
                  <Route exact path='/transfer' component={Transfer}/>
                  <Route exact path='/transfer2' component={Transfer2}/>
                  <Route exact path='/create-account' component={CreateAccount}/>
                  <Route exact path='/recharge' component={Recharge}/>
                  <Route exact path='/history-account' component={HistoryTrans}/>
                  <Route exact path='/remind' component={remindPage}/>
                  <Route exact path='/logout' component={LogoutPage}/>
                </Switch>
              </Suspense>
            </main>
          </Container>
        </div>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   relogin: (uid) => dispatch(relogin(uid)),
//   logout: () => dispatch(logout()),
// });
//
// const mapStateToProps = (state) => {
//   return {
//     Login: state.Login,
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Main)

export default Main;