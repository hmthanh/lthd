import React from 'react';
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
import {useDispatch} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import useInputChange from "../../utils/useInputChange";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const username = useInputChange("");
  const password = useInputChange("");
  const fullName = useInputChange("");
  const email = useInputChange("");
  const phone = useInputChange("");

  function showFieldRequire() {
    return <Badge color="danger" pill>Yêu cầu</Badge>
  }

  // changeReceiverId = () => {
  //   this.setState({
  //     receiverId: this.state.receiverSavedList
  //   });
  // };
  //
  // changeInterbank = () => {
  //   this.setState({
  //     isInterbank: !this.state.isInterbank
  //   });
  // };
  //
  // changeSavedList = () => {
  //   if (!this.state.isSavedList) {
  //     this.changeReceiverId();
  //   }
  //   this.setState({
  //     isSavedList: !this.state.isSavedList
  //   });
  // };
  //
  // changeTypeTransfer = () => this.setState({
  //   isSenderPay: !this.state.isSenderPay
  // });
  //
  // onChange = (e) => {
  //   let target = e.target;
  //   let name = target.name;
  //   let value = target.type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  function onCreateAccount(e) {
    e.preventDefault();
    let data = {
      username: username.value,
      password: password.value,
      fullName: fullName.value,
      email: email.value,
      phone: phone.value
    };
    console.log(data);
    let accessToken = localStorage.getItem('accessToken');
    // this.props.transfer(data, accessToken);
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
                    <h4>1. Thông tin tài khoản</h4>
                    <FormGroup>
                      <Label for="username">Tên tài khoản {showFieldRequire()}</Label>
                      <InputGroup className="mb-2">
                        <Input type="text" name="username" id="username"
                               onChange={username.onChange}
                               value={username.value}
                               placeholder=""/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Mật khẩu {showFieldRequire()}</Label>
                      <InputGroup className="mb-2">
                        <Input type="password" name="password" id="password"
                               onChange={password.onChange}
                               value={password.value}
                               placeholder=""/>
                      </InputGroup>
                    </FormGroup>
                    <h4>2. Thông tin cá nhân</h4>
                    <FormGroup>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Họ và tên</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="fullName" id="fullName"
                               onChange={fullName.onChange}
                               value={fullName.value}/>
                      </InputGroup>

                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Email</InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" id="email"
                               onChange={email.onChange}
                               value={email.value}
                               placeholder=""/>
                      </InputGroup>

                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Số điện thoại</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="phone" id="phone"
                               onChange={phone.onChange}
                               value={phone.value}
                               placeholder=""/>
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
                  {
                    (0 === -206 ?
                        <MessageBox isOpen={false}></MessageBox> : "")
                  }
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  )
};

export default CreateAccount;
