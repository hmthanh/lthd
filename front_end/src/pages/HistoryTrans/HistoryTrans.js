import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardGroup, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row} from 'reactstrap'
import useToggle from "../../utils/useToggle";
import {getTransHistory} from "../../redux/actions/historyTrans.action";
import TableInfoTransfer from "../../components/Table/TableInfoTransfer";
import MessageBox from "../../components/Modal/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {getInterbank} from "../../redux/actions/transfer.action";
import Paging from "../../components/Paging/Paging";

const moment = require('moment');

const HistoryTrans = () => {
  const dispatch = useDispatch();
  const paySelector = [
    {title: "-- Tất cả --", value: 0},
    {title: "Nhập tiền", value: 1},
    {title: "Chuyển tiền", value: 2},
    {title: "Nhắc nợ", value: 4},
  ]
  const historyTrans = useSelector(state => state.HistoryTransfer.data);
  const interBankInfo = useSelector((state) => state.InterBank.data);
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const msgBoxToggle = useToggle(false);
  const [from, setFrom] = useState(new Date(moment().subtract(28, 'day')));
  const [to, setTo] = useState(new Date(moment()));
  const [banking, setBanking] = useState("0");
  const [pageIdx, setPageIdx] = useState(0);
  const [total, setTotal] = useState(10);
  const [payType, setPayType] = useState("0");


  function onChangeFrom(value) {
    setFrom(value);
  }

  function onChangeTo(value) {
    setTo(value);
  }

  const showMsgBox = useCallback((title, content) => {
    setTitleMsg(title);
    setContentMsg(content);
    msgBoxToggle.setActive();
  }, [setTitleMsg, setContentMsg, msgBoxToggle]);

  function onChangeBanking(e) {
    setBanking(e.target.value);
  }

  const onChangePayType = (e) => {
    setPayType(e.target.value);
  }

  useEffect(() => {
    let data = {
      from: moment(from).valueOf(),
      to: moment(to).valueOf(),
      partner: parseInt(banking),
      type: parseInt(payType)
    };
    console.log("search value", data);
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getTransHistory(data, pageIdx * 30, accessToken))
        .then((response) => {
          let totalPage = Math.ceil(response.total / 30);
          setTotal(totalPage);
        })
        .catch(e => {
          showMsgBox("Đã xảy ra lỗi", `Nội dung ${e}`);
          msgBoxToggle.setActive();
        })

  }, [dispatch, from, to, pageIdx, banking, payType, msgBoxToggle, showMsgBox]);

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

  const setPage = (i) => {
    setPageIdx(i);
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
                          <FormGroup>
                            <Label for="from">Thời gian bắt đầu</Label>
                            <InputGroup className="mb-2">
                              <DatePicker
                                  className="form-control"
                                  type="text"
                                  name="from"
                                  dateFormat="dd-MM-yyyy"
                                  onSelect={onChangeFrom}
                                  onChange={onChangeFrom}
                                  selected={from}/>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <Label for="time">Thời gian kết thúc</Label>
                            <InputGroup className="mb-2">
                              <DatePicker
                                  className="form-control"
                                  type="text"
                                  name="to"
                                  dateFormat="dd-MM-yyyy"
                                  onSelect={onChangeTo}
                                  onChange={onChangeTo}
                                  selected={to}
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col xs={6}>
                          <FormGroup>
                            <Label for="time">Ngân hàng</Label>
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
                          </FormGroup>
                          <FormGroup>
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
                          </FormGroup>
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
                  <TableInfoTransfer data={historyTrans}></TableInfoTransfer>
                  <div className="col-centered">
                    <Paging pageIdx={pageIdx} total={total} setPage={setPage}/>
                  </div>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <MessageBox isOpen={msgBoxToggle.active}
                    onClose={msgBoxToggle.setInActive}
                    title={titleMsg}
                    content={contentMsg}></MessageBox>
      </Container>
  )
}


export default HistoryTrans;