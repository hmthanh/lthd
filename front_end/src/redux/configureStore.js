import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {ActiveAccount, LoginInfo} from './actions/login'
import {Register} from './actions/register'
import {ChangePassword} from './actions/changepassword'
import {GetBankingInfo} from './actions/getBankingInfo'
import {HistoryDebt, ReceiveHistory, TransHistory} from './actions/getHistory'
import {GetAllAccount} from './actions/getAllAccount'
import {CreateDebt, GetDebtInfo} from './actions/getDebt'
import {GetInDebtInfo} from './actions/getInDebt'
import {GetAllCustomer} from './actions/getAllCustomer'
import {CreateStaff,GetAllStaff} from './actions/getAllStaff'
import {ListTransferInfo} from './actions/getAllTransfer'
import {ReminscentAcction} from './actions/reminscentAcc'
import {GetAllReceiver} from './actions/getAllReceiver'
import {GetNotify, GetRemindInfo} from './actions/getRemind'
import {GetRemindDetail} from './actions/getRemindDetail'
import {AccountNum} from './actions/accountNum.action'
import {InterBank, ReceiverSaved, TransferInfo, VerifyResult} from './actions/transfer.action'
import RechargeInfo from "./actions/recharge.action";
import {HistoryTransfer} from "./actions/getHistoryTransfer.action";
import CreateAcc from "./actions/createAcc.action";
import {Auth} from "./actions/auth.action";
import {ForgetPassword, VerifyForget} from "./actions/forgetPwd.action";
import {AccName} from "./actions/getAccName";
import CreatePayment from "./actions/createPayment.action";
import ClosePayment from "./actions/closePayment.action";


export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
        LoginInfo: LoginInfo,
        ActiveAccount: ActiveAccount,
        Register: Register,
        ChangePassword: ChangePassword,
        BankingInfo: GetBankingInfo,
        DebtInfo: GetDebtInfo,
        CreateDebt: CreateDebt,
        GetInDebtInfo: GetInDebtInfo,
        AccountInfo: GetAllAccount,
        Reminscent: ReminscentAcction,
        ReceiverInfo: GetAllReceiver,
        RemindInfo: GetRemindInfo,
        GetNotify: GetNotify,
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
        CreatePayment: CreatePayment,
        ClosePayment: ClosePayment,
        Auth: Auth,
        ForgetPassword: ForgetPassword,
        VerifyForget: VerifyForget,
        AllCustomer: GetAllCustomer,
        StaffInfo: GetAllStaff,
        CreateStaff: CreateStaff,
        ListTransferInfo: ListTransferInfo,
        AccName: AccName

      }),
      applyMiddleware(logger),
      applyMiddleware(thunk),
  );

  return store;
};