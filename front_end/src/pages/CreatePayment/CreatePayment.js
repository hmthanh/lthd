import React, {useCallback, useState} from 'react';
import {
  Badge,
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Form, FormFeedback,
  FormGroup,
  Input,
  InputGroup, InputGroupAddon, InputGroupText,
  Label,
  Row, Spinner
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import useInputChange from "../../utils/useInputChange";
import {createAcc} from "../../redux/creators/accountCreator";
import "react-datepicker/dist/react-datepicker.css";
import {formatFormalDate} from "../../utils/utils";
import useToggle from "../../utils/useToggle";
import {getAccName} from "../../redux/creators/transferCreator";

const CreatePayment = () => {
  const dispatch = useDispatch();
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const messageBoxToggle = useToggle(false);
  const [contentMessage, setContentMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");

  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange('');

  const onBlurAccountNum = useCallback(() => {
    if (accountNum.value === "") {
      setAccInValid(true)
      setAccInValidMsg("Không được để trống")
      return false;
    }
    let accessToken = localStorage.getItem('accessToken')
    let partner_code = '0'
    let data = {
      query: accountNum,
      partner: partner_code
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

  }, [dispatch, accountNum, name]);

  function onChangeAccountNum(e) {
    setAccountNum(e.target.value);
  }

  const onCreatePayment = useCallback((e) => {
    e.preventDefault();
    // let data = {
    //   phone: phone.value,
    //   email: email.value,
    //   name: fullName.value,
    //   date_of_birth: formatFormalDate(dateOfBirth),
    // };
    let accessToken = localStorage.getItem('accessToken');
    // dispatch(createAcc(data, accessToken))
    //     .then((response) => {
    //       if (response.msg === "successfully") {
    //         setTitleMessage("Thành công");
    //         setContentMessage("Đã tạo tài khoản thành công !");
    //         messageBoxToggle.setActive();
    //       }
    //     })
    //     .catch((e) => {
    //       messageBoxToggle.active();
    //       setTitleMessage("Thất bại");
    //       setContentMessage("Đã xảy ra lỗi trong quá trình tạo tài khoản !");
    //       console.log("error", e);
    //     });
  }, [dispatch, accountNum, name]);

  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={5} className={"mx-auto"}>
              <Card id="localBank">
                <div className="card-body">
                  <CardTitle>
                    <h3 className="text-center">TẠO THANH TOÁN</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={onCreatePayment}>

                    <h4>Thông tin cá nhân</h4>
                    <FormGroup>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Username</InputGroupText>
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
                    <Button id="btnRecharge" type="submit" color={"success"}
                            size={"lg"}
                            block={true}
                            className="d-flex align-items-center justify-content-center"
                            disabled={false}>
                      <span>Tạo tài khoản</span>
                    </Button>
                  </Form>
                  <MessageBox
                      isOpen={messageBoxToggle.active}
                      title={titleMessage}
                      content={contentMessage}
                      onClose={messageBoxToggle.setInActive}
                  ></MessageBox>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  )
};

export default CreatePayment;
