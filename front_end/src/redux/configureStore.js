import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'    

import { Login } from './actions/login'
import { Register } from './actions/register'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Login: Login,
            Register: Register
        }),
        applyMiddleware(logger),
        applyMiddleware(thunk),
    );

    return store;
}