import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {ActiveAccount, LoginCreator} from './creators/login.creator'
import {RegisterCreator} from './creators/register.creator'
import {ChangePwdCreator} from './creators/ChangePwd.creator'
import {BankingCreator} from './creators/Banking.creator'
import {CreateDebt, GetDebtInfo} from './creators/Debt.creator'
import {InDebt} from './creators/InDebt.creator'
import {EmployeeCreator} from './creators/Employee.creator'
import {AliasReceiverCreator} from './creators/AliasReceiver.creator'
import {GetNotify, GetRemindInfo} from './creators/getRemind.creator'
import {GetRemindDetailCreator} from './creators/getRemindDetail.creator'
import {InterBank, ReceiverSaved, TransferCreator, VerifyResult} from './creators/transfer.creator'
import {RechargeCreator} from "./creators/recharge.creator";
import {TransHistoryCreator, TransHistoryUser} from "./creators/transHistory.creator";
import {CreateAccCreator} from "./creators/CreateAcc.creator";
import {ForgetPassword, VerifyForget} from "./creators/ForgetPwd.creator";
import {AccName} from "./creators/AccName.creator";
import CreatePaymentCreator from "./creators/CreatePayment.creator";
import ClosePaymentCreator from "./creators/ClosePayment.creator";
import {AuthCreator} from "./creators/Auth.creator";
import {AllAccountCreator, PaymentAccountCreator} from "./creators/Account.creator";


export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
        Auth: AuthCreator,
        LoginInfo: LoginCreator,
        ActiveAccount: ActiveAccount,
        Register: RegisterCreator,
        ChangePassword: ChangePwdCreator,
        BankingInfo: BankingCreator,
        DebtInfo: GetDebtInfo,
        CreateDebt: CreateDebt,
        GetInDebtInfo: InDebt,
        AliasReceiver: AliasReceiverCreator,
            AccountInfo: AllAccountCreator,
            PaymentAcc: PaymentAccountCreator,
        RemindInfo: GetRemindInfo,
        GetNotify: GetNotify,
        RemindDetail: GetRemindDetailCreator,
        InterBank: InterBank,
        TransferInfo: TransferCreator,
        ReceiverSaved: ReceiverSaved,
        VerifyResult: VerifyResult,
        RechargeInfo: RechargeCreator,
        UserTransHistory: TransHistoryUser,
        HistoryTransfer: TransHistoryCreator,
        CreateAccount: CreateAccCreator,
        CreatePayment: CreatePaymentCreator,
        ClosePayment: ClosePaymentCreator,
        ForgetPassword: ForgetPassword,
        VerifyForget: VerifyForget,
        EmployeeStore: EmployeeCreator,
        AccName: AccName

      }),
      applyMiddleware(logger),
      applyMiddleware(thunk),
  );

  return store;
};