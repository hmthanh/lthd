import React, {Component} from 'react'
import './App.css'
import {Router} from 'react-router-dom'
import Main from './pages/MainPage'
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore'
import history from './utils/history';

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <Router history={history}>
            <Main/>
          </Router>
        </Provider>
    )
  }
}

export default App;
