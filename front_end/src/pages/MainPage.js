import React, {Component, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container, Spinner} from 'reactstrap'
import Header from '../layout/Header'
import routes from '../shares/routes';
import Footer from "../components/Footer/Footer";
import Notification from "../components/Notification/Notification";

class Main extends Component {
  render() {
    return (
        <>
          <Header></Header>
          <Notification></Notification>
          <Container className="themed-container">
            <main className="main" style={{minHeight: "800px"}}>
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
                  {routes.map((route, index) => (
                      <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          children={<route.component/>}
                      />
                  ))}
                </Switch>
              </Suspense>
            </main>
          </Container>
          <Footer></Footer>
        </>
    )
  }
}

export default Main;