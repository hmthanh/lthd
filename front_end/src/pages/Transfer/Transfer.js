import React, {useState} from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardTitle,
  Col,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Spinner
} from "reactstrap";
import {getInterbank} from "../../redux/creators/transferCreator";

import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
// import { convertObjectToArray } from "../../utils/utils";
import useToggle from "../../utils/useToggle";
// import ModalOTP from "../../components/Modal/ModalOTP";
import useInputChange from "../../utils/useInputChange";

const Transfer = () => {
  const dispatch = useDispatch();
  const isShowMessageBox = useToggle();
  // const transferInfo = useSelector((state) => {
  //   return state.TransferInfo
  // });
  const interBankInfo = useSelector((state) => {
    return state.InterBank
  });
  // const listReceive = useSelector((state) => {
  //   return state.ReceiverSaved
  // });

  const listSenderAccount = [
    {name: 'Tài khoản thanh toán 1', value: 1},
    {name: 'Tài khoản thanh toán 2', value: 2}
  ];

  // const isInterBank = useToggle(false);

  // const [isSavedList, setIsSavedList] = useState(false);
  const sender = useInputChange(1);
  const receiveBank = useInputChange(0);
  const [isInterbank, setIsInterbank] = useState(false);
  const [isUseSaved, setIsUseSaved] = useState(false);
  // const [listSender, setListSender] = useState([{name: 'Tài khoản thanh toán 1', value: 1},
  //   {name: 'Tài khoản thanh toán 2', value: 2}]);
  // const [receiverSavedList, setReceiverSavedList] = useState(0);
  // const [receiverId, setReceiverId] = useState('');
  const name = useInputChange('');
  const money = useInputChange(0);
  const message = useInputChange('');
  // const [isSenderPay, setIsSenderPay] = useState(true);
  // const [isShowVerify, setIsShowVerify] = useState(false);
  //let uid = localStorage.getItem('uid');

  function showFieldRequire() {
    return <Badge color="danger" pill>Yêu cầu</Badge>
  }

  function onChangeLocalBank(e){
    setIsInterbank(false);
  }

  function onChangeInterbank(e) {
    if (!e.target.value) {
      setIsInterbank(true);
      let accessToken = localStorage.getItem('accessToken');

      dispatch(getInterbank(accessToken))
          .then(() => {
            console.log("getInterbank True");
          })
          .catch(() => {
            console.log("getInterbank False");
          }, [dispatch]);
    }
  }

  // function changeReceiverId(e){
  //   setReceiverId(e)
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
  // onChangeReceiverSaved = (e) => {
  //   let target = e.target;
  //   this.setState({
  //     receiverId: target.value
  //   });
  //
  //   if (!this.state.isSavedList) {
  //     this.changeReceiverId();
  //   }
  // };
  //
  // onSubmit = (e) => {
  //   e.preventDefault();
  //   let {
  //     isInterbank,
  //     receiverBank,
  //     receiverId,
  //     moneyTransfer,
  //     messageTransfer,
  //     isSenderPay
  //   } = this.state;
  //   let partner_code = 0;
  //   if (isInterbank) {
  //     partner_code = receiverBank;
  //   }
  //   let uid = localStorage.getItem('uid');
  //   let to_account = receiverId, note = messageTransfer, amount = moneyTransfer;
  //   let cost_type = isSenderPay ? 0 : 1;
  //
  //   let data = {
  //     partner_code: partner_code,
  //     uid: uid,
  //     to_account: to_account,
  //     note: note,
  //     amount: amount,
  //     cost_type: cost_type,
  //   };
  //   // console.log("data", data);
  //   let accessToken = localStorage.getItem('accessToken');
  //   this.props.transfer(data, accessToken);
  // };
  //


  // useEffect(() => {
  //   let accessToken = localStorage.getItem('accessToken');
  //   let uid = localStorage.getItem('uid');
  //   dispatch(getInterbank(accessToken))
  //       .then(() => {
  //         console.log("getInterbank True");
  //       })
  //       .catch(() => {
  //         console.log("getInterbank False");
  //       }, [dispatch]);
  // });

  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={5} className={"mx-auto"}>
              <Card id="localBank">
                <div className="card-body">
                  <CardTitle>
                    <h3 className="text-center">CHUYỂN KHOẢN</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation">
                    <h4>1. Người gửi</h4>
                    <FormGroup>
                      <Label for="senderAccountType">Tài khoản người gửi {showFieldRequire()}</Label>
                      <Input type="select"
                             onChange={sender.onChange}
                             name="sender"
                             id="sender" value={sender.value}>
                        {listSenderAccount.map((item, index) => {
                          return <option key={index} value={item.value}>{item.name}</option>
                        })}
                      </Input>
                    </FormGroup>
                    <h4>2. Người nhận</h4>
                    <FormGroup>
                      <Label for="receiverTransfer">Chọn ngân hàng</Label>
                      <div>
                        <ButtonGroup className="mb-2 ">
                          <Button color="primary" onClick={onChangeLocalBank}
                                  active={isInterbank === false}>Nội bộ</Button>
                          <Button color="primary" onClick={onChangeInterbank}
                                  active={isInterbank === true}>Liên ngân hàng</Button>
                        </ButtonGroup>
                      </div>
                      <Collapse isOpen={isInterbank}>
                        <Input type="select"
                            value={receiveBank.value}
                            onChange={receiveBank.onChange}
                               name="receiveBank" id="receiveBank">
                          {
                            interBankInfo.data.item &&
                            interBankInfo.data.item.map((item, index) => {
                              return <option key={index}
                                value={item.partner_code}>{item.name}</option>
                            })
                          }
                        </Input>
                      </Collapse>
                    </FormGroup>
                    <FormGroup>
                      <Label for="receiverSavedList">Thông tin người
                        nhận {showFieldRequire()}</Label>
                      <div>
                        <ButtonGroup className="mb-2 ">
                          <Button color="primary" onClick={this.changeSavedList}
                                  active={isSavedList === false}>Nhập thông tin mới</Button>
                          <Button color="primary" onClick={this.changeSavedList}
                                  active={isSavedList === true}>Danh sách đã lưu</Button>
                        </ButtonGroup>
                      </div>
                      <Collapse isOpen={false}>
                        {/*isSavedList*/}
                        {/*<Input type="select"*/}
                        {/*       value={receiverSavedList}*/}
                        {/*       onChange={this.onChangeReceiverSaved}*/}
                        {/*       name="receiverSavedList" id="receiverSavedList">*/}
                        {/*  /!*{*!/*/}
                        {/*  /!*  listReceiverSaved &&*!/*/}
                        {/*  /!*  listReceiverSaved.map((item, index) => {*!/*/}
                        {/*  /!*    return <option key={index}*!/*/}
                        {/*  /!*      value={item.account_num}>{item.alias_name}</option>*!/*/}
                        {/*  /!*  })*!/*/}
                        {/*  /!*}*!/*/}
                        {/*</Input>*/}
                      </Collapse>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Số tài khoản</InputGroupText>
                        </InputGroupAddon>
                        {/*<Input type="text" name="receiverId" id="receiverId"*/}
                        {/*       onChange={this.onChange}*/}
                        {/*       value={receiverId}*/}
                        {/*       placeholder="2343-5928-3472"/>*/}
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Họ và tên</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="name" id="receiverName"
                               onChange={name.onChange}
                               value={name.value}
                               placeholder="Nguyễn Văn A"/>
                      </InputGroup>
                    </FormGroup>
                    <h4>3. Thông tin cần chuyển tiền</h4>
                    <FormGroup>
                      <Label for="moneyTransfer">Số tiền {showFieldRequire()}</Label>
                      <Input type="number" name="money" id="money"
                             onChange={money.onChange}
                             value={money.value}
                             required/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="message">Nội dung chuyển tiền</Label>
                      <Input type="textarea" name="message"
                             value={message.value}
                             onChange={message.onChange}
                             id="message"/>
                    </FormGroup>
                    <FormGroup>
                      <Label>Hình thức trả phí</Label>
                      {/*<ButtonGroup className="mb-2">*/}
                      {/*  <Button color="primary" onClick={this.changeTypeTransfer}*/}
                      {/*          active={isSenderPay === true}>Người nhận trả phí</Button>*/}
                      {/*  <Button color="primary" onClick={this.changeTypeTransfer}*/}
                      {/*          active={isSenderPay === false}>Người gửi trả phí</Button>*/}
                      {/*</ButtonGroup>*/}
                    </FormGroup>
                    <div>
                      <Button id="btnTransferLocal" type="submit" color={"success"}
                              size={"lg"}
                              block={true}
                              className="d-flex align-items-center justify-content-center"
                              disabled={false}>
                        <Spinner className={(false ? "visible" : "disable")} color="light"
                                 size={"sm"} role="status"
                                 aria-hidden="true"/>{' '}
                        <span style={{marginLeft: "5px"}}>Chuyển Tiền</span>
                      </Button>
                    </div>
                  </Form>
                  <MessageBox isOpen={false}></MessageBox>
                </div>
                {/* <ModalOTP isOpen={this.props.TransferInfo.errorCode === 1}
                handleVerifyOTP={this.handleVerifyOTP}
                transId={this.props.TransferInfo.transId}></ModalOTP> */}
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  );
};

//
// const mapDispatchToProps = dispatch => ({
//   getInterbankAssociate: (accessToken) => dispatch(getInterbankAssociate(accessToken)),
//   transfer: (data, accessToken) => dispatch(transfer(data, accessToken)),
//   getListReceiverSaved: (uid, accessToken) => dispatch(getListReceiverSaved(uid, accessToken))
// });
//
// const mapStateToProps = (state) => {
//   return {
//     InterbankAssociate: state.InterbankAssociate,
//     TransferInfo: state.TransferInfo,
//     ReceiverSaved: state.ReceiverSaved
//   }
// };

export default Transfer;
