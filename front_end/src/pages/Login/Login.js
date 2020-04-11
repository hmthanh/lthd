import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
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
  Label,
  Row,
  Spinner
} from 'reactstrap'
import {login} from '../../redux/creators/loginCreator'
import ReCAPTCHA from "react-google-recaptcha";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import useInputRequire from "../../utils/useInputRequire";
import {useHistory} from 'react-router-dom';
import {AuthAdmin, AuthCustomer, AuthEmployee, AuthFailed} from "../../redux/creators/authCreator";
import {required} from "../../utils/utils";

const recaptchaRef = React.createRef();

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const LoginInfo = useSelector(state => {
    return state.LoginInfo;
  });
  const username = useInputRequire({value: "", valid: false, invalid: false});
  const password = useInputRequire({value: "", valid: false, invalid: false, inValidMsg: ""});

  function handleSubmit(e) {
    e.preventDefault();
    if (!required(username.value)) {
      username.setInValid(true);
      username.setInValidMsg("Không được để trống");
      return;
    }
    if (!required(password.value)) {
      password.setInValid(true);
      password.setInValidMsg("Không được để trống");
      return;
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
              let {errcode} = response;
              dispatch(AuthFailed());
              username.setInValidMsg("");
              if (errcode === -200) {
                password.setInValidMsg("Tài khoản không tồn tại");
              } else if (errcode === -201) {
                password.setInValidMsg("Mật khẩu không đúng");
              } else if (errcode === -202) {
                password.setInValidMsg("Tài khoản không hoạt động");
              } else {
                password.setInValidMsg("Đăng nhập không thành công");
              }
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

  return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="card-group mb-0">
              <Card className="card p-4">
                <div className="card-block">
                  <CardTitle>
                    <h3 className="text-center">ĐĂNG NHẬP</h3>
                  </CardTitle>

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
                  </Form>
                  {/*<LocalForm onSubmit={(values) => handleSubmit(values)}>*/}
                  {/*  <div className='form-group'>*/}
                  {/*    <label htmlFor='userName'>Your Account</label>*/}
                  {/*    <Control.text model='.userName' id='userName' name='userName'*/}
                  {/*                  className='form-control' autoComplete='off'*/}
                  {/*                  validators={{required}}/>*/}
                  {/*    <Errors className='text-danger' model='.userName' show="touched"*/}
                  {/*            messages={{required: 'Required'}}/>*/}
                  {/*  </div>*/}
                  {/*  <div className='form-group'>*/}
                  {/*    <label htmlFor='password'>Password</label>*/}
                  {/*    <Control.password model='.password' id='password' name='password'*/}
                  {/*                      className='form-control' rows='6' autoComplete='off'*/}
                  {/*                      validators={{required}}/>*/}
                  {/*    <Errors className='text-danger' model='.password' show="touched"*/}
                  {/*            messages={{required: 'Required'}}/>*/}
                  {/*  </div>*/}

                  {/*  <Button*/}
                  {/*      type="submit"*/}
                  {/*      className="btn btn-primary"*/}
                  {/*      color={"primary"}*/}
                  {/*      style={{padding: "5px 100px", marginTop: "10px"}}>*/}
                  {/*    <span>Login</span>*/}
                  {/*  </Button>*/}
                  {/*</LocalForm>*/}
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default LoginPage;