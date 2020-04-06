import React, {Component, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container, Spinner} from 'reactstrap'
import Header from '../layout/Header'
import Websocket from 'react-websocket'
import routes from '../shares/routes';

// lazy loading example
// const AlertPage = React.lazy(() => import('pages/AlertPage'));
// const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
// const BadgePage = React.lazy(() => import('pages/BadgePage'));
//


class Main extends Component {
  handleOpen() {
    console.log('connected:)')
  }

  handleClose() {
    console.log('disconnected:(')
  }

  handleData(data) {
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
                      // Render more <Route>s with the same paths as
                      // above, but different components this time.
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

// const mapDispatchToProps = dispatch => ({
//   authFailed: () => dispatch((AuthFailed())),
// });
//
// const mapStateToProps = (state) => {
//   return {
//     Auth: state.Auth,
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Main)
export default Main;