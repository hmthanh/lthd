import React, { Component, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import Header from '../layout/Header'
import Register from './Register'
import { Spinner } from 'reactstrap'


// lazy loading example
// const AlertPage = React.lazy(() => import('pages/AlertPage'));
// const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
// const BadgePage = React.lazy(() => import('pages/BadgePage'));
//

const LoginPage =  lazy(() => import('./Login'))

class Main extends Component {
  render() {
    return (

      <Container className="themed-container">
        <Header />
        <main className="main">
        <Suspense fallback={<div>
          <Spinner type="grow" color="primary" />
          <Spinner type="grow" color="secondary" />
          <Spinner type="grow" color="success" />
          <Spinner type="grow" color="danger" />
          <Spinner type="grow" color="warning" />
          <Spinner type="grow" color="info" />
          <Spinner type="grow" color="light"/>
      </div>}>
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={Register} />
          </Switch>
          </Suspense>
        </main>

      </Container>
    )
  }
}

export default Main;