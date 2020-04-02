**Backend có 1 vài thay đổi + việc áp dụng mail OTP cũng như mail để xác nhận tài khoản**
1. có một số tool cần cài đặt để đáp ứng nhu cầu test như sau:
- Node mailer cài ở link sau `https://downloads.nodemailer.com/download/win32`
- vào file `api_getway/mailer/mail.controller.js` sửa config sau:
``` javascript
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  auth: {
    user: 'project.1',
    pass: 'secret.1'
  }
})
```
thành config trong app lúc tải về như hình sau:
- bước 1 tạo 1 tài khoản local

![hinh1](./pic_guide/mailer2.png)

lúc 1 tải về nhấn vào đấu (+) sau đó đặt tên. sau đó ở list dưới suất hiện tên tài khoản nhấn dup vào đó. copy chô bôi đen vào file như hình bên dưới.

![hinh2](./pic_guide/mailer1.png)

sau đó các email mà backend gửi sẽ nằm ở đây:

![hinh3](./pic_guide/mailer3.png)

dưới đây là phân mô tả update lại `api`

1.   api tạo tài khoản: `/api/accounts` api này để tạo tài khoản: các thông tin đều như cũ. chỉ khác username và password được gửi về email. lúc này trạng thái của tài khoản là `not acctive`. Để sử dụng `api` phải đăng nhập với `role <= 2`. tức quyền employee trở lên.


2.   api đăng nhập `/api/auth`. thay đổi cách trả về. 
-    chú ý lỗi chính tả trong request body sửa lại thành `username`
-    nếu sai username hoặc tài khoản không tồn tại trả về như sau:
``` javascript
{
  errcode: -200,
  msg: 'account not exits',
  authenticated: false,
}
```
-   nếu sai password trả về như sau:
``` javascript
{
  errcode: -201,
  msg: 'password incorrectly',
  authenticated: false,
}
```
- nếu tài khoản chưa acctive (case lần đầu tiên đăng nhập) trả về như sau:
- case này cần redirect về trang đổi mật khẩu. Sau khi đổi mật khẩu mới được sử dụng các tính năng khác.
``` javascript
{
  errcode: -202,
  msg: 'account not acctive',
  authenticated: false,
}
```

- nếu đúng username password và tài khoản acctive trả về như sau:
``` javascript
{
  errcode: 0,
  authenticated: true,
  user: {
    id: 1,
    phone: 84909256790,
    email: 'minhtam245@gmail.com',
    name: 'Phan Minh Tâm',
    date_of_birth: '2002-03-20T08:11:15.000Z',
    account_num: '07251743899648',
    user_name: 'phanminhtam1',
    role: 3,
    status: 1
  },
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4NTg0ODMxMywiZXhwIjoxNTg1OTA4MzEzfQ.-Yx9fHaj91H8ahONeYSC10dh2RmUZd8hNGuA1Nhy2cU',
  refreshToken: 'BNPg1vKEWblWLOKuznka5wZXaornIoyudDrA1GWBDliUXMGSdgtH9zKBCzcyYN9Fymh3sVoA2j3cxTrWBl8hCxQoz5JBstme0SSq'
}
```

3.    api `/api/accounts/id` trả về list các tài khoản:
![hinh3](./pic_guide/post_man.png)

***Front_End cần sửa lại những phần sau:***

1. `http://localhost:3000/setting` chưa có front_end `api` này dùng để Thiết lập danh sách người nhận.

2.  `http://localhost:3000/transfer-history` này mới `front_end` tĩnh
-   ![hình 4](/pic_guide/pic_his.png)

3.   fix lại `http://localhost:3000/info` front_end này show thông tin của user đăng nhập.

4. `http://localhost:3000/transfer/` cần check kĩ. backend phân biệt chuyển khoản nội bộ hay ở ngoài qua `parner_code` nế `parner_code = 0` chuyển khoản nội bộ.

5. `http://localhost:3000/manage-debt/` này mới có danh sách mình nhắc nợ người khác chưa có danh sách mình nhắc nợ. đọc kỹ yêu cầu của thầy ở đây `https://hackmd.io/@nndkhoa9/cnm-ibproj#15-Qu%E1%BA%A3n-l%C3%BD-nh%E1%BA%AFc-n%E1%BB%A3`

6. Front_end sử lý event `websocket` khi bị nhắc nợ ở file Main 
``` javascript
 <Websocket url='ws://localhost:6500'
  onMessage={this.handleData.bind(this)} onOpen={this.handleOpen.bind(this)}
  onClose={this.handleClose.bind(this)}/>
```
7. đựa vào `role` lúc login phân quyền trên `front_end`


***Back_End cần làm***

1.   hoàn thành api chuyển tiền.
2.   phân quyền cho các api
3.   tách các config với ngân hàng lưu vào db
4.   api trả về danh sách bị nhăc nợ