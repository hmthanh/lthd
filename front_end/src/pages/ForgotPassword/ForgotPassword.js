import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  Button,
  Card,
  CardGroup,
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
  Row,
  Spinner
} from "reactstrap";
import useInputRequire from "../../utils/useInputRequire";
import useToggle from "../../utils/useToggle";
// import MessageBox from "../../components/Modal/MessageBox";
import {forgetPwd} from "../../redux/actions/forgetPwd.action";
import ModalVerifyForget from "./ModalVerifyForget";
import {useHistory} from "react-router";
import {getAccName} from "../../redux/actions/transfer.action";

const FogetPassword = () => {
  const dispatch = useDispatch();
  const forgetPwdInfo = useSelector(state => {
    return state.ForgetPassword
  });
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const history = useHistory();
  // const msgBoxToggle = useToggle(false);
  // const [titleMsg, setTitleMsg] = useState("");
  // const [contentMsg, setContentMsg] = useState("");
  const username = useInputRequire({value: "", valid: false, invalid: false});
  const name = useInputRequire({value: "", valid: false, invalid: false});
  const showVerifyToggle = useToggle(false);
  const [verifyPwdData, setVerifyPwdData] = useState({});
  const alertToggle = useToggle(false);
  const [timeCounter, setTimeCounter] = useState(4);

  const handleForgotPwd = useCallback((e) => {
    e.preventDefault();
    if (!username.value) {
      username.setInValid(true);
      username.setInValidMsg("Không được để trống");
      return;
    }

    let data = {
      username: username.value
    }
    console.log(data);
    dispatch(forgetPwd(data))
        .then((response) => {
          setVerifyPwdData(response.uid);
          showVerifyToggle.setActive();
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [dispatch, username, showVerifyToggle]);

  const countDown = useCallback((i) => {
    let int = setInterval(function () {
      setTimeCounter(i)
      i-- || clearInterval(int);
    }, 1000);
  }, [])

  function onVerifySuccess() {
    alertToggle.setActive()
    countDown(3)
    setTimeout(() => {
      history.push("/logout")
    }, 3000)
  }

  //
  // const showMsgBox = useCallback((title, content) => {
  //   setTitleMsg(title);
  //   setContentMsg(content);
  //   msgBoxToggle.setActive();
  // }, [setTitleMsg, setContentMsg, msgBoxToggle]);

  const onBlurUsername = useCallback(() => {
    if (username.value === "") {
      username.setInValid(true)
      username.setInValidMsg("Không được để trống")
      return false;
    }

    let accessToken = localStorage.getItem('accessToken')

    let data = {
      query: username.value,
      partner: 0
    }
    dispatch(getAccName(data, accessToken))
        .then((response) => {
          name.setValue(response.account.name)
          username.setValue(response.account.user_name)
          username.setValid(true)
          username.setInValid(false)
          username.setInValidMsg("")
        })
        .catch((err) => {
          console.log(err)
          username.setInValid(true)
          username.setInValidMsg("Không tìm thấy số tài khoản hoặc username trên")
          username.setValue("")
        })

  }, [dispatch, username, name]);


  return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <CardGroup className=" mb-0">
              <Card className="card p-4">
                <div className="card-block">
                  <CardTitle>
                    <h3 className="text-center">QUÊN MẬT KHẨU</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="validated"
                        className="needs-validation" onSubmit={handleForgotPwd}>
                    <h4>Thông tin tài khoản</h4>
                    {/*<FormGroup>*/}
                    {/*  <Label for="username">Email hoặc số tài khoản <ShowRequire/></Label>*/}
                    {/*  <InputGroup className="mb-2">*/}
                    {/*    <Input type="text"*/}
                    {/*           name="username"*/}
                    {/*           id="username"*/}
                    {/*           placeholder="abc@gmail.com"*/}
                    {/*           onChange={username.onChange}*/}
                    {/*           value={username.value}*/}
                    {/*           valid={username.valid}*/}
                    {/*           invalid={username.invalid}*/}
                    {/*           onBlur={username.onBlur}*/}
                    {/*    />*/}
                    {/*    <FormFeedback>{username.inValidMsg}</FormFeedback>*/}
                    {/*  </InputGroup>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>username</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"
                               name="username"
                               id="username"
                               onChange={username.onChange}
                               value={username.value}
                               onBlur={onBlurUsername}
                               invalid={username.invalid}
                               valid={username.valid}
                               placeholder="Nhập số tài khoản hoặc username"/>
                        {
                          AccName.isLoading ? (<InputGroupAddon addonType="prepend">
                            <InputGroupText><Spinner color="primary"
                                                     size={"sm"} role="status"
                                                     aria-hidden="true"/></InputGroupText>
                          </InputGroupAddon>) : ""
                        }
                        <FormFeedback>{username.inValidMsg}</FormFeedback>
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
                    <Alert color="success"
                           isOpen={alertToggle.active}
                    >
                      Đã đổi mật khẩu thành công<br/>
                      Sẽ chuyển đến trang đăng nhập trong <strong>{timeCounter}s</strong> nữa
                    </Alert>
                    <Button type="submit"
                            color={"success"}
                            size={"md"}
                            block={true}
                            className="d-flex align-items-center justify-content-center"
                            onClick={handleForgotPwd}
                            disabled={forgetPwdInfo.isLoading}
                    >
                        <span style={{marginRight: "10px"}}>
                          {(forgetPwdInfo.isLoading ? <Spinner color="light"
                                                               size={"sm"} role="status"
                                                               aria-hidden="true"/> : "")}
                        </span>
                      <span>Quên mật khẩu</span>
                    </Button>
                  </Form>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        {/*<MessageBox*/}
        {/*    isOpen={msgBoxToggle.active}*/}
        {/*    onClose={msgBoxToggle.setInActive}*/}
        {/*    title={titleMsg}*/}
        {/*    content={contentMsg}*/}
        {/*></MessageBox>*/}
        <ModalVerifyForget
            isShow={showVerifyToggle.active}
            verifyPwdData={verifyPwdData}
            onClose={showVerifyToggle.setInActive}
            onVerifySuccess={onVerifySuccess}
        ></ModalVerifyForget>
      </Container>
  );
};

export default FogetPassword;