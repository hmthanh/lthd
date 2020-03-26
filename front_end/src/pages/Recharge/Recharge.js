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
import './Recharge.css';
import {connect} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";

class Recharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
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
    // e.preventDefault();
    // let {
    //   isInterbank,
    //   receiverBank,
    //   receiverId,
    //   moneyTransfer,
    //   messageTransfer,
    //   isSenderPay
    // } = this.state;
    // let partner_code = 0;
    // if (isInterbank) {
    //   partner_code = receiverBank;
    // }
    // let uid = localStorage.getItem('uid');
    // let to_account = receiverId, note = messageTransfer, amount = moneyTransfer;
    // let cost_type = isSenderPay ? 0 : 1;
    //
    // let data = {
    //   partner_code: partner_code,
    //   uid: uid,
    //   to_account: to_account,
    //   note: note,
    //   amount: amount,
    //   cost_type: cost_type,
    // };
    // // console.log("data", data);
    // let accessToken = localStorage.getItem('accessToken');
    // // this.props.transfer(data, accessToken);
    //
    // let xxx = {
    //   partner_code: '0',
    //   uid: '1',
    //   to_account: '12',
    //   note: 'abc',
    //   amount: 23,
    //   cost_type: 0
    // };
    //
    // this.props.transfer(xxx, accessToken);
  };

  componentWillMount() {
    // console.log("componentWillMount");
  }

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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log("shouldComponentUpdate", nextProps);
    return true;
  }

  componentWillReceiveProps(props) {
    // // console.log("componentWillReceiveProps", props);
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
      userId,
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
                        <Label for="userId">Số tài khoản hoặc tên đăng nhập {this.showFieldRequire()}</Label>
                        <InputGroup className="mb-2">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Số tài khoản</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="userId" id="userId"
                                 onChange={this.onChange}
                                 value={userId}
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

export default connect(mapStateToProps, mapDispatchToProps)(Recharge);
