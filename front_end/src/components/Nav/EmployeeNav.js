import React from 'react'
import { NavItem, NavLink} from 'reactstrap'
import {EmployeeLink} from "../../shares/routes";

const CustomerNav = () => {
  return (
      <>
        {
          EmployeeLink.map((link, index) => {
            return (
                <NavItem key={index}>
                  <NavLink href={link.path}>{link.title}</NavLink>
                </NavItem>
            )
          })
        }
      </>
  )
};

export default CustomerNav;