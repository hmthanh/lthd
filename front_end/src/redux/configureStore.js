import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'    

import {Login} from './actions/login'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Login: Login
        }),
        applyMiddleware(thunk),
    );

    return store;
}