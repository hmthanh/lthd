import React, {useCallback, useState} from 'react';
import {
  Button,
  Card,
  CardTitle,
  Col,
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
import MessageBox from "../../components/Modal/MessageBox";
import {recharge} from "../../redux/creators/rechargeCreator";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {getAccName} from "../../redux/creators/transferCreator";
import ShowRequire from "../../components/ShowRequire/ShowRequire";

const RechargePage = () => {
  const dispatch = useDispatch();
  const successModalToggle = useToggle();
  const rechargeSelector = useSelector((state) => {
    return state.RechargeInfo;
  });
  const AccName = useSelector((state) => {
    return state.AccName
  });
  // const [numberAccount, setNumberAccount] = useState(0);
  const [moneyTransfer, setMoneyTransfer] = useState(0);

  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange("");

  const titleMessage = ["", "Nạp tiền thất bại", "Nạp tiền thành công"];
  const contentMessage = ["", "Đã xảy ra lỗi\nVui lòng kiểm tra lại", "Đã nạp tiền vào tài khoản thành công"];

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
    let data = {
      account_num: accountNum,
      money: moneyTransfer
    };
    let accessToken = localStorage.getItem('accessToken');
    dispatch(recharge(data, accessToken))
        .then(() => {
          successModalToggle.setActive();
        })
        .catch(() => {
          successModalToggle.setActive();
        });
  }, [dispatch, accountNum, moneyTransfer, successModalToggle]);

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

  }, [accountNum, dispatch, name]);


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
                  <MessageBox
                      className={""}
                      isOpen={successModalToggle.active}
                      onClose={() => successModalToggle.setInActive()}
                      title={titleMessage[rechargeSelector.statusId]}
                      content={contentMessage[rechargeSelector.statusId]}
                  ></MessageBox>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  );
};


export default RechargePage;
