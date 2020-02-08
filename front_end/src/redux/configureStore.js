import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { Login } from './actions/login'
import { Register } from './actions/register'
import { ChangePassword } from './actions/changepassword'
import { GetBankingInfo } from './actions/getBankingInfo'
import { GetHistoryInfo } from './actions/getHistory'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Login: Login,
            Register: Register,
            ChangePassword: ChangePassword,
            BankingInfo: GetBankingInfo,
            HistoryInfo: GetHistoryInfo
        }),
        applyMiddleware(logger),
        applyMiddleware(thunk),
    );

    return store;
}