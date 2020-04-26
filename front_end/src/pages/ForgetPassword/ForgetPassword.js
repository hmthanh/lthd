import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
} from "reactstrap";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import useInputRequire from "../../utils/useInputRequire";
import useToggle from "../../utils/useToggle";
import MessageBox from "../../components/Modal/MessageBox";
import {forgetPwd} from "../../redux/creators/forgetPwdCreator";
import {validEmail} from "../../utils/utils";

const FogetPassword = () => {
  const dispatch = useDispatch();
  const forgetPwdInfo = useSelector(state => {
    return state.ForgetPassword
  });
  const msgBoxToggle = useToggle(false);
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const email = useInputRequire({value: "", valid: false, invalid: false});

  function handleSubmit(e) {
    e.preventDefault();
    if (!validEmail(email.value)) {
      email.setInValid(true);
      email.setInValidMsg("Email không đúng định dạng");
      return;
    }
    dispatch(forgetPwd())
        .then((response) => {
          console.log(response);
          let title = "Đã gửi email thành công";
          let content = "Vui lòng kiểm tra email để đăng nhập bằng mật khẩu mới";
          showMsgBox(title, content);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  const showMsgBox = useCallback((title, content) => {
    setTitleMsg(title);
    setContentMsg(content);
    msgBoxToggle.setActive();
  }, [setTitleMsg, setContentMsg, msgBoxToggle]);

  return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="card-group mb-0">
              <Card className="card p-4">
                <div className="card-block">
                  <CardTitle>
                    <h3 className="text-center">QUÊN MẬT KHẨU</h3>
                  </CardTitle>

                  <Form method="post" noValidate="validated"
                        className="needs-validation" onSubmit={handleSubmit}>
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

                    <Button type="submit"
                            color={"success"}
                            size={"md"}
                            block={true}
                            className="d-flex align-items-center justify-content-center"
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
            </div>
          </Col>
        </Row>
        <MessageBox
            isOpen={msgBoxToggle.active}
            onClose={msgBoxToggle.setInActive}
            title={titleMsg}
            content={contentMsg}
        ></MessageBox>
      </Container>
  );
};

export default FogetPassword;