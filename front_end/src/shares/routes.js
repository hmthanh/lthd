import React, {lazy} from 'react';

// const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
// All account page
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const Register = lazy(() => import('../pages/Register/Register'));
const UserInfo = lazy(() => import('../pages/UserInfo/UserInfo'));
const LogoutPage = lazy(() => import('../pages/logoutPage'));
const ChangePassword = lazy(() => import('../pages/ChangePassword/ChangePassword'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));

// Customer
const ListAccountPage = lazy(() => import('../pages/ListAccountPage/ListAccountPage'));
const ListReceiver = lazy(() => import('../pages/AliasReceiver/AliasReceiver'));
const Transfer = lazy(() => import('../pages/Transfer/Transfer'));

const RemindPage = lazy(() => import('../pages/ListInDebtPage/RemindPage'));
const CreateDebt = lazy(() => import('../pages/ListDeptPage/CreateDebt'));
const DebtPage = lazy(() => import('../pages/ListDeptPage/DebtPage'));
const InDebtPage = lazy(() => import('../pages/ListInDebtPage/ListInDebt'));

const HistoryUserTrans = lazy(() => import('../pages/HistoryUserTrans/HistoryUserTrans'));
const CloseAccount = lazy(() => import('../pages/CloseAccount/CloseAccount'));

// Employee
const CreateAccount = lazy(() => import('../pages/CreateAccount/CreateAccount'));
const CreatePayment = lazy(() => import('../pages/CreatePayment/CreatePayment'));
const RechargePage = lazy(() => import('../pages/RechargePage/RechargePage'));

// Admin
const HistoryTrans = lazy(() => import('../pages/HistoryTrans/HistoryTrans'));
const ListEmployee = lazy(() => import("../pages/ListEmployee/ListEmployee"));

const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));


const routes = [
  // All account page
  {
    path: "/",
    exact: true,
    component: () => <UserInfo></UserInfo>
  },
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
    path: "/logout",
    exact: true,
    component: () => <LogoutPage></LogoutPage>
  },
  {
    path: "/info",
    exact: true,
    component: () => <UserInfo></UserInfo>
  },
  {
    path: "/change-password",
    exact: true,
    component: () => <ChangePassword></ChangePassword>
  },
  {
    path: "/forgot-password",
    exact: true,
    component: () => <ForgotPassword></ForgotPassword>
  },

  // user page
  {
    path: "/list-account",
    exact: true,
    component: () => <ListAccountPage></ListAccountPage>
  },
  {
    path: "/list-receiver",
    exact: true,
    component: () => <ListReceiver></ListReceiver>
  },
  {
    path: "/transfer",
    exact: true,
    component: () => <Transfer></Transfer>
  },
  {
    path: "/create-debt",
    exact: true,
    component: () => <CreateDebt></CreateDebt>
  },
  {
    path: "/debt",
    exact: true,
    component: () => <DebtPage></DebtPage>
  },
  {
    path: "/reminder",
    exact: true,
    component: () => <InDebtPage></InDebtPage>
  },
  {
    path: "/remind",
    exact: true,
    component: () => <RemindPage></RemindPage>
  },
  {
    path: "/user-history",
    exact: true,
    component: () => <HistoryUserTrans></HistoryUserTrans>
  },
  {
    path: "/close-account",
    exact: true,
    component: () => <CloseAccount></CloseAccount>
  },

  // Employee
  {
    path: "/create-account",
    exact: true,
    component: () => <CreateAccount></CreateAccount>
  },
  {
    path: "/create-payment",
    exact: true,
    component: () => <CreatePayment></CreatePayment>
  },
  {
    path: "/recharge",
    exact: true,
    component: () => <RechargePage></RechargePage>
  },

  // Admin
  {
    path: "/history-trans",
    exact: true,
    component: () => <HistoryTrans></HistoryTrans>
  },
  {
    path: "/list-employee",
    exact: true,
    component: () => <ListEmployee></ListEmployee>
  },
  {
    path: "*",
    component: () => <NotFoundPage></NotFoundPage>
  },
];
export default routes;

export const EmployeeLink = [
  {
    title: "Tạo tài khoản",
    path: "/create-account",
  },
  {
    title: "Tạo thanh toán",
    path: "/create-payment",
  },
  {
    title: "Nạp tiền",
    path: "/recharge",
  }
];

export const CustomerLink = [
  {
    title: "Danh sách người nhận",
    path: "/list-receiver",
  },
  {
    title: "Chuyển khoản",
    path: "/transfer",
  },
  {
    title: "Lịch sử giao dịch",
    path: "/user-history",
  },
];

export const CustomerItemLink = [

  {
    title: "Đổi mật khẩu",
    path: "/change-password",
  },
  {
    title: "Quên mật khẩu",
    path: "/forgot-password",
  }
];


export const AdminLink = [
  {
    title: "Quản lý nhân viên",
    path: "/list-employee",
  },
  {
    title: "Danh sách giao dịch",
    path: "/history-trans",
  }
];