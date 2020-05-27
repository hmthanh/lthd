import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserTransHistory} from "../../redux/actions/historyTrans.action";
import {Card, CardGroup, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {getInterbank} from "../../redux/actions/transfer.action";
import TableUserTransfer from "../../components/Table/TableUserTransfer";
import Loading from "../../components/Loading";


const HistoryUserTrans = () => {
  const paySelector = [
    {title: "-- Tất cả --", value: 0},
    {title: "Nhập tiền", value: 1},
    {title: "Chuyển tiền", value: 2},
    {title: "Nhắc nợ", value: 4},
  ]
  const dispatch = useDispatch();
  const transHistory = useSelector(state => state.UserTransHistory.data);
  const isLoadingTable = useSelector(state => state.UserTransHistory.isLoading);
  const interBankInfo = useSelector((state) => state.InterBank.data);
  const [banking, setBanking] = useState("0");
  const [payType, setPayType] = useState("0");

  function onChangeBanking(e) {
    setBanking(e.target.value);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    let data = {
      uid: uid,
      partner: parseInt(banking),
      type: parseInt(payType)
    };
    console.log("search value", data);

    dispatch(getUserTransHistory(data, accessToken))
        .then((response) => {
          console.log(response.item);
        })
        .catch(error => {

        })

  }, [dispatch, banking, payType]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getInterbank(accessToken))
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err);
        });
  }, [dispatch])

  const onChangePayType = (e) => {
    setPayType(e.target.value);
  }
  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className="mb-0">
              <Card className="p-6">
                <div className="card-block padding-card">
                  <h3 className="col-centered table-heading">LỊCH SỬ GIAO DỊCH</h3>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation">
                    <h4>Thông tin tìm kiếm</h4>
                    <FormGroup>
                      <Row>
                        <Col xs={6}>
                          <Label for="banking">Ngân hàng</Label>
                          <Input type="select"
                                 value={banking}
                                 onChange={onChangeBanking}
                                 name="banking"
                                 id="banking">
                            <option value={0}>-- Tất cả --</option>
                            {
                              interBankInfo.item &&
                              interBankInfo.item.map((item, index) => {
                                return <option key={index}
                                               value={item.partner_code}>{item.name}</option>
                              })
                            }
                          </Input>
                        </Col>
                        <Col xs={6}>
                          <Label for="payType">Loại giao dịch</Label>
                          <Input type="select"
                                 value={payType}
                                 onChange={onChangePayType}
                                 name="payType"
                                 id="payType">
                            {
                              paySelector &&
                              paySelector.map((item, index) => {
                                return <option key={index} value={item.value}>{item.title}</option>
                              })
                            }
                          </Input>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <div style={{marginTop: "10px"}}></div>
        <Row>
          <Col md={12}>
            <CardGroup>
              <Card>
                <div className="card-body padding-card">
                  <h4>Giao dịch chuyển tiền</h4>
                  {
                    isLoadingTable ? <Loading/> : (<TableUserTransfer data={transHistory}></TableUserTransfer>)
                  }
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
  )
};

export default HistoryUserTrans;