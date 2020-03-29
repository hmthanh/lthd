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
import {getInterbank, getReceiverSaved, transfer} from "../../redux/creators/transferCreator";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import {convertObjectToArray} from "../../utils/utils";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import ModalOTP from "../../components/Modal/ModalOTP";

const Transfer = () => {
  const listSenderAccount = [
    {name: 'Tài khoản thanh toán 1', value: 1},
    {name: 'Tài khoản thanh toán 2', value: 2}
  ];
  const dispatch = useDispatch();
  const transferInfo = useSelector((state) => {
    return state.TransferInfo
  });
  const interBankInfo = useSelector((state) => {
    return state.InterBank
  });
  const listSaved = useSelector((state) => {
    return state.ReceiverSaved
  });

  const sender = useInputChange(1);
  const [receiveBank, setReceiveBank] = useState(0);
  const [isInterbank, setIsInterbank] = useState(false);
  const [selectSaved, setSelectSaved] = useState(0);
  const [isUseSaved, setIsUseSaved] = useState(false);
  const [accountNum, setAccountNum] = useState(0);
  const name = useInputChange('');
  const money = useInputChange(0);
  const message = useInputChange('');
  const isSenderPay = useToggle(true);
  const messageBoxToggle = useToggle(false);
  const showVerifyToggle = useToggle(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [contentMessage, setContentMessage] = useState("");
  const [transId, setTransId] = useState(0);

  function showFieldRequire() {
    return <Badge color="danger" pill>Yêu cầu</Badge>
  }

  function onChangeSelectSaved(e) {
    setSelectSaved(e.target.value);
    setAccountNum(e.target.value);
  }

  function onChangeAccountNum(e) {
    setAccountNum(e.target.value);
  }

  function onChangeLocalBank(e) {
    setIsInterbank(false);
  }

  function onChangeReceiveBank(e) {
    setReceiveBank(e.target.value);
  }

  function onChangeInterbank(e) {
    if (!e.target.value) {
      setIsInterbank(true);
      let accessToken = localStorage.getItem('accessToken');

      dispatch(getInterbank(accessToken))
          .then((response) => {
            let partner_code = response.item[0].partner_code;
            setReceiveBank(partner_code);
          })
          .catch((err) => {
            let title = "Đã xảy ra lỗi";
            let content = "Không thể tải ngân hàng liên kết\nError : " + err;
            showMessageBox(title, content);
            setIsInterbank(false);
          }, [dispatch]);
    }
  }

  function onChangeNotUseSaved() {
    setIsUseSaved(false);
  }

  function onChangeUseSaved(e) {
    if (!e.target.value) {
      setIsUseSaved(true);
      let accessToken = localStorage.getItem('accessToken');
      let uid = localStorage.getItem('uid');

      dispatch(getReceiverSaved(uid, accessToken))
          .then((response) => {
            let accountNum = convertObjectToArray(response)[0].account_num;
            setAccountNum(accountNum);
          })
          .catch((err) => {
            let title = "Đã xảy ra lỗi";
            let content = "Không thể tải danh sách đã lưu\nError : " + err;
            showMessageBox(title, content);
            setIsUseSaved(false);
          }, [dispatch]);
    }
  }

  function showMessageBox(title, content) {
    setTitleMessage(title);
    setContentMessage(content);
    messageBoxToggle.setActive();
  }

  function onVerifySuccess() {
    let title = "Chuyển tiền thành công";
    let content = "Đã xác thực OTP, Chuyển tiền thành công";
    showMessageBox(title, content);
  }

  function onSubmitForm(e) {
    e.preventDefault();
    let partner_code = 0;
    if (isInterbank) {
      partner_code = receiveBank;
    }
    let uid = localStorage.getItem('uid');
    let to_account = accountNum, note = message.value, amount = money.value;
    let cost_type = isSenderPay.active ? 0 : 1;

    let data = {
      partner_code: partner_code,
      uid: uid,
      to_account: to_account,
      note: note,
      amount: amount,
      cost_type: cost_type,
    };
    console.log(data);
    let accessToken = localStorage.getItem('accessToken');

    dispatch(transfer(data, accessToken))
        .then((response) => {
          console.log("response", response);
          if (response.errorCode === 0) {
            setTransId(response.transId);
            showVerifyToggle.setActive();
          } else {
            let title = "Chuyển tiền thất bại";
            let content = "Số dư của tài khoản không đủ";
            showMessageBox(title, content);
          }
        })
        .catch((err) => {
          let title = "Chuyển tiền thất bại";
          let content = "Đã xảy ra lỗi trong quá trình chuyển tiền\n Error : " + err;
          showMessageBox(title, content);
        }, [dispatch]);
  }


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
                        className="needs-validation" onSubmit={onSubmitForm}>
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
                               value={receiveBank}
                               onChange={onChangeReceiveBank}
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
                          <Button color="primary" onClick={onChangeNotUseSaved}
                                  active={isUseSaved === false}>Nhập thông tin mới</Button>
                          <Button color="primary" onClick={onChangeUseSaved}
                                  active={isUseSaved === true}>Danh sách đã lưu</Button>
                        </ButtonGroup>
                      </div>
                      <Collapse isOpen={isUseSaved}>
                        <Input type="select"
                               value={selectSaved}
                               onChange={onChangeSelectSaved}
                               name="selectSaved" id="selectSaved">
                          {
                            listSaved.data != null &&
                            convertObjectToArray(listSaved.data).map((item, index) => {
                              return <option key={index}
                                             value={item.account_num}>{item.alias_name}</option>
                            })
                          }
                        </Input>
                      </Collapse>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Số tài khoản</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="accountNum" id="accountNum"
                               onChange={onChangeAccountNum}
                               value={accountNum}
                               placeholder="0725922171392"/>
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
                      <ButtonGroup className="mb-2">
                        <Button color="primary" onClick={isSenderPay.setActive}
                                active={isSenderPay.active === true}>Người nhận trả phí</Button>
                        <Button color="primary" onClick={isSenderPay.setInActive}
                                active={isSenderPay.active === false}>Người gửi trả phí</Button>
                      </ButtonGroup>
                    </FormGroup>
                    <div>
                      <Button id="btnTransferLocal"
                              type="submit"
                              color={"success"}
                              size={"lg"}
                              block={true}
                              className="d-flex align-items-center justify-content-center"
                              disabled={transferInfo.isLoading}
                      >
                        <span style={{marginRight: "10px"}}>
                          {(transferInfo.isLoading ? <Spinner color="light"
                                                              size={"sm"} role="status"
                                                              aria-hidden="true"/> : "")}
                        </span>

                        <span>Chuyển Tiền</span>
                      </Button>
                    </div>
                  </Form>
                  <MessageBox
                      className={""}
                      isOpen={messageBoxToggle.active}
                      onClose={() => messageBoxToggle.setInActive()}
                      title={titleMessage}
                      content={contentMessage}
                  ></MessageBox>
                </div>
                <ModalOTP
                    isShow={showVerifyToggle.active}
                    transId={transId}
                    onClose={showVerifyToggle.setInActive}
                    onVerifySuccess={onVerifySuccess}
                ></ModalOTP>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  );
};


export default Transfer;
