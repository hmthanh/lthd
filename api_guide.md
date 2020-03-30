**API Xem lịch sử giao dịch của 1 tài khoản khách hàng** \
url '/api/history' body `uid` à `user id`
ví dụ như hình dưới: \
![history](/pic_guide/his.png)

trong đó `state` cho biết trạng thái thành công hay thất bại,` = 0` thành công `!= 0 thất bại`, `type` cho biết loại giao dịch `1` tương ứng với chuyển tiền. `2` tương ứng là nhận tiền.

**API Xem lịch sử giao dịch Giao dịch thanh toán nhắc nợ** \
ví dụ như hình dưới: \
url '/api/remind' body `id` là `user id`

![dept](/pic_guide/remind.png)