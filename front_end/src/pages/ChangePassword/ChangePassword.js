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
} from 'reactstrap'
import {verifyPassword} from '../../redux/actions/changePassword'
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import useToggle from "../../utils/useToggle";
import useInputRequire from "../../utils/useInputRequire";
import {useHistory} from "react-router";
import ModalVerifyPwd from "../../components/Modal/ModalVerifyPwd";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const changePassword = useSelector(state => {
    return state.ChangePassword
  });
  const [verifyPwdData, setVerifyPwdData] = useState({});
  const showVerifyToggle = useToggle(false);
  const alertToggle = useToggle(false)
  const [timeCounter, setTimeCounter] = useState(4);
  const pwdOld = useInputRequire({value: "", invalidMsg: "Không được để trống"});
  const pwdNew = useInputRequire({value: "", invalidMsg: "Không được để trống"});
  const pwdRepeat = useInputRequire({value: "", invalidMsg: "Không được để trống"});

  const countDown = useCallback((i) => {
    let int = setInterval(function () {
      setTimeCounter(i)
      i-- || clearInterval(int);
    }, 1000);
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (pwdOld.value === "") {
      pwdOld.setInValid(true)
      pwdOld.setInValidMsg("Không được để trống");
      return;
    }
    if (pwdNew.value === "") {
      pwdNew.setInValid(true);
      pwdNew.setInValidMsg("Không được để trống");
      return;
    }
    if (pwdRepeat.value === "") {
      pwdRepeat.setInValid(true)
      pwdRepeat.setInValidMsg("Không được để trống");
      return;
    }
    if (pwdNew.value !== pwdRepeat.value) {
      pwdRepeat.setInValid(true)
      pwdRepeat.setInValidMsg("Hai mật khẩu mới không giống nhau");
      return;
    }
    let uid = localStorage.getItem('uid')
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      uId: uid,
      oldPwd: pwdOld.value
    }
    dispatch(verifyPassword(data, accessToken))
        .then((response) => {
          console.log(response);
          if (response.authenticated) {
            setVerifyPwdData({
              uId: uid,
              newPwd: pwdNew.value,
            });
            showVerifyToggle.setActive();
          } else {
            pwdOld.setValue("");
            pwdOld.setInValid(true);
            pwdOld.setInValidMsg("Mật khẩu cũ không đúng !");
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }


  function onVerifySuccess() {
    alertToggle.setActive()
    countDown(3)
    setTimeout(() => {
      history.push("/logout")
    }, 3000)
  }

  return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <CardGroup className="mb-0">
              <Card className="card p-4">
                <div className="card-block">
                  <CardTitle>
                    <h3 className="text-center">ĐỔI MẬT KHẨU</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="validated"
                        className="needs-validation" onSubmit={handleSubmit}>
                    <h4>Vui lòng nhâp mật khẩu</h4>
                    <FormGroup>
                      <Label for="username">Mật khẩu cũ <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <Input type="password"
                               name="password"
                               onChange={pwdOld.onChange}
                               value={pwdOld.value}
                               valid={pwdOld.valid}
                               invalid={pwdOld.invalid}
                               onBlur={pwdOld.onBlur}
                        />
                        <FormFeedback>{pwdOld.inValidMsg}</FormFeedback>
                      </InputGroup>
                    </FormGroup>
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
                            disabled={changePassword.isLoading}
                    >
                      <span style={{marginRight: "10px"}}>
                        {(changePassword.isLoading ? <Spinner color="light"
                                                              size={"sm"} role="status"
                                                              aria-hidden="true"/> : "")}
                      </span>
                      <span>Đổi mật khẩu</span>
                    </Button>
                  </Form>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>

        <ModalVerifyPwd
            isShow={showVerifyToggle.active}
            verifyPwdData={verifyPwdData}
            onClose={showVerifyToggle.setInActive}
            onVerifySuccess={onVerifySuccess}
        ></ModalVerifyPwd>

      </Container>
  );
}

export default ChangePassword;