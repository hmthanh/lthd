import React, {useCallback, useState} from 'react';
import {
  Alert,
  Button,
  Card,
  CardTitle,
  Col, Collapse,
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
import useInputRequire from "../../utils/useInputRequire";

const CreateReceiver = ({isOpen}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const CreateDebt = useSelector((state) => {
    return state.CreateDebt
  });
  // const [accountNum, setAccountNum] = useState("");
  const accountNum = useInputRequire({})
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange("");
  const alias = useInputChange("");

  const onChangeAccountNum = useCallback((e) => {
    accountNum.setValue(e.target.value);
  }, [accountNum])

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

  const createReceive = useCallback((e) => {
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
      message: alias.value,
      datetime: new Date(),
    }
    console.log(data);
    dispatch(Create(data, accessToken))
        .then((response) => {
          console.log(response);
          history.push("/debt");
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, accountNum, alias, history]);


  return (
      <Collapse isOpen={isOpen}>
        <Row>
          <Col xs={12} sm={8} md={6} lg={6} className={"mx-auto"}>
            <Card>
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
                             onChange={accountNum.onChange}
                             value={accountNum.value}
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
                             value={name.value}/>
                    </InputGroup>
                  </FormGroup>
                  <hr/>
                  <FormGroup>
                    <Label for="alias">Tên gợi nhớ</Label>
                    <Input type="textarea" name="message"
                           value={alias.value}
                           onChange={alias.onChange}
                           id="alias"/>
                  </FormGroup>
                </Form>
                <hr/>
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
                  <span>Tạo người nhận</span>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Collapse>
  )

};

export default CreateReceiver;