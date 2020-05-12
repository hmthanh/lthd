import React, {lazy} from 'react';

// const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const Register = lazy(() => import('../pages/Register/Register'));
const UserInfo = lazy(() => import('../pages/UserInfo/UserInfo'));

const Transfer = lazy(() => import('../pages/Transfer/Transfer'));
const DebtPage = lazy(() => import('../pages/Dept/Debt'));
const InDebtPage = lazy(() => import('../pages/Dept/InDebt'));
const ChangePassword = lazy(() => import('../pages/ChangePassword/ChangePassword'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const CreateAccount = lazy(() => import('../pages/CreateAccount/CreateAccount'));
const SettingPage = lazy(() => import('../pages/SettingPage'));
const RemindPage = lazy(() => import('../pages/Remind/Remind'));
const LogoutPage = lazy(() => import('../pages/logoutPage'));
const RechargePage = lazy(() => import('../pages/RechargePage/RechargePage'));
const HistoryPage = lazy(() => import('../pages/HistoryUserTrans/HistoryUserTrans'));
const HistoryAccount = lazy(() => import('../pages/HistoryAccount/HistoryAccount'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ListAccountPage = lazy(() => import('../pages/ListAccountPage/ListAccountPage'));
const ListStaffPage = lazy(() => import("../pages/ListStaffPage/ListStaffPage"));
const ListCustomerPage = lazy(() => import("../pages/ListCustomerPage/ListCustomerPage"));
const ListTransferPage = lazy(() => import( "../pages/ListTransferPage/ListTransferPage"));


const routes = [
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
    path: "/in-debt",
    exact: true,
    component: () => <InDebtPage></InDebtPage>
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
    path: "/forgot-password",
    exact: true,
    component: () => <ForgotPassword></ForgotPassword>
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
    component: () => <RechargePage></RechargePage>
  },
  {
    path: "/history-account",
    exact: true,
    component: () => <HistoryAccount></HistoryAccount>
  },
  {
    path: "/remind",
    exact: true,
    component: () => <RemindPage></RemindPage>
  },
  {
    path: "/list-staff",
    exact: true,
    component: () => <ListStaffPage></ListStaffPage>
  },
  {
    path: "/list-customer",
    exact: true,
    component: () => <ListCustomerPage></ListCustomerPage>
  },
  {
    path: "/list-transfer",
    exact: true,
    component: () => <ListTransferPage></ListTransferPage>
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
  // {
  //   title: "Quản lý nhắc nợ",
  //   path: "/manage-debt",
  // }
];

export const CustomerItemLink = [
  {
    title: "Lịch sử giao dịch",
    path: "/user-trans-history",
  },
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
    title: "Tạo tài khoản",
    path: "/create-account",
  },
  {
    title: "Danh sách nhân viên",
    path: "/list-staff",
  },
  {
    title: "Danh sách khách hàng",
    path: "/list-customer",
  },
  {
    title: "Danh sách giao dịch",
    path: "/list-transfer",
  }
];