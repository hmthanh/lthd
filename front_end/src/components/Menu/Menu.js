import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

const menus = [
    {
        name: 'Trang Chủ',
        to: '/',
        exact: true
    },
    {
        name: 'Tài khoản',
        to: '/user',
        exact: false
    }, {
        name: 'Đăng ký',
        to: '/register',
        exact: false
    }, {
        name: 'Đăng nhập',
        to: '/login',
        exact: false
    },
    {
        name: 'Chuyển tiền',
        to: '/payment',
        exact: false
    },
    {
        name: 'Chuyển liên ngân hàng',
        to: '/transfer',
        exact: false
    }
]

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
            var active = match ? 'active' : '';
            return (
                <li className={`${active}`}>
                    <Link to={to} className="my-link">
                        {label}
                    </Link>
                </li>
            )
        }} />
    )
}

class Menu extends Component {

    render() {
        return (
            <header className="container">
                <nav className="navbar navbar-default">
                    <ul className="nav navbar-nav">
                        {this.showMenus(menus)}
                    </ul>
                </nav>
            </header>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                )
            });
        }
        return result;
    }

}

export default Menu;
