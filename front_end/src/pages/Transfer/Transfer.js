import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardTitle,
  Col,
  Collapse,
  Container,
  Form, FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Spinner
} from "reactstrap";
import {getAccName, getInterbank, getReceiverSaved, transfer} from "../../redux/creators/transferCreator";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import {checkValue, convertObjectToArray} from "../../utils/utils";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import ModalOTP from "../../components/Modal/ModalOTP";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {getAllAccount} from "../../redux/creators/accountCreator";

const Transfer = () => {
  const dispatch = useDispatch();
  const senderInfo = useSelector(state => {
    return state.AccountInfo.data
  });
  const transferInfo = useSelector((state) => {
    return state.TransferInfo
  });
  const interBankInfo = useSelector((state) => {
    return state.InterBank.data
  });
  const listSaved = useSelector((state) => {
    return state.ReceiverSaved.data
  });
  const AccName = useSelector((state) => {
    return state.AccName
  });

  const sender = useInputChange(1);
  const [receiveBank, setReceiveBank] = useState(0);
  const [isInterbank, setIsInterbank] = useState(false);
  const [selectSaved, setSelectSaved] = useState(0);
  const [isUseSaved, setIsUseSaved] = useState(false);
  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange('');
  const money = useInputChange(0);
  const message = useInputChange('');
  const isSenderPay = useToggle(true);
  const msgBoxToggle = useToggle(false);
  const showVerifyToggle = useToggle(false);
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const [transId, setTransId] = useState(0);

  const onChangeSelectSaved = (e) => {
    if (listSaved) {
      setSelectSaved(e.target.value);
      setAccountNum(e.target.value);
      setAccInValid(false)
      setAccValid(true)
      let change_name = listSaved[e.target.selectedIndex].name
      name.setValue(change_name);
    }
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

  const onBlurAccountNum = useCallback(() => {
    if (accountNum.value === "" || accountNum == 0){
      setAccInValid(true)
      setAccInValidMsg("Không được để trống")
      return false;
    }
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      query: accountNum
    }
    console.log("acc num", accountNum)
    dispatch(getAccName(data, accessToken))
        .then((response) => {
          console.log("success response", response)
          name.setValue(response.account.name)
          setAccountNum(response.account.account_num)
          setAccValid(true)
          setAccInValid(false)
          setAccInValidMsg("")
        })
        .catch((err) => {
          console.log(err)
          setAccInValid(true)
          setAccInValidMsg("Không tìm thấy số tài khoản hoặc username trên")
          setAccountNum("")
        })

  }, [accountNum, dispatch]);

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
            let firstUser = convertObjectToArray(response)[0];
            setSelectSaved(0);
            console.log(firstUser)
            setAccountNum(firstUser.account_num);
            name.setValue(firstUser.name);
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
    setTitleMsg(title);
    setContentMsg(content);
    msgBoxToggle.setActive();
  }

  function onVerifySuccess() {
    let title = "Chuyển tiền thành công";
    let content = "Đã xác thực OTP, Chuyển tiền thành công";
    showMessageBox(title, content);
  }

  function onSubmitForm(e) {
    e.preventDefault();
    if (accountNum == 0 || accountNum === "") {
      setAccInValid(true)
      setAccInValidMsg("Vui lòng nhập lại số tài khoản")
      return;
    }
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

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getAllAccount(uid, accessToken))
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [dispatch]);

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
                      <Label for="senderAccountType">Tài khoản người gửi <ShowRequire/></Label>
                      <Input type="select"
                             onChange={sender.onChange}
                             name="sender"
                             id="sender"
                             value={sender.value}>
                        {senderInfo.account && senderInfo.account.map((item, index) => {
                          return (item.type === 1 ? (
                              <option
                                  key={index}
                                  value={item.account_num}>{(item.type === 1 ? ("Thanh toán " + index) : ("Tiết kiệm " + index))}
                              </option>) : "")
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
                            listSaved != null &&
                            convertObjectToArray(listSaved).map((item, index) => {
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
                          <InputGroupText>ID</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="accountNum"
                               id="accountNum"
                               onChange={onChangeAccountNum}
                               value={accountNum}
                               onBlur={onBlurAccountNum}
                               invalid={accInValid}
                               valid={accValid}
                               placeholder="Nhập số tài khoản hoặc username"/>
                        {
                          AccName.isLoading ? (<InputGroupAddon addonType="prepend">
                            <InputGroupText><Spinner color="primary"
                                                     size={"sm"} role="status"
                                                     aria-hidden="true"/></InputGroupText>
                          </InputGroupAddon>) : ""
                        }
                        <FormFeedback>{accInValidMsg}</FormFeedback>
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Họ và tên</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="name"
                               disabled={true}
                               value={name.value}/>
                      </InputGroup>
                    </FormGroup>
                    <h4>3. Thông tin cần chuyển tiền</h4>
                    <FormGroup>
                      <Label for="moneyTransfer">Số tiền <ShowRequire/></Label>
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
                      isOpen={msgBoxToggle.active}
                      onClose={msgBoxToggle.setInActive}
                      title={titleMsg}
                      content={contentMsg}
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
