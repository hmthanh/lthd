import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, CardGroup, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row} from 'reactstrap'
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {getUserDeptHistory, getUserReceiveHistory, getUserTransHistory} from "../../redux/creators/historyTransCreator";
import TableInfoTransfer from "../../components/Table/TableInfoTransfer";
import TableInfoDept from "../../components/Table/TableInfoDept";
import MessageBox from "../../components/Modal/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import {getInterbank} from "../../redux/creators/transferCreator";
import DatePicker from "react-datepicker";

const HistoryTrans = () => {
  const dispatch = useDispatch();
  const historyDebt = useSelector(state => {
    return state.HistoryDept.data
  });
  const transHistory = useSelector(state => {
    return state.TransHistory.data
  });
  const receiveHistory = useSelector(state => {
    return state.ReceiveHistory.data
  });
  const interBankInfo = useSelector((state) => {
    return state.InterBank.data
  });
  const search = useInputChange();
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const msgBoxToggle = useToggle(false);
  const [time, setTime] = useState(new Date());
  const [banking, setBanking] = useState(0);

  function onSetTime(value) {
    setTime(value);
  }

  const showMsgBox = useCallback((title, content) => {
    setTitleMsg(title);
    setContentMsg(content);
    msgBoxToggle.setActive();
  }, [setTitleMsg, setContentMsg, msgBoxToggle]);
  const findHistoryAccount = useCallback((e) => {
    e.preventDefault();
    console.log("search value", search.value);
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserTransHistory(uid, accessToken))
        .then((response) => {
          console.log(response.item);
        });
    dispatch(getUserReceiveHistory(uid, accessToken))
        .then((response) => {
          console.log(response.item);
        });
    dispatch(getUserDeptHistory({id: uid}, accessToken))
        .then((response) => {
          console.log(response.item);
        })
        .catch((error) => {
          showMsgBox("Đã xảy ra lỗi", `Không thể tải lịch sử mắc nợ \n ${error}`);
        });
    // dispatch(getUserTransHistory(uid, accessToken))
    //     .then((response) => {
    //       console.log("getHistoryUserTrans", response.item);
    //     })
    //     .catch((error) => {
    //       showMsgBox("Đã xảy ra lỗi", `Không thể tải lịch sử mắc nợ \n${error}`);
    //     });
    // dispatch(getUserDeptHistory({id: uid}, accessToken))
    //     .then((response) => {
    //       console.log("getHistoryUserDept", response.item);
    //     })
    //     .catch((error) => {
    //       showMsgBox("Đã xảy ra lỗi", `Không thể tải lịch sử mắc nợ \n ${error}`);
    //     });
  }, [dispatch, search, showMsgBox]);

  function onChangeBanking(e) {
    setBanking(e.target.value);
  }

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');

    dispatch(getInterbank(accessToken))
        .then((response) => {
          console.log(response);
          // let partner_code = response.item[0].partner_code;
          // setBanking(partner_code);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [dispatch]);

  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className=" mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">LỊCH SỬ GIAO DỊCH</h3>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={findHistoryAccount}>
                    <h4>Thông tin tìm kiếm</h4>
                    <FormGroup style={{width: "50%"}}>
                      <Label for="time">Thời gian</Label>
                      <InputGroup className="mb-2">
                        <DatePicker
                            className="form-control"
                            type="text"
                            name="time"
                            dateFormat="MM-yyyyy"
                            onSelect={onSetTime}
                            onChange={onSetTime}
                            selected={time}
                            showMonthYearPicker
                            showFullMonthYearPicker
                        />
                      </InputGroup>
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
                    <Button id="btnSearch" type="submit" color={"success"}
                            className="btn-search"
                            style={{width: "200px"}}
                            disabled={false}>
                      <span>Tìm kiếm</span>
                    </Button>
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
              <Card id="localBank">
                <div className="card-body">
                  <h4>Giao dịch chuyển tiền</h4>
                  <TableInfoTransfer
                      data={transHistory}
                  ></TableInfoTransfer>

                  <h4>Giao dịch nhận tiền</h4>
                  <TableInfoTransfer
                      data={receiveHistory}
                  ></TableInfoTransfer>

                  <h4>Giao dịch nhắc nợ</h4>
                  <TableInfoDept data={historyDebt}></TableInfoDept>
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