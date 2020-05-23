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
  Label,
  Row,
  Spinner
} from "reactstrap";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import useInputRequire from "../../utils/useInputRequire";
import useToggle from "../../utils/useToggle";
// import MessageBox from "../../components/Modal/MessageBox";
import {forgetPwd} from "../../redux/creators/forgetPwdCreator";
import {validEmail} from "../../utils/utils";
import ModalVerifyForget from "./ModalVerifyForget";
import {useHistory} from "react-router";

const FogetPassword = () => {
  const dispatch = useDispatch();
  const forgetPwdInfo = useSelector(state => {
    return state.ForgetPassword
  });
  const history = useHistory();
  // const msgBoxToggle = useToggle(false);
  // const [titleMsg, setTitleMsg] = useState("");
  // const [contentMsg, setContentMsg] = useState("");
  const email = useInputRequire({value: "", valid: false, invalid: false});
  const showVerifyToggle = useToggle(false);
  const [verifyPwdData, setVerifyPwdData] = useState({});
  const alertToggle = useToggle(false);
  const [timeCounter, setTimeCounter] = useState(4);

  const handleForgotPwd = useCallback((e) => {
    e.preventDefault();
    if (!validEmail(email.value)) {
      email.setInValid(true);
      email.setInValidMsg("Email không đúng định dạng");
      return;
    }
    let data = {
      email: email.value
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
  }, [dispatch, email, showVerifyToggle]);

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
                    <h4>Email hoặc số tài khoản</h4>
                    <FormGroup>
                      <Label for="username">Email hoặc số tài khoản <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <Input type="text"
                               name="username"
                               id="username"
                               placeholder="abc@gmail.com"
                               onChange={email.onChange}
                               value={email.value}
                               valid={email.valid}
                               invalid={email.invalid}
                               onBlur={email.onBlur}
                        />
                        <FormFeedback>{email.inValidMsg}</FormFeedback>
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