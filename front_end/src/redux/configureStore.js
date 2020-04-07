import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {LoginInfo} from './actions/login'
import {Register} from './actions/register'
import {ChangePassword} from './actions/changepassword'
import {GetBankingInfo} from './actions/getBankingInfo'
import {HistoryDebt, UserHistoryTrans} from './actions/getHistory'
import {GetAllAccount} from './actions/getAllAccount'
import {GetDebtInfo} from './actions/getDebt'
import {ReminscentAcction} from './actions/reminscentAcc'
import {GetAllReceiver} from './actions/getAllReceiver'
import {GetRemindInfo} from './actions/getRemind'
import {GetRemindDetail} from './actions/getRemindDetail'
import {AccountNum} from './actions/accountNum.action'
import {InterBank, ReceiverSaved, TransferInfo, VerifyResult} from './actions/transfer.action'
import RechargeInfo from "./actions/recharge.action";
import {HistoryTransfer} from "./actions/getHistoryTransfer.action";
import CreateAcc from "./actions/createAcc.action";
import {Auth} from "./actions/auth.action";
import {ForgetPassword} from "./actions/forgetPwd.action";

export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
            LoginInfo: LoginInfo,
        Register: Register,
        ChangePassword: ChangePassword,
        BankingInfo: GetBankingInfo,
        HistoryInfo: UserHistoryTrans,
        DebtInfo: GetDebtInfo,
        AccountInfo: GetAllAccount,
        Reminscent: ReminscentAcction,
        ReceiverInfo: GetAllReceiver,
        RemindInfo: GetRemindInfo,
        RemindDetail: GetRemindDetail,
        InterBank: InterBank,
        TransferInfo: TransferInfo,
        ReceiverSaved: ReceiverSaved,
        VerifyResult: VerifyResult,
        AccountNum: AccountNum,
        RechargeInfo: RechargeInfo,
        HistoryTransfer: HistoryTransfer,
        HistoryDept: HistoryDebt,
        CreateAccount: CreateAcc,
        Auth:Auth,
        ForgetPassword: ForgetPassword,
      }),
      applyMiddleware(logger),
      applyMiddleware(thunk),
  );

  return store;
};