import React, {Component} from 'react'
import { NavItem, NavLink} from 'reactstrap'
import {AdminLink} from "../../shares/routes";

class AdministratorNav extends Component {
  render() {
    return (
        <>
          {
            AdminLink.map((link, index) => {
              return (
                  <NavItem key={index}>
                    <NavLink href={link.path}>{link.title}</NavLink>
                  </NavItem>
              )
            })
          }
        </>
    )
  }
}

export default AdministratorNav;