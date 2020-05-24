import React, {useCallback, useState} from 'react';
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
import {getAccName} from "../../redux/creators/transferCreator";
import {useDispatch, useSelector} from "react-redux";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {Create} from "../../redux/creators/debtCreator";
import {useHistory} from "react-router";

const CreateReceiver = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const CreateDebt = useSelector((state) => {
    return state.CreateDebt
  });
  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange("");
  const money = useInputChange(0);
  const message = useInputChange("");
  const alertToggle = useToggle(false)
  const [timeCounter, setTimeCounter] = useState(2);

  const countDown = useCallback((i) => {
    let int = setInterval(function () {
      setTimeCounter(i)
      i-- || clearInterval(int);
    }, 1000);
  }, [])

  const onChangeAccountNum = useCallback((e) => {
    setAccountNum(e.target.value);
  }, [setAccountNum])

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

  const createReceive = useCallback((e) => {
    e.preventDefault();
    if (accountNum === "") {
      setAccInValid(true)
      setAccInValidMsg("Vui lòng nhập lại số tài khoản")
      return;
    }
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      ownerId: uid,
      accountNum: accountNum,
      money: money.value,
      message: message.value,
      datetime: new Date(),
    }
    console.log(data);
    dispatch(Create(data, accessToken))
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
  }, [dispatch, accountNum, money, message, alertToggle, countDown, history]);


  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={5} className={"mx-auto"}>
              <Card id="localBank">
                <div className="card-body">
                  <CardTitle>
                    <h3 className="text-center">TẠO NGƯỜI NHẬN</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={createReceive}>
                    <Label for="accountNum">Thông tin tài khoản <ShowRequire/></Label>
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
                          onClick={createReceive}
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

export default CreateReceiver;