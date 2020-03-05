import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import {
	Card, CardImg, Badge
} from 'reactstrap';

class CustomerNav extends Component {



	render() {
		return (
			<Nav className="mr-auto" navbar>
				<NavItem>
					<NavLink href="/list-account/">Danh sách tài khoản</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/list-receiver/">Danh sách người nhận</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/transfer/">Chuyển khoản</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/manage-debt/">Quản lý nhắc nợ</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/setting">Cài đặt tài khoản</NavLink>
				</NavItem>
				
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Tài khoản
                    </DropdownToggle>
					<DropdownMenu right>
						{/* onClick={this.props.infoUser} */}
						<DropdownItem>
							<NavLink href="/info">Thông tin</NavLink>
						</DropdownItem>
						<DropdownItem divider />
						<DropdownItem>
							<NavLink href="/transfer-history">Lịch sử giao dịch</NavLink>
						</DropdownItem>
						<DropdownItem>
							<NavLink href="/change-password">Đổi mật khẩu</NavLink>
						</DropdownItem>
						<DropdownItem>
							<NavLink href="/forgot-password">Quên mật khẩu</NavLink>
						</DropdownItem>

					</DropdownMenu>
				</UncontrolledDropdown>
				<NavItem onClick={this.props.logout}>
					<NavLink href="/logout">Đăng xuất</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/remind">
						<Card style={{ position: "relative" }}>
						<Badge style={{ position: "absolute", top: '0px', right: '0px', fontSize: '8px' }} color="secondary">{this.props.notifyCount}
						</Badge>
						<CardImg src="/image/notifi.png" style={{ width: '20px' }} />
						</Card>
					</NavLink>
				</NavItem>
			</Nav>
		)
	}
}

export default CustomerNav;

// const mapDispatchToProps = dispatch => ({
 
// });

// const mapStateToProps = (state) => {
//   return {
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CustomerNav)