import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
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
import {getAccName} from "../../redux/actions/transfer.action";
import {useDispatch, useSelector} from "react-redux";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {createDebtReminder} from "../../redux/actions/debt.action";
import {useHistory} from "react-router";
import useInputRequire from "../../utils/useInputRequire";
import {getPaymentAcc} from "../../redux/actions/account.action";

const CreateDebt = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const senderInfo = useSelector(state => state.PaymentAcc.data);
  const AccName = useSelector((state) => state.AccName);
  const CreateDebt = useSelector((state) => state.CreateDebt);
  const accountNum = useInputRequire({
    value: "",
    valid: false,
    invalid: false,
    inValidMsg: ""
  });
  const name = useInputChange("");
  const money = useInputChange(0);
  const message = useInputChange("");
  const alertToggle = useToggle(false)
  const [timeCounter, setTimeCounter] = useState(2);
  const owner = useInputChange("");

  const countDown = useCallback((i) => {
    let int = setInterval(function () {
      setTimeCounter(i)
      i-- || clearInterval(int);
    }, 1000);
  }, [])


  const onBlurAccountNum = useCallback(() => {
    if (accountNum.value === "") {
      accountNum.setInValid(true)
      accountNum.setInValidMsg("Không được để trống")
      return false;
    }
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      query: accountNum.value
    }
    dispatch(getAccName(data, accessToken))
        .then((response) => {
          console.log("success response", response)
          name.setValue(response.account.name)
          accountNum.setValue(response.account.account_num)
          accountNum.setValid(true)
          accountNum.setInValid(false)
          accountNum.setInValidMsg("")
        })
        .catch((err) => {
          console.log(err)
          accountNum.setInValid(true)
          accountNum.setInValidMsg("Không tìm thấy số tài khoản hoặc username trên")
          accountNum.setValue("")
        })

  }, [accountNum, dispatch, name]);

  const createDept = useCallback((e) => {
    e.preventDefault();
    if (accountNum.value === "") {
      accountNum.setInValid(true)
      accountNum.setInValidMsg("Vui lòng nhập lại số tài khoản")
      return;
    }
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      ownerId: uid,
      accountNum: accountNum.value,
      money: money.value,
      message: message.value,
      datetime: new Date(),
      ownerAccount: owner.value,
    }
    console.log(data);
    dispatch(createDebtReminder(data, accessToken))
        .then((response) => {
          console.log(response);
          alertToggle.setActive()
          countDown(2)
          setTimeout(() => {
            history.push("/debt")
          }, 2000)
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, accountNum, money, owner, message, alertToggle, countDown, history]);

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    let uid = localStorage.getItem('uid');
    dispatch(getPaymentAcc(uid, accessToken))
        .then((response) => {
          owner.setValue(response.account[0].account_num)
        })
        .catch((e) => {
          console.log(e);
        });
  }, [dispatch, owner])


  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={6} className={"mx-auto"}>
              <Card>
                <div className="card-body">
                  <CardTitle>
                    <h3 className="text-center">TẠO NHẮC NỢ</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={createDept}>
                    <h4>1. Tài khoản thanht toán nợ</h4>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Tài khoản</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select"
                               onChange={owner.onChange}
                               name="sender"
                               id="sender"
                               value={owner.value || ""}>
                          {senderInfo.account && senderInfo.account.map((item, index) => {
                            return (<option
                                key={index}
                                value={item.account_num}>{(`Thanh toán ${index + 1} (${item.account_num})`)}
                            </option>)
                          })}
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <h4>2. Tài khoản trả nợ</h4>
                    <FormGroup>
                      <Label for="accountNum">Tìm kiếm số tài khoản hoặc username</Label>
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
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Họ và tên</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="name"
                               disabled={true}
                               value={name.value || ""}/>
                      </InputGroup>
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                      <Label for="money">Số tiền <ShowRequire/></Label>
                      <Input type="number" name="money" id="money"
                             onChange={money.onChange}
                             value={money.value}
                             required/>
                    </FormGroup>

                    <FormGroup>
                      <Label for="message">Nội dung nhắc nợ</Label>
                      <Input type="textarea" name="message"
                             value={message.value}
                             onChange={message.onChange}
                             id="message"/>
                    </FormGroup>
                  </Form>
                  <hr/>
                  <Alert color="success"
                         isOpen={alertToggle.active}
                  >
                    Đã tạo nhắc nhở thành công<br/>
                    Sẽ chuyển đến trang quản lý nhắc nợ trong <strong>{timeCounter}s</strong> nữa
                  </Alert>
                  <Button id="btnTransferLocal"
                          type="submit"
                          color={"success"}
                          size={"lg"}
                          block={true}
                          className="d-flex align-items-center justify-content-center"
                          onClick={createDept}
                          disabled={CreateDebt.isLoading}
                  >
                        <span style={{marginLeft: "40px"}}>
                    {(CreateDebt.isLoading ? <Spinner color="light"
                                                      size={"sm"} role="status"
                                                      aria-hidden="true"/> : "")}
                  </span>
                    <span>Tạo nhắc nợ</span>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  );
};

export default CreateDebt;