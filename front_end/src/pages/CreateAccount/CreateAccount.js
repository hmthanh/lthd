import React, {Component} from 'react';
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
import {connect} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullname: '',
      email: '',
      phone: ''
    };
  }

  changeReceiverId = () => {
    this.setState({
      receiverId: this.state.receiverSavedList
    });
  };

  changeInterbank = () => {
    this.setState({
      isInterbank: !this.state.isInterbank
    });
  };

  changeSavedList = () => {
    if (!this.state.isSavedList) {
      this.changeReceiverId();
    }
    this.setState({
      isSavedList: !this.state.isSavedList
    });
  };

  changeTypeTransfer = () => this.setState({
    isSenderPay: !this.state.isSenderPay
  });

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let {
      username,
      password,
      fullname,
      email,
      phone
    } = this.state;

    let data = {
      username: username,
      password: password,
      fullname: fullname,
      email: email,
      phone: phone
    };
    let accessToken = localStorage.getItem('accessToken');
    console.log(data);
    // this.props.transfer(data, accessToken);
  };


  componentDidMount() {
    // // console.log("componentDidMount")
    // let accessToken = localStorage.getItem('accessToken');
    // let uid = localStorage.getItem('uid');
    // this.props.getInterbankAssociate(accessToken);
    // this.props.getListReceiverSaved(uid, accessToken);
    // // listReceiverSaved

    // let data = {
    //     partner_code: '0',
    //     uid: '1',
    //     to_account: '2173891742',
    //     note: 'abc',
    //     amount: 234234234234224,
    //     cost_type: 0
    // };
    // this.props.transfer(data, accessToken);
  }

  render() {
    let {username, password, fullname, email, phone} = this.state;

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
                          className="needs-validation" onSubmit={this.onSubmit}>
                      <h4>1. Thông tin tài khoản</h4>
                      <FormGroup>
                        <Label for="username">Tên tài khoản {this.showFieldRequire()}</Label>
                        <InputGroup className="mb-2">
                          <Input type="text" name="username" id="username"
                                 onChange={this.onChange}
                                 value={username}
                                 placeholder=""/>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Mật khẩu {this.showFieldRequire()}</Label>
                        <InputGroup className="mb-2">
                          <Input type="password" name="password" id="password"
                                 onChange={this.onChange}
                                 value={password}
                                 placeholder=""/>
                        </InputGroup>
                      </FormGroup>
                      <h4>2. Thông tin cá nhân</h4>
                      <FormGroup>
                        <InputGroup className="mb-2">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Họ và tên</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="fullname" id="fullname"
                                 onChange={this.onChange}
                                 value={fullname}/>
                        </InputGroup>

                        <InputGroup className="mb-2">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Email</InputGroupText>
                          </InputGroupAddon>
                          <Input type="email" name="email" id="email"
                                 onChange={this.onChange}
                                 value={email}
                                 placeholder=""/>
                        </InputGroup>

                        <InputGroup className="mb-2">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Số điện thoại</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="phone" id="phone"
                                 onChange={this.onChange}
                                 value={phone}
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
                          <MessageBox isOpen={true}></MessageBox> : "")
                    }
                  </div>
                  {/* <ModalOTP isOpen={this.props.TransferInfo.errorCode === 1}
                handleVerifyOTP={this.handleVerifyOTP}
                transId={this.props.TransferInfo.transId}></ModalOTP> */}
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
    )
  }

  showFieldRequire() {
    return <Badge color="danger" pill>Yêu cầu</Badge>
  }
}

const mapDispatchToProps = dispatch => ({
  // getInterbankAssociate: (accessToken) => dispatch(getInterbankAssociate(accessToken)),
  // transfer: (data, accessToken) => dispatch(transfer(data, accessToken)),
  // getListReceiverSaved: (uid, accessToken) => dispatch(getListReceiverSaved(uid, accessToken))
});

const mapStateToProps = (state) => {
  return {
    // InterbankAssociate: state.InterbankAssociate,
    // TransferInfo: state.TransferInfo,
    // ReceiverSaved: state.ReceiverSaved
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
