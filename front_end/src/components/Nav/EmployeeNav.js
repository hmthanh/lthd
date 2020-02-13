import React, { Component } from 'react'
import {
    Nav, NavItem, NavLink
} from 'reactstrap'

class CustomerNav extends Component {
    render() {
        return (
            <Nav>
                <NavItem>
                    <NavLink href="/create-account/">Tạo tài khoản</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/recharge/">Nạp tiền</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/history-account/">Lịch sử khách hàng</NavLink>
                </NavItem>
                <NavItem onClick={this.props.logout}>
                    <NavLink href="/logout">Đăng xuất</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default CustomerNav;