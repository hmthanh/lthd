import React, {useCallback, useEffect, useState} from 'react';
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
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
  Spinner
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import useInputChange from "../../utils/useInputChange";
import "react-datepicker/dist/react-datepicker.css";
import {getAccName} from "../../redux/creators/transferCreator";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {createPayment} from "../../redux/creators/accountCreator";

const CreatePayment = () => {
  const dispatch = useDispatch();
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const paymentTitle = [
    {
      title: "Thanh toán",
      type: 1,
    },
    {
      title: "Tiết kiệm",
      type: 2,
    }
  ];
  // const payType = useInputChange(1);
  const [payType, setPayType] = useState(1);
  const [userId, setUserId] = useState(0);
  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange('');

  const onSelectPayChange = (e) => {
    setPayType(e.target.value);
  }

  const onBlurAccountNum = useCallback(() => {
    if (accountNum === "") {
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
          setUserId(response.account.id);
          name.setValue(response.account.name)
          setAccountNum(response.account.user_name)
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
    if (accountNum === "") {
      setAccInValid(true);
      setAccInValidMsg("Không được để trống")
      return false;
    }

    let data = {
      id: userId,
      type: payType.value
    };
    console.log(data);
    let accessToken = localStorage.getItem('accessToken');
    dispatch(createPayment(data, accessToken))
        .then((response) => {
          if (response.msg === "successfully") {

          }
        })
        .catch((e) => {
          // console.log("error", e);
        });
  }, [dispatch, userId, payType.value, accountNum]);

  // useEffect(() => {
  //   payType.setValue(paymentTitle[0].type);
  // })


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

                    <h5>Thông tin tài khoản <ShowRequire/></h5>
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
                    <h5>Tài khoản thanh toán cần tạo <ShowRequire/></h5>
                    <FormGroup>
                      <Label>Loại tài khoản</Label>
                      <InputGroup>
                        <Input type="select"
                               onChange={onSelectPayChange}
                               name="sender"
                               id="sender"
                               value={payType}>
                          {
                            paymentTitle.map((item, index) => {
                              return (
                                  <option key={index} value={item.type}>{item.title}</option>)
                            })
                          }
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <hr/>
                    <Button id="btnRecharge" type="submit" color={"success"}
                            size={"lg"}
                            block={true}
                            className="d-flex align-items-center justify-content-center"
                            disabled={false}
                            onClick={onCreatePayment}
                    >
                      <span>Tạo thanh toán</span>
                    </Button>
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  )
};

export default CreatePayment;
