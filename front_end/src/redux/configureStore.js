import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {Login} from './actions/login'
import {Register} from './actions/register'
import {ChangePassword} from './actions/changepassword'
import {GetBankingInfo} from './actions/getBankingInfo'
import {GetHistoryInfo} from './actions/getHistory'
import {GetAllAccount} from './actions/getAllAccount'
import {GetDebtInfo} from './actions/getDebt'
import {ReminscentAcction} from './actions/reminscentAcc'
import {GetAllReceiver} from './actions/getAllReceiver'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Login: Login,
            Register: Register,
            ChangePassword: ChangePassword,
            BankingInfo: GetBankingInfo,
            HistoryInfo: GetHistoryInfo,
            DebtInfo: GetDebtInfo,
            AccountInfo: GetAllAccount,
            Reminscent: ReminscentAcction,
            ReceiverInfo: GetAllReceiver
        }),
        applyMiddleware(logger),
        applyMiddleware(thunk),
    );

    return store;
};