1. Phân hệ khách hàng customer
1.3 Thiết lập danh sách người nhận ---- đã làm. Thắm

1.5 Quản lý nhắc nợ ---- thắng full 1.5
1.5.1 Tạo nhắc nợ
	1.5.2 Xem danh sách nợ
	1.5.3 Huỷ nhắc nợ
	1.5.4 Thanh toán nhắc nợ
1.6 Xem lịch sử giao dịch của 1 tài khoản
1.8 Quên mật khẩu ----- Tâm đã làm 

2. Phân hệ giao dịch viên employee
	2.1 Tạo tài khoản khách hàng
	2.2 Nạp tiền vào 1 tài-khoản bất kỳ
	2.3 Xem lịch sử giao dịch của 1 tài khoản khách hàng

3. Cung cấp API để liên kết với ngân hàng khác -- Tâm

4. Phân hệ quản trị viên - administrator
5. Các yêu cầu khác
	5.1 Yêu cầu kỹ thuật
	5.2 Yêu cầu dữ liệu
	5.3 Yêu cầu quản lý mã nguồn

Lưu ý quan trọng Thắng, Thanh:
    khi thực hiện tất cả api không phải 'login, logout, register'. tất cả cả các api còn lại đều yêu cầu headers ['x-access-token']. nên tất cả các api sau này cần truyền thêm tham số accessToken cho hàm `fetchFrom`. api sẽ được sửa trong tối nay. 
    Cách để lấy accessToken và refres token từ react gọi 2 các hàm tương ứng sau để lấy:

```javascript
let accessToken = localStorage.setItem('accessToken');
```

```javascript
let refreshToken = localStorage.getItem('refreshToken');
```