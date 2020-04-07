import React, {Component} from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import NavLogout from "./NavLogout";
import {AdminLink} from "../../shares/routes";

class AdministratorNav extends Component {
  render() {
    return (
        <Nav>
          {
            AdminLink.map((link, index) => {
              return (
                  <NavItem key={index}>
                    <NavLink href={link.path}>{link.title}</NavLink>
                  </NavItem>
              )
            })
          }
          <NavLogout/>
        </Nav>
    )
  }
}

export default AdministratorNav;