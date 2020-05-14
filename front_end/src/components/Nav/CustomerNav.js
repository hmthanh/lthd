import React from 'react'
import {
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap'
// import {useSelector} from "react-redux";
import {CustomerItemLink, CustomerLink} from "../../shares/routes";
import NavLogout from "./NavLogout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";


const CustomerNav = () => {
  // const RemindInfo = useSelector(state => {
  //   return state.RemindInfo
  // });

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
              <DropdownItem>
                <NavLink href="/create-debt">Tạo nhắc nợ</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/debt">Xem danh sách</NavLink>
              </DropdownItem>
              <DropdownItem>
              <NavLink href="/reminder">Thanh toán</NavLink>
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
                <div color="light" alt="Thông báo">
                  <span style={{marginRight: "10px", paddingLeft: "10px"}}>1</span>
                  <FontAwesomeIcon style={{marginRight: "10px"}} icon={faBell}></FontAwesomeIcon>
                </div>
                {/*<Badge style={{position: "absolute", top: '0px', right: '0px', fontSize: '8px'}}*/}
                {/*       color="secondary">100{RemindInfo.data.num}*/}
                {/*</Badge>*/}
                {/*<CardImg src="/image/notifi.png" style={{width: '20px'}}/>*/}
              </Card>
            </NavLink>
          </NavItem>
        </Nav>
      </>
  )
};

export default CustomerNav;