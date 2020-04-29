import React, {Component, useCallback, useState} from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {Control, Errors, LocalForm} from 'react-redux-form'
import {checkValue, isNumber, isNumberText, required, requiredText, validEmail, validEmailText} from '../../utils/utils'
import DatePicker from 'react-datepicker'
import {backRegister, register} from '../../redux/creators/registerCreator'
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

import 'react-datepicker/dist/react-datepicker.css'
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {useHistory} from "react-router-dom";
import useInputRequire from "../../utils/useInputRequire";
import useToggle from "../../utils/useToggle";


const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const registerInfo = useSelector(state => {
    return state.Register;
  });
  const name = useInputRequire({value: "", valid: false, invalid: false, inValidMsg: ""});
  const email = useInputRequire({value: "", valid: false, invalid: false, inValidMsg: ""});
  const phone = useInputRequire({value: "", valid: false, invalid: false, inValidMsg: ""});
  const [dob, setDOB] = useState(new Date(2000, 0, 1));
  const alertToggle = useToggle(false);
  const [timeCounter, setTimeCounter] = useState(4);


  function onChangeDOB(date) {
    setDOB(date);
    return setDOB(date);
  }

  const countDown = useCallback((i) => {
    let int = setInterval(function () {
      setTimeCounter(i)
      i-- || clearInterval(int);  //if i is 0, then stop the interval
    }, 1000);
  }, [setTimeCounter, timeCounter])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (checkValue(name) || checkValue(email) || checkValue(phone)) {
      return false
    }
    let date_of_birth = dob.getDate() + '-' + (dob.getMonth() + 1) + '-' + dob.getFullYear();
    let data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      date_of_birth: date_of_birth
    }
    console.log("data", data)
    dispatch(register(data))
        .then((response) => {
          console.log(response)
          alertToggle.setActive()
          countDown(3)
          setTimeout(() => {
            history.push("/login")
          }, 3000)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [dispatch, alertToggle, setTimeCounter, name, email, phone, dob])

  return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <CardGroup className="mb-0">
              <Card className="card p-4">
                <div className="card-block">
                  <CardTitle>
                    <h3 className="text-center">ĐĂNG KÝ</h3>
                  </CardTitle>

                  <Form method="post" noValidate="validated"
                        className="needs-validation" onSubmit={handleSubmit}>
                    <h4>Thông tin đăng nhập</h4>
                    <FormGroup>
                      <Label for="name">Họ và tên <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <Input type="text"
                               name="name"
                               id="name"
                               onChange={name.onChange}
                               value={name.value}
                               valid={name.valid}
                               invalid={name.invalid}
                               onBlur={name.onBlur}
                        />
                        <FormFeedback>{name.inValidMsg}</FormFeedback>
                      </InputGroup>
                      <Label for="email">Email <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <Input type="email"
                               name="email"
                               id="email"
                               onChange={email.onChange}
                               value={email.value}
                               valid={email.valid}
                               invalid={email.invalid}
                               onBlur={email.onBlur}
                        />
                        <FormFeedback>{email.inValidMsg}</FormFeedback>
                      </InputGroup>
                      <Label for="phone">Số điện thoại <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <Input type="text"
                               name="phone"
                               id="phone"
                               onChange={phone.onChange}
                               value={phone.value}
                               valid={phone.valid}
                               invalid={phone.invalid}
                               onBlur={phone.onBlur}
                        />
                        <FormFeedback>{phone.inValidMsg}</FormFeedback>
                      </InputGroup>
                      <Label for="dob">Ngày sinh <ShowRequire/></Label>
                      <InputGroup className="mb-2">
                        <DatePicker className='form-control'
                                    style={{width: "100%", color: "red"}}
                                    selected={dob}
                                    dateFormat='dd/MM/yyyy'
                                    onChange={onChangeDOB}/>
                      </InputGroup>
                    </FormGroup>
                    <hr/>
                    <Alert color="success"
                           isOpen={alertToggle.active}
                    >
                      Đã tạo tài khoản thành công<br/>
                      Sẽ chuyển đến trang đăng nhập trong <strong>{timeCounter}s</strong> nữa
                    </Alert>
                    <Button id="btnTransferLocal"
                            type="submit"
                            color={"success"}
                            size={"md"}
                            block={true}
                            className="d-flex align-items-center justify-content-center"
                            disabled={registerInfo.isLoading}
                    >
                        <span style={{marginRight: "10px"}}>
                          {(registerInfo.isLoading ? <Spinner color="light"
                                                              size={"sm"} role="status"
                                                              aria-hidden="true"/> : "")}
                        </span>
                      <span>Đăng Ký</span>
                    </Button>
                  </Form>

                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
  )
}
export default Register