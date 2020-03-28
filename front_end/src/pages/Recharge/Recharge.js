import React, {useCallback, useState} from 'react';
import {
  Badge,
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Form,
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
import MessageBox from "../../components/Modal/MessageBox";
import {recharge} from "../../redux/creators/rechargeCreator";
import useToggle from "../../utils/useToggle";

const Recharge = () => {
  const dispatch = useDispatch();
  const successModalToggle = useToggle();
  const rechargeSelector = useSelector((state) => {
    return state.RechargeInfo;
  });
  const [numberAccount, setNumberAccount] = useState(0);
  const [moneyTransfer, setMoneyTransfer] = useState(0);

  const titleMessage = ["", "Nạp tiền thất bại", "Nạp tiền thành công"];
  const contentMessage = ["", "Đã xảy ra lỗi\nVui lòng kiểm tra lại", "Đã nạp tiền vào tài khoản thành công"];

  function changeNumberAccount(e) {
    setNumberAccount(e.target.value);
  }

  function changeMoneyTransfer(e) {
    setMoneyTransfer(e.target.value);
  }

  const onRecharge = useCallback((numberAccount, moneyTransfer) => {
    let data = {
      "account_num": numberAccount,
      "money": moneyTransfer
    };
    let accessToken = localStorage.getItem('accessToken');
    dispatch(recharge(data, accessToken))
        .then(() => {
          successModalToggle.setActive();
        })
        .catch(() => {
          successModalToggle.setActive();
        });
  }, [dispatch, successModalToggle]);

  function submitRecharge(e) {
    e.preventDefault();
  }

  function showFieldRequire() {
    return <Badge color="danger" pill>Yêu cầu</Badge>
  }

  return (
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={5} className={"mx-auto"}>
              <Card id="localBank">
                <div className="card-body">
                  <CardTitle>
                    <h3 className="text-center">NẠP TIỀN TÀI KHOẢN</h3>
                  </CardTitle>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={submitRecharge}>
                    <h4>1. Thông tin tài khoản</h4>

                    <FormGroup>
                      <Label for="numberAccount">Số tài khoản hoặc tên đăng nhập {showFieldRequire()}</Label>
                      <InputGroup className="mb-2">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>Số tài khoản</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="numberAccount" id="numberAccount"
                               onChange={changeNumberAccount}
                               value={numberAccount}
                               placeholder="2343-5928-3472"/>
                      </InputGroup>
                    </FormGroup>

                    <h4>3. Thông tin cần chuyển tiền</h4>
                    <FormGroup>
                      <Label for="moneyTransfer">Số tiền {showFieldRequire()}</Label>
                      <Input type="number" name="moneyTransfer" id="moneyTransfer"
                             onChange={changeMoneyTransfer}
                             value={moneyTransfer}
                             required/>
                    </FormGroup>
                    <div>
                      <Button id="btnRecharge" type="submit" color={"success"}
                              size={"lg"}
                              block={true}
                              className="d-flex align-items-center justify-content-center"
                              disabled={rechargeSelector.isLoading}
                              onClick={() => onRecharge(numberAccount, moneyTransfer)}
                      >
                        {
                          (rechargeSelector.isLoading ? <Spinner color="light"
                                                                 size={"sm"} role="status"
                                                                 aria-hidden="true"/> : "")
                        }
                        {' '}
                        <span style={{marginLeft: "5px"}}>Nạp tiền</span>
                      </Button>
                    </div>
                  </Form>
                  <MessageBox
                      className={""}
                      isOpen={successModalToggle.active}
                      onClose={() => successModalToggle.setInActive()}
                      title={titleMessage[rechargeSelector.statusId]}
                      content={contentMessage[rechargeSelector.statusId]}
                  ></MessageBox>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
  );
};


export default Recharge;
