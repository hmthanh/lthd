import React, {Component, useCallback} from 'react';
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
import './Recharge.css';
import {connect} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import {recharge} from "../../redux/creators/rechargeCreator";

class Recharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberAccount: 0,
      moneyTransfer: 0
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

  onChangeReceiverSaved = (e) => {
    let target = e.target;
    this.setState({
      receiverId: target.value
    });

    if (!this.state.isSavedList) {
      this.changeReceiverId();
    }
  };

  loadInvalidTransferModal = () => this.setState({
    isInvalidTransfer: true
  });

  onSubmit = (e) => {
    e.preventDefault();
    console.log("Bat dau o day");
    let {numberAccount, moneyTransfer} = this.state;
    let data = {
      "account_num": numberAccount,
      "money": moneyTransfer
    };
    console.log("data", data);
    let accessToken = localStorage.getItem('accessToken');
    this.props.recharge(data, accessToken);
  };

  componentWillReceiveProps(props) {
    // // console.log("componentWillReceDiveProps", props);
    // let errorCode = this.props.TransferInfo.errorCode;
    // console.log("errorCode", errorCode);
    // if (errorCode === 1) {
    //   console.log("isVerifyModal");
    //   this.setState({
    //     isShowVerifyOTPModal: true
    //   });
    //   // this.loadInvalidTransferModal();
    //   // console.log("abc")
    // } else if (errorCode === -206) {
    //   console.log("isInvalidModal");
    //   this.setState({
    //     isShowInvalidModal: true
    //   });
    //   // this.loadInvalidTransferModal();
    //
    // }
  }

  render() {
    let {
      numberAccount,
      moneyTransfer
    } = this.state;

    return (
        <Container>
          <div className="container-fluid py-3">
            <Row>
              <Col xs={12} sm={8} md={6} lg={5} className={"mx-auto"}>
                <Card id="localBank">
                  <div className="card-body">
                    <CardTitle>
                      <h3 className="text-center">NẠP TIỀN TÀI KHOẢN</h3>
                    </CardTitle>
                    <hr/>
                    <Form method="post" noValidate="novalidate"
                          className="needs-validation" onSubmit={this.onSubmit}>
                      <h4>1. Thông tin tài khoản</h4>

                      <FormGroup>
                        <Label for="numberAccount">Số tài khoản hoặc tên đăng nhập {this.showFieldRequire()}</Label>
                        <InputGroup className="mb-2">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Số tài khoản</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="numberAccount" id="numberAccount"
                                 onChange={this.onChange}
                                 value={numberAccount}
                                 placeholder="2343-5928-3472"/>
                        </InputGroup>
                      </FormGroup>

                      <h4>3. Thông tin cần chuyển tiền</h4>
                      <FormGroup>
                        <Label for="moneyTransfer">Số tiền {this.showFieldRequire()}</Label>
                        <Input type="number" name="moneyTransfer" id="moneyTransfer"
                               onChange={this.onChange}
                               value={moneyTransfer}
                               required/>
                      </FormGroup>
                      <div>
                        <Button id="btnRecharge" type="submit" color={"success"}
                                size={"lg"}
                                block={true}
                                className="d-flex align-items-center justify-content-center"
                                disabled={false}>
                          <span>Nạp tiền</span>
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
  recharge: (data, accessToken) => dispatch(recharge(data, accessToken)),
  // getInterbankAssociate: (accessToken) => dispatch(getInterbankAssociate(accessToken)),
  // transfer: (data, accessToken) => dispatch(transfer(data, accessToken)),
  // getListReceiverSaved: (uid, accessToken) => dispatch(getListReceiverSaved(uid, accessToken))
});

const mapStateToProps = (state) => {
  return {
    RechargeInfo: state.RechargeInfo
    // InterbankAssociate: state.InterbankAssociate,
    // TransferInfo: state.TransferInfo,
    // ReceiverSaved: state.ReceiverSaved
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recharge);
