import React, {useState} from 'react';
import {Alert, Button, Card, CardTitle, Col, Collapse, Container, Form, FormGroup, Input, InputGroup, Label, ListGroupItem, Row} from "reactstrap";
import {useDispatch} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import useInputChange from "../../utils/useInputChange";
import {createAcc} from "../../redux/actions/account.action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import {formatFormalDate} from "../../utils/utils";
import useToggle from "../../utils/useToggle";
import {formatFormalDate} from "../../utils/utils";
import ShowRequire from "../../components/ShowRequire/ShowRequire";

const moment = require('moment')

const CreateAccount = () => {
  const dispatch = useDispatch();
  const messageBoxToggle = useToggle(false);
  const [contentMessage, setContentMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const fullName = useInputChange("");
  const email = useInputChange("");
  const phone = useInputChange("");
  const alertToggle = useToggle(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(moment().subtract(30, 'year')));
  const [accInfo, setAccInfo] = useState([]);


  function onSetDateOfBirth(value) {
    setDateOfBirth(value);
  }

  function onCreateAccount(e) {
    e.preventDefault();
    let data = {
      phone: phone.value,
      email: email.value,
      name: fullName.value,
      date_of_birth: moment(dateOfBirth).valueOf(),
    };
    let accessToken = localStorage.getItem('accessToken');
    dispatch(createAcc(data, accessToken))
        .then((response) => {
          if (response.msg === "successfully") {
            setAccInfo(response.restItem);
            alertToggle.setActive();
            // setTitleMessage("Đã tạo tài khoản thành công !");
            // // setContentMessage(`Đã tạo thành công tài khoản ${response.restItem.name}`);
            // messageBoxToggle.setActive();
          }
        })
        .catch((e) => {
          messageBoxToggle.setActive();
          setTitleMessage("Thất bại");
          setContentMessage("Đã xảy ra lỗi trong quá trình tạo tài khoản !");
          console.log("error", e);
        });
  }

  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={6} className={"mx-auto"}>

              <Card>
                <div className="card-body">
                  <Collapse isOpen={!alertToggle.active}>
                    <CardTitle>
                      <h3 className="text-center">TẠO TÀI KHOẢN</h3>
                    </CardTitle>
                    <hr/>
                    <Form method="post" noValidate="novalidate"
                          className="needs-validation" onSubmit={onCreateAccount}>

                      <h4>Thông tin cá nhân</h4>
                      <FormGroup>
                        <Label for="fullName">Họ và tên <ShowRequire/></Label>
                        <InputGroup className="mb-2">
                          <Input type="text"
                                 name="fullName"
                                 id="fullName"
                                 onChange={fullName.onChange}
                                 value={fullName.value}
                                 placeholder="Nguyễn Văn A"
                          />
                        </InputGroup>
                        <Label for="email">Email <ShowRequire/></Label>
                        <InputGroup className="mb-2">
                          <Input type="email" name="email" id="email"
                                 onChange={email.onChange}
                                 value={email.value}
                                 placeholder="someone@gmail.com"/>
                        </InputGroup>
                        <Label for="phone">Số điện thoại <ShowRequire/></Label>
                        <InputGroup className="mb-2">
                          <Input type="text" name="phone" id="phone"
                                 onChange={phone.onChange}
                                 value={phone.value}
                                 placeholder="0913-472506"/>
                        </InputGroup>
                        <Label for="phone">Ngày sinh <ShowRequire/></Label>
                        <InputGroup className="mb-2">
                          <DatePicker
                              className="form-control"
                              type="text"
                              name="date_of_birth"
                              dateFormat="dd-MM-yyyy"
                              onSelect={onSetDateOfBirth}
                              onChange={onSetDateOfBirth}
                              selected={dateOfBirth}
                          />
                        </InputGroup>
                      </FormGroup>
                      <hr/>
                      <Button id="btnRecharge" type="submit" color={"success"}
                              size={"lg"}
                              block={true}
                              className="d-flex align-items-center justify-content-center"
                              disabled={false}>
                        <span>Tạo tài khoản</span>
                      </Button>
                    </Form>
                  </Collapse>
                  <Collapse isOpen={alertToggle.active}>
                    <CardTitle>
                      <h3 className="text-center">TẠO THÀNH CÔNG</h3>
                    </CardTitle>
                    <hr/>
                    <Alert color="danger">
                      <h5>Thông tin tài khoản</h5>
                      <hr/>
                      <div>
                        Họ và tên : {accInfo.name} <br/>
                        Username : {accInfo.username}<br/>
                        Email : {accInfo.email}<br/>
                        Ngày sinh : {formatFormalDate(accInfo.dateOfBirth)}<br/>
                        Số điện thoại : {accInfo.phone}<br/>
                        Danh sách tài khoản :
                        {
                          accInfo.account &&
                          accInfo.account.map((acc, index) => {
                            if (acc.type === 1) {
                              return (
                                  <ListGroupItem key={index}>
                                    <strong>Thanh toán {index + 1}</strong><br/>
                                    Số tài khoản : {acc.accountNum}<br/>
                                  </ListGroupItem>)
                            } else {
                              return (
                                  <ListGroupItem key={index}>
                                    <strong>Tiết kiệm</strong><br/>
                                    Số tài khoản : {acc.accountNum}<br/>
                                  </ListGroupItem>)
                            }
                          })
                        }
                      </div>
                    </Alert>
                  </Collapse>
                </div>
              </Card>
              <MessageBox
                  isOpen={messageBoxToggle.active}
                  title={titleMessage}
                  content={contentMessage}
                  onClose={messageBoxToggle.setInActive}
              ></MessageBox>
            </Col>
          </Row>
        </div>
      </Container>
  )
};

export default CreateAccount;
