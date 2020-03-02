# flow chức năng chuyển tiền
1. api để lấy danh sách ngân hàng liên kết: `/api/associate` method `POST`. api respone về danh sách ngân hàng đã liên kết.
ví dụ như sau:
```javascript
{
    msg: 'successfully',
    errorCode: 0,
    item: [
        {name:'ngan hang a', partner_code: '0923'},
        {name:'ngan hang b', partner_code: '7261'}
    ]
} 
```

2. bước 1 trong quá trình chuyển tiền. Gọi api `/api/transfer` method `POST` yêu cầu `['x-access-token']` trong header với `data (body)` như sau:
```javascript
{
   partner_code: '2314', // để 0 nếu chuyển khoản nội bộ
   uid: '371', // id thực hiện chuyển khoản
   to_account: '2173891742', // số tài khoản thụ hưởng
   note: 'chuyển tiền abc',
   amount: 82148721, // số tiền
   cost_type: 0, // 0 người gửi trả phí, 1 người nhận trả phí

} 
```
api respone về như sau nếu số tiền trong tài khoản **không** đủ để thực hiện giao dịch:
```javascript
{
    msg: 'failure',
    errorCode: -201, // mã lỗi số tiền không đủ thực hiện giao dịch
} 
```

api respone về như sau nếu số tiền trong tài khoản đủ để thực hiện giao dịch:

```javascript
{
    msg: 'successfully',
    errorCode: 0, // mã lỗi số tiền không đủ thực hiện giao dịch
    transId: 2717 // mã transaction thực hiên giao dịch cần gửi đi trong bước 3(OTP)
} 
```

3. bước 2 verify OTP sau đó chuyển tiền - (Nếu không cài mailer thì mở console ở bước 2 sẽ thấy dòng OPT tranfer dể lấy OTP)

Gọi api `/api/transfer/:id` method `POST` yêu cầu `['x-access-token']` trong header với Id chính là `transId` đã có ở bước 2. `data (body)` như sau:
```javascript
{
    transId: 231,
    OTP: 231412434
} 
```
api respone về như sau nếu OTP không hợp lệ:
```javascript
{
    msg: 'failure, invalid OTP',
    errorCode: -202, // mã lỗi sOTP không hợp lệ
} 
```

api respone về như sau nếu thành công:
```javascript
{
    msg: 'successfully',
    errorCode: 0, // mã lỗi số tiền không đủ thực hiện giao dịch
    transId: 2717, // mã transaction thực hiên giao dịch cần gửi đi trong bước 3(OTP)
    to_account: '213214214', // số tài khoản thụ hưởng
    amount: 831882193 // số tiền giao dịch
} 
```
nếu thực hiện thành công chuyển về trang xem lịch sử giao dịch