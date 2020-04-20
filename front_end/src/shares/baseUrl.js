import LoginPage from "../pages/Login/Login";

export const UrlApi = 'http://localhost:5500';

export const epAccount = '/api/accounts/id';
export const getBankAssociate = UrlApi + '/api/associate';

export const BaseUrl = [
  {url: '/list-account', name: 'Danh sách tài khoản', comp: LoginPage},
  {url: '/list-receiver', name: 'Danh sách người nhận'},
  {url: '/transfer', name: 'Chuyển khoản'},
  {url: '/manage-debt', name: 'Quản lý nhắc nợ'},
  {url: '/in-debt', name: 'Danh sách nợ'},
  {url: '/setting', name: 'Cài đặt tài khoản'},
];