import React, {useCallback, useState} from 'react';
import {
  Alert,
  Button,
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
  Spinner
} from "reactstrap";

import {useDispatch, useSelector} from "react-redux";
import {recharge} from "../../redux/actions/recharge.action";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {getAccName} from "../../redux/actions/transfer.action";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {formatMoney} from "../../utils/utils";

const RechargePage = () => {
  const dispatch = useDispatch();
  const rechargeSelector = useSelector((state) => {
    return state.RechargeInfo;
  });
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const alertToggle = useToggle(false);
  const transState = useToggle(false);
  const [result, setResult] = useState({});
  // const [numberAccount, setNumberAccount] = useState(0);
  const [moneyTransfer, setMoneyTransfer] = useState(0);

  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange("");
  const username = useInputChange("");

  // function changeNumberAccount(e) {
  //   setNumberAccount(e.target.value);
  // }
  function onChangeAccountNum(e) {
    setAccountNum(e.target.value);
  }

  function changeMoneyTransfer(e) {
    setMoneyTransfer(e.target.value);
  }

  const onRecharge = useCallback(() => {
    let uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      uid: uid,
      accountNum: accountNum,
      amount: moneyTransfer
    };
    console.log(data);
    dispatch(recharge(data, accessToken))
        .then((response) => {
          console.log(response)
          if (response.errorCode === 0) {
            setResult(response.results);
            alertToggle.setActive();
            transState.setActive();
            console.log(response.result);
          } else {
            alertToggle.setActive();
            transState.setInActive();
            setResult(response);
          }
        })
        .catch((e) => {
          console.log(e)
        });
  }, [dispatch, accountNum, moneyTransfer, alertToggle, transState]);

  function submitRecharge(e) {
    e.preventDefault();
  }

  const onBlurAccountNum = useCallback(() => {
    if (accountNum.value === "") {
      setAccInValid(true)
      setAccInValidMsg("Không được để trống")
      return false;
    }
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      query: accountNum
    }
    dispatch(getAccName(data, accessToken))
        .then((response) => {
          console.log("success response", response)
          name.setValue(response.account.name)
          username.setValue(response.account.user_name)
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

  }, [accountNum, dispatch, name, username]);


  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={6} className={"mx-auto"}>
              <Card>
                <div className="card-body">
                  <Collapse isOpen={!alertToggle.active}>
                    <CardTitle>
                      <h3 className="text-center">NẠP TIỀN TÀI KHOẢN</h3>
                    </CardTitle>
                    <hr/>
                    <Form method="post" noValidate="novalidate"
                          className="needs-validation" onSubmit={submitRecharge}>
                      <h4>1. Thông tin tài khoản</h4>
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
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Họ và tên</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="name"
                                 disabled={true}
                                 value={name.value}/>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>Username</InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="username"
                                 disabled={true}
                                 value={username.value}/>
                        </InputGroup>
                      </FormGroup>
                      <h4>3. Thông tin cần chuyển tiền</h4>
                      <FormGroup>
                        <Label for="moneyTransfer">Số tiền <ShowRequire/></Label>
                        <Input type="number" name="moneyTransfer" id="moneyTransfer"
                               onChange={changeMoneyTransfer}
                               value={moneyTransfer}
                               required/>
                      </FormGroup>
                      <hr/>
                      <Button id="btnRecharge" type="submit" color={"success"}
                              size={"lg"}
                              block={true}
                              className="d-flex align-items-center justify-content-center"
                              disabled={rechargeSelector.isLoading}
                              onClick={onRecharge}
                      >
                        {
                          (rechargeSelector.isLoading ? <Spinner color="light"
                                                                 size={"sm"} role="status"
                                                                 aria-hidden="true"/> : "")
                        }
                        {' '}
                        <span style={{marginLeft: "5px"}}>Nạp tiền</span>
                      </Button>
                    </Form>
                  </Collapse>
                  <Collapse isOpen={alertToggle.active}>
                    <CardTitle>
                      {
                        transState.active ? <h3 className="text-center">NẠP TIỀN THÀNH CÔNG</h3> :
                            <h3 className="text-center">GIAO DỊCH THẤT BẠI</h3>
                      }
                    </CardTitle>
                    <hr/>
                    <Alert color="success" isOpen={transState.active}>
                      <h5>Thông tin giao dịch</h5>
                      <hr/>
                      <div>
                        Số tài khoản : {result.accountNum} <br/>
                        Số tiền : {formatMoney(result.amount)} VNĐ<br/>
                      </div>
                    </Alert>

                    <Alert color="danger" isOpen={!transState.active}>
                      <h5>Đã xảy ra lỗi trong quá trình chuyển tiền</h5>
                    </Alert>
                  </Collapse>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  );
};


export default RechargePage;
