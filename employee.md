Home page : https://hackmd.io/@nndkhoa9/cnm-ibproj
# API phân hệ giao dịch viên
### 1. API nạp tiền vào một tài khoản bất kỳ 
* Url : `/api/recharge`
* Data :
```json
{
  "account_num": 0725174389964,
  "money": 30000000
}
```
* Menthod : `POST`
* Kết quả :
Thất bại
```json
{
  "msg": "failure",
  "errorCode": -201
}  
```
Thành công
```json
{
  "msg": "successfully",
  "errorCode": 0
}  
```
### 2. API lấy lich sử giao dịch nhận tiền
* Url : `/api/user-history-info/:userId`
* Data : {}
* Menthod : `POST`
* Kết quả :

Thất bại
```json
{
  "msg": "failure",
  "errorCode": -201
}  
```

Thành công
```json
{
  "receiverExchangeInfo": [
    {
      "date": "12/03/2010",
      "type": "Giao dịch tiền mặt",
      "userId": 234234234,
      "money": 212000000
    }
  ],
  "transferExchangeInfo": [
    {
      "date": "12/03/2010",
      "type": "Giao dịch tiền mặt",
      "userId": 234234234,
      "money": 212000000
    }
  ],
  "debtExchangeInfo": [
    {
      "date": "12/03/2010",
      "type": "Giao dịch tiền mặt",
      "userId": 234234234,
      "money": 212000000
    }
  ]
}
```