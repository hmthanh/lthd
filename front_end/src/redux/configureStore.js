import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {LoginInfo} from './actions/login'
import {Register} from './actions/register'
import {ChangePassword} from './actions/changepassword'
import {GetBankingInfo} from './actions/getBankingInfo'
import {HistoryDebt, ReceiveHistory, TransHistory} from './actions/getHistory'
import {GetAllAccount} from './actions/getAllAccount'
import {GetDebtInfo} from './actions/getDebt'
import {GetInDebtInfo} from './actions/getInDebt'
import {GetAllCustomer} from './actions/getAllCustomer'
import {GetAllStaff} from './actions/getAllStaff'
import {ListTransferInfo} from './actions/getAllTransfer'
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
import {AccName} from "./actions/getAccName";


export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
        LoginInfo: LoginInfo,
        Register: Register,
        ChangePassword: ChangePassword,
        BankingInfo: GetBankingInfo,
        DebtInfo: GetDebtInfo,
        GetInDebtInfo: GetInDebtInfo,
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
        TransHistory: TransHistory,
            ReceiveHistory: ReceiveHistory,
        HistoryDept: HistoryDebt,
        HistoryTransfer: HistoryTransfer,
        CreateAccount: CreateAcc,
        Auth: Auth,
        ForgetPassword: ForgetPassword,
        AllCustomer: GetAllCustomer,
        StaffInfo: GetAllStaff,
        ListTransferInfo: ListTransferInfo,
        AccName: AccName
      }),
      applyMiddleware(logger),
      applyMiddleware(thunk),
  );

  return store;
};