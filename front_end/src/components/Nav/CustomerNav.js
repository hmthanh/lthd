import React from 'react'
import {
  Badge,
  Card,
  CardImg,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap'
import {useSelector} from "react-redux";
import {CustomerItemLink, CustomerLink} from "../../shares/routes";
import NavLogout from "./NavLogout";


const CustomerNav = () => {
  const RemindInfo = useSelector(state => {
    return state.RemindInfo
  });

  return (
      <>
        <Nav className="mr-auto" navbar>
          {
            CustomerLink.map((link, index) => {
              return (
                  <NavItem key={index}>
                    <NavLink href={link.path}>{link.title}</NavLink>
                  </NavItem>
              )
            })
          }
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Quản lý nhắc nợ
            </DropdownToggle>
            <DropdownMenu right>
              {/* onClick={this.props.infoUser} */}
              <DropdownItem>
                <NavLink href="/create-debt">Tạo nhắc nợ</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/debt">Nhắc nợ</NavLink>
              </DropdownItem>
              <DropdownItem>
              <NavLink href="/reminder">Danh sách nợ</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Tài khoản
            </DropdownToggle>
            <DropdownMenu right>
              {/* onClick={this.props.infoUser} */}
              <DropdownItem>
                <NavLink href="/info">Thông tin</NavLink>
              </DropdownItem>
              <DropdownItem divider/>
              {
                CustomerItemLink.map((link, index) => {
                  return (
                      <DropdownItem key={index}>
                        <NavLink href={link.path}>{link.title}</NavLink>
                      </DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavLogout/>
          <NavItem>
            <NavLink href="/remind">
              <Card style={{position: "relative"}}>
                <Badge style={{position: "absolute", top: '0px', right: '0px', fontSize: '8px'}}
                       color="secondary">{RemindInfo.data.num}
                </Badge>
                <CardImg src="/image/notifi.png" style={{width: '20px'}}/>
              </Card>
            </NavLink>
          </NavItem>
        </Nav>
      </>
  )
};

export default CustomerNav;