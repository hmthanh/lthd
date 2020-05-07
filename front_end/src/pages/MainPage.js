import React, {Component, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container, Spinner} from 'reactstrap'
import Header from '../layout/Header'
import Websocket from 'react-websocket'
import routes from '../shares/routes';

class Main extends Component {
  handleOpen() {
    console.log('connected:)')
  }

  handleClose() {
    console.log('disconnected:(')
  }

  handleData(data) {
    console.log('saassaasas');
    console.log(data);
    // let result = JSON.parse(data)
  }

  render() {
    return (
        <>
          <Websocket url='ws://localhost:6500'
                     onMessage={this.handleData.bind(this)} onOpen={this.handleOpen.bind(this)}
                     onClose={this.handleClose.bind(this)}/>
          <Container className="themed-container">
            <Header></Header>
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
        </>
    )
  }
}
export default Main;