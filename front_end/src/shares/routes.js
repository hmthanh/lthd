import React, {lazy} from 'react';

const ListAccountPage = lazy(() => import('../pages/ListAccountPage'));
const LoginPage = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const UserInfo = lazy(() => import('../pages/UserInfo/UserInfo'));
const HistoryPage = lazy(() => import('../pages/HistoryUserTrans/HistoryUserTrans'));
const Transfer = lazy(() => import('../pages/Transfer/Transfer'));
const DebtPage = lazy(() => import('../pages/Dept/Debt'));
const ChangePassword = lazy(() => import('../pages/ChangePassword/ChangePassword'));
const ForgetPassword = lazy(() => import('../pages/ForgetPassword/ForgetPassword'));
const CreateAccount = lazy(() => import('../pages/CreateAccount/CreateAccount'));
const SettingPage = lazy(() => import('../pages/SettingRecieverPage'));
const RemindPage = lazy(() => import('../pages/Remind/Remind'));
const LogoutPage = lazy(() => import('../pages/logoutPage'));
const Recharge = lazy(() => import('../pages/Recharge/Recharge'));
const HistoryTrans = lazy(() => import('../pages/HistoryTrans/HistoryTrans'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));


const routes = [
  {
    path: "/login",
    exact: true,
    component: () => <LoginPage></LoginPage>
  },
  {
    path: "/register",
    exact: true,
    component: () => <Register></Register>
  },
  {
    path: "/info",
    exact: true,
    component: () => <UserInfo></UserInfo>
  },
  {
    path: "/user-trans-history",
    exact: true,
    component: () => <HistoryPage></HistoryPage>
  },
  {
    path: "/manage-debt",
    exact: true,
    component: () => <DebtPage></DebtPage>
  },
  {
    path: "/change-password",
    exact: true,
    component: () => <ChangePassword></ChangePassword>
  },
  {
    path: "/list-account",
    exact: true,
    component: () => <ListAccountPage></ListAccountPage>
  },
  {
    path: "/forget-password",
    exact: true,
    component: () => <ForgetPassword></ForgetPassword>
  },
  {
    path: "/list-receiver",
    exact: true,
    component: () => <SettingPage></SettingPage>
  },
  {
    path: "/transfer",
    exact: true,
    component: () => <Transfer></Transfer>
  },
  {
    path: "/create-account",
    exact: true,
    component: () => <CreateAccount></CreateAccount>
  },
  {
    path: "/recharge",
    exact: true,
    component: () => <Recharge></Recharge>
  },
  {
    path: "/history-account",
    exact: true,
    component: () => <HistoryTrans></HistoryTrans>
  },
  {
    path: "/remind",
    exact: true,
    component: () => <RemindPage></RemindPage>
  },
  {
    path: "/logout",
    exact: true,
    component: () => <LogoutPage></LogoutPage>
  },
  {
    path: "*",
    component: () => <NotFoundPage></NotFoundPage>
  }
];

export default routes;

export const EmployeeLink = [
  {
    title: "Tạo tài khoản",
    path: "/create-account",
  },
  {
    title: "Nạp tiền",
    path: "/recharge",
  },
  {
    title: "Lịch sử giao dịch",
    path: "/history-account",
  },
];

export const CustomerLink = [
  {
    title: "Danh sách tài khoản",
    path: "/list-account",
  },
  {
    title: "Danh sách người nhận",
    path: "/list-receiver",
  },
  {
    title: "Chuyển khoản",
    path: "/transfer",
  },
  {
    title: "Quản lý nhắc nợ",
    path: "/manage-debt",
  }
];

export const AdminLink = [
  {
    title: "Danh sách nhân viên",
    path: "/list-staff",
  },
  {
    title: "Danh sách giao dịch",
    path: "/list-transfer",
  }
];