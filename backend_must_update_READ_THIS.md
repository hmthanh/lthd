<h1>Những phần chưa làm</h1>

* Mỗi tài khoản cần tách ra tài khoản tiết kiệm và tài khoản thanh toán

* Chỉ có thể chuyển khoản liên ngân hàng được với ngân hàng đã liên kết.
Cần kiểm tra một lượt quá trình chuyển tiền liên ngân hàng

* http://localhost:3000/manage-debt/ này mới có danh sách mình nhắc nợ người khác chưa có danh sách mình nhắc nợ. đọc kỹ yêu cầu của thầy ở đâ

* Tạo notify 
Front_end sử lý event websocket khi bị nhắc nợ ở file Main
<Websocket url='ws://localhost:6500'
  onMessage={this.handleData.bind(this)} onOpen={this.handleOpen.bind(this)}
  onClose={this.handleClose.bind(this)}/>
  
* Cần sửa lại API back end của trang /info
Thông tin lấy ra còn thiếu số dư của tài khoản chính và tài khoản tiết kiệm

* Còn thiếu thông API reset mật khẩu và gửi về email

* Chưa làm trang danh sách nhân viên và trang danh sách giao dịch của nhân viên
