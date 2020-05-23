import React from 'react'
import {
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap'
import {CustomerItemLink, CustomerLink} from "../../shares/routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
// import {useDispatch, useSelector} from "react-redux";
// import {getCountReminder} from "../../redux/creators/remindCreator";


const CustomerNav = () => {
  // const dispatch = useDispatch();
  // const RemindInfo = useSelector(state => {
  //   return state.RemindInfo.data
  // });

  // useEffect(() => {
  //   let accessToken = localStorage.getItem('accessToken');
  //   const uid = localStorage.getItem('uid');
  //   dispatch(getCountReminder(uid, accessToken))
  //       .then((response) => {
  //
  //       });
  // }, [dispatch])

  return (
      <>
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
                <NavLink href="/debt">Danh sách nhắc nợ</NavLink>
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
          <NavItem>
            <NavLink href="/reminder">
              <Card style={{position: "relative"}}>
                <div color="light" title="Thông báo">
                  {/*{*/}
                  {/*  RemindInfo.num ? (<span style={{marginRight: "10px", paddingLeft: "10px"}}>{RemindInfo.num}</span>) : ""*/}
                  {/*}*/}
                  <FontAwesomeIcon style={{marginRight: "10px", marginLeft: "10px"}} icon={faBell}></FontAwesomeIcon>
                </div>
              </Card>
            </NavLink>
          </NavItem>
      </>
  )
};

export default CustomerNav;