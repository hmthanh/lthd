import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Alert,
  Button,
  Card, CardGroup,
  CardTitle,
  Col, Collapse,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
  Spinner
} from 'reactstrap'
import {activeAccount, login} from '../../redux/actions/login.action'
import ReCAPTCHA from "react-google-recaptcha";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import useInputRequire from "../../utils/useInputRequire";
import {Link, useHistory} from 'react-router-dom';
import {AuthAdmin, AuthCustomer, AuthEmployee, AuthFailed} from "../../redux/actions/auth.action";
import {checkValue} from "../../utils/utils";
import useToggle from "../../utils/useToggle";

const recaptchaRef = React.createRef();

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const LoginInfo = useSelector(state => {
    return state.LoginInfo;
  });
  const ActiveAccount = useSelector(state => {
    return state.ActiveAccount;
  });

  const username = useInputRequire({value: "", valid: false, invalid: false, inValidMsg: ""});
  const password = useInputRequire({value: "", valid: false, invalid: false, inValidMsg: ""});
  const activeAccountToggle = useToggle(false);
  const alertToggle = useToggle(false);
  const [userId, setUserId] = useState(0);
  const pwdNew = useInputRequire({value: "", invalidMsg: "Không được để trống"});
  const pwdRepeat = useInputRequire({value: "", invalidMsg: "Không được để trống"});

  function handleSubmit(e) {
    e.preventDefault();
    if (checkValue(username) || checkValue(password)) {
      return false;
    }

    let recaptcha = recaptchaRef.current.getValue();
    if (recaptcha) {
      let data = {
        username: username.value,
        password: password.value
      };
      dispatch(login(data))
          .then((response) => {
            if (response.authenticated) {
              let {accessToken, refreshToken, user} = response;
              username.setValid(true);
              password.setValid(true);
              localStorage.setItem('uid', user.id.toString());
              localStorage.setItem('role', user.role);
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);

              // dispatch(AuthCustomer());
              if (user.role === 3) {
                dispatch(AuthCustomer());
              } else if (user.role === 2) {
                dispatch(AuthEmployee());
              } else if (user.role === 1) {
                dispatch(AuthAdmin());
              } else {
                dispatch(AuthFailed());
              }
              history.push("/");
            } else {
              console.log(response);

              let {err_code} = response;
              username.setInValid(false);
              password.setInValid(false);
              if (err_code === -200) {
                username.setInValidMsg("Tài khoản không tồn tại");
                password.setValue('');
                username.setInValid(true);
              } else if (err_code === -201) {
                password.setInValidMsg("Mật khẩu không đúng");
                password.setInValid(true);
              } else if (err_code === -202) {
                setUserId(response.id);
                activeAccountToggle.setActive();
                // password.setInValidMsg("Tài khoản không hoạt động");
                // password.setInValid(true);
              } else {
                password.setInValidMsg("Vui lòng kiểm tra lại tài khoản hoặc mật khẩu");
                password.setInValid(true);
              }
              dispatch(AuthFailed());
            }
          })
          .catch((e) => {
            console.log(e);
            password.setInValid(true);
            password.setInValidMsg(e);
          }, [dispatch]);
    } else {
      password.setInValid(true);
      password.setInValidMsg("Vui lòng chọn xác nhận không phải robot");
    }
  }

  const handleActiveAccount = useCallback(() => {
    let data = {
      uid: userId,
      newPwd: pwdNew.value
    }
    dispatch(activeAccount(data))
        .then(response => {
          console.log(response);
          if (response.errorCode === 0) {
            activeAccountToggle.setInActive();
            alertToggle.setActive();
          }
        })
  }, [dispatch, userId, pwdNew, activeAccountToggle, alertToggle])

  return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <CardGroup className=" mb-0">
              <Card className="card p-4">
                <div className="card-block">
                  <Collapse
                      isOpen={!activeAccountToggle.active}>
                    <CardTitle>
                      <h3 className="text-center">ĐĂNG NHẬP</h3>
                    </CardTitle>
                    <hr/>
                    <Form method="post" noValidate="validated"
                          className="needs-validation" onSubmit={handleSubmit}>
                      <h4>Thông tin đăng nhập</h4>
                      <FormGroup>
                        <Label for="username">Tên đăng nhập <ShowRequire/></Label>
                        <InputGroup className="mb-2">
                          <Input type="text"
                                 name="username"
                                 id="username"
                                 placeholder="Username"
                                 onChange={username.onChange}
                                 value={username.value}
                                 valid={username.valid}
                                 invalid={username.invalid}
                                 onBlur={username.onBlur}
                          />
                          <FormFeedback>{username.inValidMsg}</FormFeedback>
                        </InputGroup>
                        <Label for="username">Mật khẩu <ShowRequire/></Label>
                        <InputGroup className="mb-2">
                          <Input type="password"
                                 name="password"
                                 id="password"
                                 placeholder="Password"
                                 onChange={password.onChange}
                                 value={password.value}
                                 valid={password.valid}
                                 invalid={password.invalid}
                                 onBlur={password.onBlur}
                          />
                          <FormFeedback>{password.inValidMsg}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LcPtdwUAAAAAGb2pehug_-EHNmV5Ywj7d_9gsWn"
                        />
                      </FormGroup>
                      <hr/>
                      <Alert isOpen={alertToggle.active} toggle={alertToggle.toggle}>
                        <h6>Đã kích hoạt tài khoản thành công</h6>
                        <hr/>
                        <p>Bạn có thể đăng nhập với mật khẩu mới !</p>
                      </Alert>
                      <Button id="btnTransferLocal"
                              type="submit"
                              color={"success"}
                              size={"md"}
                              block={true}
                              className="d-flex align-items-center justify-content-center"
                              disabled={LoginInfo.isLoading}
                      >
                        <span style={{marginRight: "10px"}}>
                          {(LoginInfo.isLoading ? <Spinner color="light"
                                                           size={"sm"} role="status"
                                                           aria-hidden="true"/> : "")}
                        </span>
                        <span>Đăng Nhập</span>
                      </Button>
                      <Link style={{float: "right", marginTop: "10px"}} to={"/forgot-password"}>Quên mật khẩu</Link>
                    </Form>
                  </Collapse>
                  <Collapse isOpen={activeAccountToggle.active}>
                    <CardTitle>
                      <h3 className="text-center">KÍCH HOẠT TÀI KHOẢN</h3>
                    </CardTitle>
                    <hr/>
                    <FormGroup>
                      <Label for="username">Mật khẩu mới <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <Input type="password"
                               name="password"
                               onChange={pwdNew.onChange}
                               value={pwdNew.value}
                               valid={pwdNew.valid}
                               invalid={pwdNew.invalid}
                               onBlur={pwdNew.onBlur}
                        />
                        <FormFeedback>{pwdNew.inValidMsg}</FormFeedback>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label for="username">Nhập lại mật khẩu mới <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <Input type="password"
                               name="password"
                               onChange={pwdRepeat.onChange}
                               value={pwdRepeat.value}
                               valid={pwdRepeat.valid}
                               invalid={pwdRepeat.invalid}
                               onBlur={pwdRepeat.onBlur}
                        />
                        <FormFeedback>{pwdRepeat.inValidMsg}</FormFeedback>
                      </InputGroup>
                    </FormGroup>
                    <hr/>
                    <Button
                        type="submit"
                        color={"success"}
                        size={"md"}
                        block={true}
                        className="d-flex align-items-center justify-content-center"
                        onClick={handleActiveAccount}
                        disabled={ActiveAccount.isLoading}
                    >
                        <span style={{marginRight: "10px"}}>
                          {(ActiveAccount.isLoading ? <Spinner color="light"
                                                               size={"sm"} role="status"
                                                               aria-hidden="true"/> : "")}
                        </span>
                      <span>Kích hoạt tài khoản</span>
                    </Button>
                  </Collapse>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
  )

};

export default LoginPage;