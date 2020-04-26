import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import './HistoryAccount.css';
import TableInfoTransfer from "./TableInfoTransfer";
import MessageBox from "../../components/Modal/MessageBox";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {getHistoryUserDept, getHistoryUserTrans} from "../../redux/creators/historyTransCreator";
import TableInfoDept from "./TableInfoDept";

const HistoryTrans = () => {
  const dispatch = useDispatch();
  const historyDebt = useSelector(state => {
    return state.HistoryDept.data
  });
  const userHistoryTrans = useSelector(state => {
    return state.UserHistoryTrans.data
  });
  const search = useInputChange();
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const msgBoxToggle = useToggle(false);

  const showMsgBox = useCallback((title, content) => {
    setTitleMsg(title);
    setContentMsg(content);
    msgBoxToggle.setActive();
  }, [setTitleMsg, setContentMsg, msgBoxToggle]);
  const findHistoryAccount = useCallback((e) =>{
    e.preventDefault();
    // console.log("search value", search.value);
    const uid = search.value;
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getHistoryUserTrans(uid, accessToken))
        .then((response) => {
          console.log("getHistoryUserTrans", response.item);
        })
        .catch((error) =>{
          showMsgBox("Đã xảy ra lỗi", `Không thể tải lịch sử mắc nợ \n${error}`);
        });
    dispatch(getHistoryUserDept({id: uid}, accessToken))
        .then((response) => {
          console.log("getHistoryUserDept", response.item);
        })
        .catch((error) =>{
          showMsgBox("Đã xảy ra lỗi", `Không thể tải lịch sử mắc nợ \n ${error}`);
        });
  }, [dispatch, search]);

  return (
      <Container>
        <div className="container-fluid py-3">
          <Row style={{marginBottom: "10px"}}>
            <Col xs={12} className={"mx-auto"}>
              <Card id="localBank">
                <Col xs={12} className={"mx-auto"}>
                  <div style={{marginTop: "30px"}}></div>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={findHistoryAccount}>
                    <h4>Tìm kiềm tài khoản</h4>
                    <FormGroup>
                      <Label>Mã tài khoản</Label>
                      <Row>
                        <Col xs={6}>
                          <Input id="txtSearch"
                                 type="text"
                                 placeholder="2323-2334-2342"
                                 onChange={search.onChange}
                                 value={search.value}
                          ></Input>
                        </Col>
                        <Col xs={6}>
                          <Button id="btnSearch" type="submit" color={"success"}
                                  className="btn-search"
                                  disabled={false}>
                            <span>Tìm kiếm</span>
                          </Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form>
                </Col>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className={"mx-auto"}>
              <Card id="localBank">
                <div className="card-body">
                  <CardTitle>
                    <h3 className="text-center">LỊCH SỬ GIAO DỊCH TÀI KHOẢN</h3>
                  </CardTitle>
                  <hr/>
                  <h4>Lịch sử giao dịch</h4>
                  <FormGroup>
                    <TableInfoTransfer data={userHistoryTrans} receiving={userHistoryTrans}></TableInfoTransfer>
                  </FormGroup>
                  <hr/>
                  <h4>Giao dịch thanh toán mắc nợ</h4>
                  <FormGroup>
                    <TableInfoDept data={historyDebt}></TableInfoDept>
                  </FormGroup>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <MessageBox isOpen={msgBoxToggle.active}
                    onClose={msgBoxToggle.setInActive}
                    title={titleMsg}
                    content={contentMsg}></MessageBox>
      </Container>
  );
};


export default HistoryTrans;