import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardTitle,
  Col,
  Collapse,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Spinner,
  UncontrolledTooltip
} from "reactstrap";
import {getAccName, getInterbank, transfer} from "../../redux/actions/transfer.action";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import ModalVerifyTrans from "../../components/Modal/ModalVerifyTrans";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {getPaymentAcc} from "../../redux/actions/account.action";
import {useHistory, useLocation} from "react-router";
import useInputRequire from "../../utils/useInputRequire";
import {FetchAlias} from "../../redux/actions/aliasReceiver.action";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faHeartBroken} from "@fortawesome/free-solid-svg-icons";
import FinishTransfer from "./FinishTransfer";

const Transfer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const senderInfo = useSelector(state => state.PaymentAcc.data);
  const transferInfo = useSelector((state) => state.TransferInfo);
  const interBankInfo = useSelector((state) => state.InterBank.data);
  const listSaved = useSelector(state => state.AliasReceiver.fetch);
  const AccName = useSelector((state) => state.AccName);

  const [sender, setSender] = useState(0);
  const [banking, setBanking] = useState(0);
  const [isInterbank, setIsInterbank] = useState(false);
  const [selectSaved, setSelectSaved] = useState(0);
  const [isUseSaved, setIsUseSaved] = useState(false);
  const saveAlias = useToggle(false);
  const accountNum = useInputRequire({
    value: "",
    valid: false,
    invalid: false,
    inValidMsg: ""
  })
  const name = useInputChange('');
  const money = useInputChange(0);
  const message = useInputChange('');
  const isSenderPay = useToggle(true);
  const msgBoxToggle = useToggle(false);
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const [transId, setTransId] = useState(0);
  const [transType, setTransType] = useState(2);
  const verifyOTPToggle = useToggle(false);
  const finishToggle = useToggle(false);

  const query = new URLSearchParams(location.search);
  const qAccNum = query.get("account");
  const qName = query.get("name");
  const qMoney = query.get("money");
  const qNote = query.get("note");
  const qDebt = query.get("debt");

  const onChangeSelectSaved = (e) => {
    setSelectSaved(e.target.value);
    accountNum.setValue(e.target.value);
    accountNum.setInValid(false);
    accountNum.setValid(true);
    let {alias_name, partner_bank} = listSaved.item[e.target.selectedIndex];
    console.log("partner_code", partner_bank);
    name.setValue(alias_name);
    setBanking(partner_bank);
    if (partner_bank !== "0") {
      setIsInterbank(true);
      let accessToken = localStorage.getItem('accessToken');

      dispatch(getInterbank(accessToken))
          .then((response) => {
            let partner_code = response.item[0].partner_code;
            setBanking(partner_code);
          })
          .catch((err) => {
            let title = "Đã xảy ra lỗi";
            let content = "Không thể tải ngân hàng liên kết\nError : " + err;
            showMessageBox(title, content);
            setIsInterbank(false);
          });
    }
  }

  function onChangeLocalBank(e) {
    setIsInterbank(false);
  }

  function onChangeReceiveBank(e) {
    setBanking(e.target.value);
  }

  const onBlurAccountNum = useCallback(() => {
    if (accountNum.value === "") {
      accountNum.setInValid(true)
      accountNum.setInValidMsg("Không được để trống")
      return false;
    }

    let accessToken = localStorage.getItem('accessToken')
    let partner_code = '0'
    if (isInterbank) {
      partner_code = banking
    }
    let data = {
      query: accountNum.value,
      partner: partner_code
    }
    dispatch(getAccName(data, accessToken))
        .then((response) => {
          console.log("success response", response)
          name.setValue(response.account.name)
          let newAccountNum = response.account.account_num;
          if (sender === newAccountNum) {
            accountNum.setInValid(true)
            accountNum.setInValidMsg("Không thể chuyển tiền chung tài khoản")
          } else {
            if (newAccountNum) {
              accountNum.setValue(newAccountNum)
            }
            accountNum.setValid(true)
            accountNum.setInValid(false)
            accountNum.setInValidMsg("")
          }
        })
        .catch((err) => {
          console.log(err)
          accountNum.setInValid(true)
          accountNum.setInValidMsg("Không tìm thấy số tài khoản hoặc username trên")
          accountNum.setValue("")
        })

  }, [accountNum, sender, dispatch, name, isInterbank, banking]);

  function onChangeInterbank(e) {
    if (!e.target.value) {
      setIsInterbank(true);
      let accessToken = localStorage.getItem('accessToken');

      dispatch(getInterbank(accessToken))
          .then((response) => {
            let partner_code = response.item[0].partner_code;
            setBanking(partner_code);
          })
          .catch((err) => {
            let title = "Đã xảy ra lỗi";
            let content = "Không thể tải ngân hàng liên kết\nError : " + err;
            showMessageBox(title, content);
            setIsInterbank(false);
          });
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

      dispatch(FetchAlias(uid, accessToken))
          .then((response) => {
            let firstUser = response.item[0];
            setSelectSaved(0);
            console.log(firstUser)
            accountNum.setValue(firstUser.account_num);
            name.setValue(firstUser.name);
            setBanking(firstUser.partner_code);
          })
          .catch((err) => {
            let title = "Đã xảy ra lỗi";
            let content = "Không thể tải danh sách đã lưu\nError : " + err;
            showMessageBox(title, content);
            setIsUseSaved(false);
          }, [dispatch]);
    }
  }

  const onChangeSender = (e) => {
    setSender(e.target.value);
  }

  function showMessageBox(title, content) {
    setTitleMsg(title);
    setContentMsg(content);
    msgBoxToggle.setActive();
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (accountNum.value === "") {
      accountNum.setInValid(true)
      accountNum.setInValidMsg("Vui lòng nhập lại số tài khoản")
      return;
    }
    if (sender === accountNum.value) {
      accountNum.setInValid(true)
      accountNum.setInValidMsg("Không thể chuyển tiền chung tài khoản")
      return;
    }
    let partner_code = 0;
    if (isInterbank) {
      partner_code = banking;
    }
    let uid = localStorage.getItem('uid');
    let note = message.value, amount = money.value;
    let cost_type = isSenderPay.active ? 0 : 1;

    let data = {
      partnerCode: partner_code,
      uid: uid,
      fromAccount: sender,
      toAccount: accountNum.value,
      note: note,
      amount: amount,
      costType: cost_type,
      type: transType,
      saveAlias: saveAlias.active,
      toName: name.value,
      debt_id: qDebt
    };
    console.log("data", data);
    let accessToken = localStorage.getItem('accessToken');

    dispatch(transfer(data, accessToken))
        .then((response) => {
          console.log("response", response);
          if (response.errorCode === 0) {
            setTransId(response.transId);
            // showVerifyToggle.setActive();
            verifyOTPToggle.setActive();
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
        });
  }

  useEffect(() => {
    if (qAccNum && qName && qMoney && qNote) {
      setTransType(4);
      accountNum.setValue(qAccNum);
      name.setValue(qName);
      money.setValue(qMoney);
      message.setValue(qNote);
    }
  }, [location, qAccNum, qMoney, qName, qNote, message, money, name, accountNum])

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getPaymentAcc(uid, accessToken))
        .then((response) => {
          setSender(response.account[0].account_num)
        })
        .catch((e) => {
          console.log(e);
        });
  }, [dispatch]);

  const onFinish = useCallback(() => {
    finishToggle.setActive();
    setTimeout(() => {
      history.push("/user-history")
    }, 5000)
  }, [finishToggle, history]);

  const onBack = () => {
    verifyOTPToggle.setInActive();
  }

  return (
      <Container>
        <Row>
          <Col xs={12} sm={8} md={6} lg={6} className={"mx-auto"}>
            <Card>
              <div className="card-body">
                <Collapse isOpen={!verifyOTPToggle.active}>
                  <CardTitle>
                    <h3 className="text-center">1. CHUYỂN KHOẢN</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={onSubmitForm}>
                    <h4>1. Người gửi</h4>
                    <FormGroup>
                      <Label for="senderAccountType">Tài khoản người gửi <ShowRequire/></Label>
                      <Input type="select"
                             onChange={onChangeSender}
                             name="sender"
                             id="sender"
                             value={sender}>
                        {senderInfo.account && senderInfo.account.map((item, index) => {
                          return (<option
                              key={index}
                              value={item.account_num}>{(`Thanh toán ${index + 1} (${item.account_num})`)}
                          </option>)
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
                               value={banking}
                               onChange={onChangeReceiveBank}
                               name="receiveBank" id="receiveBank">
                          {
                            interBankInfo.item &&
                            interBankInfo.item.map((item, index) => {
                              return <option key={index}
                                             value={item.partner_code}>{item.name}</option>
                            })
                          }
                        </Input>
                      </Collapse>
                    </FormGroup>
                    <FormGroup>
                      <Label for="receiverSavedList">Thông tin người
                        nhận <ShowRequire/></Label>
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
                            listSaved.item &&
                            listSaved.item.map((item, index) => {
                              return <option key={index} value={item.account_num}>{item.alias_name}</option>
                            })
                          }
                        </Input>
                      </Collapse>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>ID</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="accountNum"
                               id="accountNum"
                               onChange={accountNum.onChange}
                               value={accountNum.value || ''}
                               onBlur={onBlurAccountNum}
                               invalid={accountNum.invalid}
                               valid={accountNum.valid}
                               placeholder="Nhập số tài khoản hoặc username"/>
                        {
                          AccName.isLoading ? (<InputGroupAddon addonType="prepend">
                            <InputGroupText><Spinner color="primary"
                                                     size={"sm"} role="status"
                                                     aria-hidden="true"/></InputGroupText>
                          </InputGroupAddon>) : ""
                        }
                        <FormFeedback>{accountNum.inValidMsg}</FormFeedback>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Họ và tên</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="name"
                               disabled={true}
                               value={name.value || ""}/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Button color={(saveAlias.active ? "success" : "danger")} id="saveAlias" onClick={saveAlias.toggle}>
                        <span style={{marginRight: "10px"}}>{(saveAlias.active ? "Đã lưu" : "Không lưu")}</span>
                        <FontAwesomeIcon icon={(saveAlias.active ? faHeart : faHeartBroken)}></FontAwesomeIcon>
                      </Button>
                      <UncontrolledTooltip placement="right" target="saveAlias">Lưu tên gợi nhớ
                      </UncontrolledTooltip>
                    </FormGroup>
                    <h4>3. Thông tin cần chuyển tiền</h4>
                    <FormGroup>
                      <Label for="money">Số tiền <ShowRequire/></Label>
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
                      <Label>Hình thức trả phí</Label><br/>
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
                      isOpen={msgBoxToggle.active}
                      onClose={msgBoxToggle.setInActive}
                      title={titleMsg}
                      content={contentMsg}
                  ></MessageBox>

                </Collapse>
                <Collapse isOpen={verifyOTPToggle.active}>
                  <ModalVerifyTrans
                      transId={transId}
                      onFinish={onFinish}
                      onBack={onBack}
                      finishToggle={finishToggle}
                  ></ModalVerifyTrans>
                </Collapse>
                <Collapse isOpen={finishToggle.active}>
                  <FinishTransfer onBack={onBack}></FinishTransfer>
                </Collapse>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};


export default Transfer;
