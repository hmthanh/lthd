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
import {verifyPassword} from '../../redux/creators/changePasswordCreator'
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import useToggle from "../../utils/useToggle";
import useInputRequire from "../../utils/useInputRequire";
import {useHistory} from "react-router";
import {logout} from "../../redux/creators/loginCreator";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const changePassword = useSelector(state => {
    return state.ChangePassword
  });
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
      oldPwd: pwdOld.value,
      newPw1: pwdNew.value,
      newPw2: pwdRepeat.value
    }
    dispatch(verifyPassword(data, accessToken))
        .then((response) => {
          console.log(response);
          alertToggle.setActive()
          countDown(3)
          setTimeout(() => {
            history.push("/logout")
          }, 3000)
        })
        .catch((err) => {
          console.log(err);
        });
    // this.props.verifyPassword(uid, values.oldpassword, v
    // alues.password1, values.password2).then(() => {
    //   if (this.props.ChangePassword.data.authenticated) {
    //     console.log("authen OTP and submit .... ")
    //     this.setState({
    //       modal: !this.state.modal,
    //       pwd: values.password1
    //     })
    //   }
    //   })
    // }
  }

  // toggle() {
  //   this.setState({modal: !this.state.modal})
  // }

  // handleSubmitOTP(values) {
  //   console.log(values)
  //   let uid = localStorage.getItem('uid')
  //   this.props.changepwd(uid, this.state.pwd, values.otp)
  // };

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


                  {/*<LocalForm onSubmit={(values) => this.handleSubmit(values)}>*/}
                  {/*  <div className='form-group'>*/}
                  {/*    <label htmlFor='password1'>Mật Khẩu Mới</label>*/}
                  {/*    <Control.password model='.password1' id='password1' name='password1'*/}
                  {/*                      className='form-control' rows='6' autoComplete='off'*/}
                  {/*                      validators={{required}}/>*/}
                  {/*    <Errors className='text-danger' model='.password1' show="touched"*/}
                  {/*            messages={{required: 'Required'}}/>*/}
                  {/*  </div>*/}
                  {/*  <div className='form-group'>*/}
                  {/*    <label htmlFor='password2'>Nhập Lại Mật Khẩu Mới</label>*/}
                  {/*    <Control.password model='.password2' id='password2' name='password1'*/}
                  {/*                      className='form-control' rows='6' autoComplete='off'*/}
                  {/*                      validators={{required}}/>*/}
                  {/*    <Errors className='text-danger' model='.password2' show="touched"*/}
                  {/*            messages={{required: 'Required'}}/>*/}
                  {/*  </div>*/}
                  {/*  <div className='form-group'>*/}
                  {/*    <label htmlFor='oldpassword'>Mật Khẩu Cũ</label>*/}
                  {/*    <Control.password model='.oldpassword' id='oldpassword' name='oldpassword'*/}
                  {/*                      className='form-control' rows='6' autoComplete='off'*/}
                  {/*                      validators={{required}}/>*/}
                  {/*    <Errors className='text-danger' model='.oldpassword' show="touched"*/}
                  {/*            messages={{required: 'Required'}}/>*/}
                  {/*  </div>*/}
                  {/*  {*/}
                  {/*    this.props.ChangePassword.errMess &&*/}
                  {/*    <Alert color="danger">*/}
                  {/*      {this.props.ChangePassword.errMess}*/}
                  {/*    </Alert>*/}
                  {/*  }*/}
                  {/*  <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>*/}

                  {/*</LocalForm>*/}
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        {/*<Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>*/}
        {/*  <ModalHeader toggle={this.toggle}>Mã OTP</ModalHeader>*/}
        {/*  <LocalForm id='confirm-otp' onSubmit={(values) => this.handleSubmitOTP(values)} autoComplete="off">*/}
        {/*    <ModalBody>*/}
        {/*      <div className='form-group'>*/}
        {/*        <label htmlFor='otp'>Số tài Khoản</label>*/}
        {/*        <Control.text model='.otp' id='otp' name='otp' className='form-control' autoComplete='off'*/}
        {/*                      validators={{required}}/>*/}
        {/*        <Errors className='text-danger' model='.otp' show="touched"*/}
        {/*                messages={{required: 'Required'}}/>*/}
        {/*      </div>*/}
        {/*      {*/}
        {/*        this.props.ChangePassword.errMess &&*/}
        {/*        <Alert color="danger">*/}
        {/*          {'Sai OTP'}*/}
        {/*        </Alert>*/}
        {/*      }*/}
        {/*    </ModalBody>*/}
        {/*    <ModalFooter>*/}
        {/*      <button type="submit" className="btn btn-primary">Đồng ý</button>*/}
        {/*    </ModalFooter>*/}
        {/*  </LocalForm>*/}
        {/*</Modal>*/}
      </Container>
  );
}

// const mapDispatchToProps = dispatch => ({
//   changepwd: (uId, newPw1, OTP) => dispatch(changepwd(uId, newPw1, OTP)),
//   verifyPassword: (uId, oldPwd, newPw1, newPw2) => dispatch(verifyPassword(uId, oldPwd, newPw1, newPw2))
//   // login: (userName, password) => dispatch(login({userName, password})),
// });
//
// const mapStateToProps = (state) => {
//   return {
//     ChangePassword: state.ChangePassword,
//   }
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

export default ChangePassword;