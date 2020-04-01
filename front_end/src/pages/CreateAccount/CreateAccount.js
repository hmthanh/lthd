import React, {useState} from 'react';
import {
  Badge,
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from "reactstrap";
import './CreateAccount.css';
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import useInputChange from "../../utils/useInputChange";
import {createAcc} from "../../redux/creators/accountCreator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatFormalDate} from "../../utils/utils";
import useToggle from "../../utils/useToggle";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const CreateAccount = useSelector((state) => {
    return state.CreateAccount
  });
  const messageBoxToggle = useToggle(false);
  const [contentMessage, setContentMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  // const username = useInputChange("");
  // const password = useInputChange("");
  const fullName = useInputChange("");
  const email = useInputChange("");
  const phone = useInputChange("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  // date => {
  //   props.onChange(date);
  //   return setStartDate(date);
  // }

  function showFieldRequire() {
    return <Badge color="danger" pill>Yêu cầu</Badge>
  }

  function onSetDateOfBirth(value) {
    setDateOfBirth(value);
  }

  function onCreateAccount(e) {
    e.preventDefault();
    let data = {
      phone: phone.value,
      email: email.value,
      name: fullName.value,
      date_of_birth: formatFormalDate(dateOfBirth),
      // user_name: username.value,
      // password: password.value,
    };
    let accessToken = localStorage.getItem('accessToken');
    dispatch(createAcc(data, accessToken))
        .then((response) => {
          if (response.msg == "successfully") {
            setTitleMessage("Thành công");
            setContentMessage("Đã tạo tài khoản thành công !");
            messageBoxToggle.setActive();
          }
        })
        .catch((e) => {
          messageBoxToggle.active();
          setTitleMessage("Thất bại");
          setContentMessage("Đã xảy ra lỗi trong quá trình tạo tài khoản !");
          console.log("error", e);
        });
  }

  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={5} className={"mx-auto"}>
              <Card id="localBank">
                <div className="card-body">
                  <CardTitle>
                    <h3 className="text-center">TẠO TÀI KHOẢN</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={onCreateAccount}>
                    {/*<h4>1. Thông tin tài khoản</h4>*/}
                    {/*<FormGroup>*/}
                    {/*  <Label for="username">Tên tài khoản {showFieldRequire()}</Label>*/}
                    {/*  <InputGroup className="mb-2">*/}
                    {/*    <Input type="text" name="username" id="username"*/}
                    {/*           onChange={username.onChange}*/}
                    {/*           value={username.value}*/}
                    {/*           placeholder=""/>*/}
                    {/*  </InputGroup>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup>*/}
                    {/*  <Label for="password">Mật khẩu {showFieldRequire()}</Label>*/}
                    {/*  <InputGroup className="mb-2">*/}
                    {/*    <Input type="password" name="password" id="password"*/}
                    {/*           onChange={password.onChange}*/}
                    {/*           value={password.value}*/}
                    {/*           placeholder=""/>*/}
                    {/*  </InputGroup>*/}
                    {/*</FormGroup>*/}
                    <h4>Thông tin cá nhân</h4>
                    <FormGroup>
                      <Label for="fullName">Họ và tên {showFieldRequire()}</Label>
                      <InputGroup className="mb-2">
                        <Input type="text"
                               name="fullName"
                               id="fullName"
                               onChange={fullName.onChange}
                               value={fullName.value}
                               placeholder="Nguyễn Văn A"
                        />
                      </InputGroup>
                      <Label for="email">Email {showFieldRequire()}</Label>
                      <InputGroup className="mb-2">
                        <Input type="email" name="email" id="email"
                               onChange={email.onChange}
                               value={email.value}
                               placeholder="someone@gmail.com"/>
                      </InputGroup>
                      <Label for="phone">Số điện thoại {showFieldRequire()}</Label>
                      <InputGroup className="mb-2">
                        <Input type="text" name="phone" id="phone"
                               onChange={phone.onChange}
                               value={phone.value}
                               placeholder="0913-472506"/>
                      </InputGroup>
                      <Label for="phone">Ngày sinh {showFieldRequire()}</Label>
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
                    <div>
                      <Button id="btnRecharge" type="submit" color={"success"}
                              size={"lg"}
                              block={true}
                              className="d-flex align-items-center justify-content-center"
                              disabled={false}>
                        <span>Tạo tài khoản</span>
                      </Button>
                    </div>
                  </Form>
                  <MessageBox
                      isOpen={messageBoxToggle.active}
                      title={titleMessage}
                      content={contentMessage}
                      onClose={messageBoxToggle.setInActive}
                  ></MessageBox>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  )
};

export default CreateAccount;
