import React, {Component, lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container, Spinner} from 'reactstrap';
import Header from '../layout/Header'

const ListAccountPage = lazy(() => './ListAccountPage/ListAccountPage')
const LoginPage = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const UserInfo = lazy(() => import('./UserInfo'));
const HistoryPage = lazy(() => import('./HistoryPage'));
const Transfer = lazy(() => import('./Transfer/Transfer'));
const debtPage = lazy(() => import('./Debt'));
const ChangePassword = lazy(() => import('./ChangePassword'));
const ForgetPassword = lazy(() => import('./ForgetPassword'));
const SettingPage = lazy(() => import('./SettingRecieverPage'));

// lazy loading example
// const AlertPage = React.lazy(() => import('pages/AlertPage'));
// const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
// const BadgePage = React.lazy(() => import('pages/BadgePage'));
//

class Main extends Component {
    render() {
        return (
            <Container className="themed-container">
                <Header/>
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
                            <Route exact path='/transfer-history' component={HistoryPage}/>
                            <Route exact path='/manage-debt' component={debtPage}/>
                            <Route exact path='/change-password' component={ChangePassword}/>
                            <Route exact path='/list-account' component={ListAccountPage}/>
                            <Route exact path='/forget-password' component={ForgetPassword}/>
                            <Route exact path='/list-receiver' component={SettingPage}/>
                            <Route exact path='/transfer' component={Transfer}/>
                        </Switch>
                    </Suspense>
                </main>
            </Container>
        )
    }
}

export default Main;