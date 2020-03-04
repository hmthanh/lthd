import React, { Component, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container, Spinner } from 'reactstrap'
import Header from '../layout/Header'
import Websocket from 'react-websocket'
import { connect } from 'react-redux'
import { logout, relogin } from '../redux/creators/loginCreator'

const ListAccountPage = lazy(() => import('./ListAccountPage'))
const LoginPage = lazy(() => import('./Login'))
const Register = lazy(() => import('./Register'))
const UserInfo = lazy(() => import('./UserInfo'))
const HistoryPage = lazy(() => import('./HistoryPage'))
const Transfer = lazy(() => import('./Transfer/Transfer'))
const debtPage = lazy(() => import('./Debt'))
const ChangePassword = lazy(() => import('./ChangePassword'))
const ForgetPassword = lazy(() => import('./ForgetPassword'))
const SettingPage = lazy(() => import('./SettingRecieverPage'))
const remindPage = lazy(() => import('./Remind'))


// lazy loading example
// const AlertPage = React.lazy(() => import('pages/AlertPage'));
// const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
// const BadgePage = React.lazy(() => import('pages/BadgePage'));
//

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }



  logout() {
    localStorage.clear()
    this.props.logout()
    // this.props.history.push("/")
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
    let result = JSON.parse(data)
    console.log('=======Websocket handleData==========')
    console.log(result)
  }

  render() {
    return (
      <div>
        <Websocket url='ws://localhost:6500/api/notify'
          onMessage={this.handleData.bind(this)} onOpen={this.handleOpen.bind(this)} onClose={this.handleClose.bind(this)} />
        <Container className="themed-container">
          <Header relogin={this.props.relogin} logout={this.props.logout}/>
          <main className="main">
            <Suspense fallback={<div>
              <Spinner type="grow" color="primary" />
              <Spinner type="grow" color="secondary" />
              <Spinner type="grow" color="success" />
              <Spinner type="grow" color="danger" />
              <Spinner type="grow" color="warning" />
              <Spinner type="grow" color="info" />
              <Spinner type="grow" color="light" />
            </div>}>
              <Switch>
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/info' component={UserInfo} />
                <Route exact path='/transfer-history' component={HistoryPage} />
                <Route exact path='/manage-debt' component={debtPage} />
                <Route exact path='/change-password' component={ChangePassword} />
                <Route exact path='/list-account' component={ListAccountPage} />
                <Route exact path='/forget-password' component={ForgetPassword} />
                <Route exact path='/list-receiver' component={SettingPage} />
                <Route exact path='/transfer' component={Transfer} />
                <Route exact path='/remind' component={remindPage} />
              </Switch>
            </Suspense>
          </main>
        </Container>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  relogin: (uid) => dispatch(relogin(uid)),
  logout: () => dispatch(logout()),
});

const mapStateToProps = (state) => {
  return {
    Login: state.Login,
  }
};

// export default connect(mapStateToProps, mapDispatchToProps)(Main)

export default Main;