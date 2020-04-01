**API Xem lịch sử giao dịch của 1 tài khoản khách hàng** \
url '/api/history' body `uid` à `user id`
ví dụ như hình dưới: \
![history](/pic_guide/his.png)

trong đó `state` cho biết trạng thái thành công hay thất bại,` = 0` thành công `!= 0 thất bại`, `type` cho biết loại giao dịch `1` tương ứng với chuyển tiền. `2` tương ứng là 2 nhận tiền, 3 thanh toán nhắc nợ

**API Xem lịch sử giao dịch Giao dịch thanh toán nhắc nợ** \
ví dụ như hình dưới: \
url '/api/remind' body `id` là `user id`

![dept](/pic_guide/remind.png)


**API /api/recharge thay đổi như sau**
trong body cần truyền những tham số như sau

``` javascript
{
	"uid": 1,
	"account_num": "0725922171392",
	"money": 400000
} 
```
Trong đó `uid` là `id` của user thực hiện nạp tiền. tức user đăng nhập với `role` employee \
`account_num`, `money` như cũ
![recharge](/pic_guide/recharge.png)

**API để lấy lịch sử tất cả giao dịch như sau**
`api/employee/hist` với body `type`
type cho biết loại giao dịch cần lấy history type = 1 nhận tiền, 2 nhận tiền, 3 thanh toán nhắc nợ

![recharge](/pic_guide/employee.hist.png)
**API để lấy lịch sử giao dịch của một account như sau**

`api/employee/hist/:account`
với `:account` là account muốn lấy thông tin, body `type` type cho biết loại giao dịch cần lấy history type = 1 nhận tiền, 2 nhận tiền, 3 thanh toán nhắc nợ

![account](/pic_guide/hist.0725922171392.png)