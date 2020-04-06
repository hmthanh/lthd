import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import {useDispatch} from "react-redux";
import {AuthLogout} from "../../redux/creators/authCreator";
import {EmployeeLink} from "../../shares/routes";
import NavLogout from "./NavLogout";

const CustomerNav = () => {
  return (
      <Nav>
        {
          EmployeeLink.map((link, index) => {
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
};

export default CustomerNav;