import React, { Component } from 'react'
import {
    Navbar, Nav, NavItem, NavLink
} from 'reactstrap'

class AdministratorNav extends Component {
    render() {
        return (
            <Nav>
                < NavItem >
                    <NavLink href="/list-staff/">Danh sách nhân viên</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/list-transfer/">Danh sách giao dịch</NavLink>
                </NavItem>
                <NavItem onClick={this.props.logout}>
                    <NavLink href="/logout">Đăng xuất</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export default AdministratorNav;