import React, {Component} from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import Main from './pages/MainPage'
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore'

const store = ConfigureStore();

class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Main/>
          </BrowserRouter>
        </Provider>
    )
  }
}

export default App;
