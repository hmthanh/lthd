import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from 'reactstrap'
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {getUserTransHistory} from "../../redux/creators/historyTransCreator";
import TableInfoTransfer from "../../components/Table/TableInfoTransfer";
import MessageBox from "../../components/Modal/MessageBox";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {getInterbank} from "../../redux/creators/transferCreator";
import {formatMoney} from "../../utils/utils";

const moment = require('moment');

const HistoryTrans = () => {
  const dispatch = useDispatch();
  const transHistory = useSelector(state => {
    return state.TransHistory.data
  });
  const interBankInfo = useSelector((state) => {
    return state.InterBank.data
  });
  // const historyDebt = useSelector(state => {
  //   return state.HistoryDept.data
  // });
  // const receiveHistory = useSelector(state => {
  //   return state.ReceiveHistory.data
  // });
  const search = useInputChange();
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const msgBoxToggle = useToggle(false);
  // const [from, setFrom] = useState(moment().valueOf(new Date()) - (28 * 24 * 60 * 60 * 1000));
  const [from, setFrom] = useState(new Date(moment().subtract(28, 'day')));
  const [to, setTo] = useState(new Date(moment()));
  const [banking, setBanking] = useState("0");
  const [pageIdx, setPageIdx] = useState(0);
  const [total, setTotal] = useState(10);

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

  const findHistoryAccount = useCallback((e) => {
    e.preventDefault();
    let data = {
      from: moment().valueOf(from),
      to: moment().valueOf(to),
      partner: banking
    };
    console.log("search value", search.value);
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserTransHistory(data, pageIdx, accessToken))
        .then((response) => {
          console.log(response);
        });
    // dispatch(getUserReceiveHistory(uid, accessToken))
    //     .then((response) => {
    //       console.log(response.item);
    //     });
    // dispatch(getUserDeptHistory({id: uid}, accessToken))
    //     .then((response) => {
    //       console.log(response.item);
    //     })
    //     .catch((error) => {
    //       showMsgBox("Đã xảy ra lỗi", `Không thể tải lịch sử mắc nợ \n ${error}`);
    //     });


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
  }, [dispatch, search, showMsgBox, pageIdx, from, to, banking]);

  function onChangeBanking(e) {
    setBanking(e.target.value);
  }

  useEffect(() => {
    let data = {
      from: moment(from).valueOf(),
      to: moment(to).valueOf(),
      partner: parseInt(banking)
    };
    console.log("search value", data);
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getUserTransHistory(data, pageIdx * 30, accessToken))
        .then((response) => {
          let totalPage = Math.ceil(response.total / 30);
          setTotal(totalPage);
          console.log(response.item);
        });
    dispatch(getInterbank(accessToken))
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err);
        });
  }, [dispatch, from, to, pageIdx, banking]);

  const changeIndex = (i) => {
    setPageIdx(i);
  }
  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className="mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">LỊCH SỬ GIAO DỊCH</h3>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={findHistoryAccount}>
                    <h4>Thông tin tìm kiếm</h4>
                    <FormGroup>
                      <Row>
                        <Col xs={6}>
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
                        </Col>
                        <Col xs={6}>
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
                          {/*<Label for="btnSearch" style={{marginBottom: "34px"}}></Label>*/}
                          {/*<InputGroup>*/}
                          {/*  <Button id="btnSearch" type="submit" color={"success"}*/}
                          {/*          className="btn-search"*/}
                          {/*          style={{width: "200px"}}*/}
                          {/*          disabled={false}>*/}
                          {/*    <span>Tìm kiếm</span>*/}
                          {/*  </Button>*/}
                          {/*</InputGroup>*/}
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
              <Card id="localBank">
                <div className="card-body">
                  <h4>Giao dịch chuyển tiền</h4>
                  {
                    <TableInfoTransfer data={transHistory}></TableInfoTransfer>
                  }
                  <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                      <PaginationLink first href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink previous href="#"/>
                    </PaginationItem>
                    {
                      Array.apply(null, Array(total)).map((i, index) => {
                        if (index === pageIdx) {
                          return (<PaginationItem active key={index}>
                                <PaginationLink onClick={() => changeIndex(index)}>
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                          )
                        } else {
                          return (<PaginationItem key={index}>
                                <PaginationLink onClick={() => changeIndex(index)}>
                                  {index + 1}
                                </PaginationLink>
                              </PaginationItem>
                          )

                        }
                      })
                    }
                    <PaginationItem>
                      <PaginationLink next href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink last href="#"/>
                    </PaginationItem>
                  </Pagination>
                  {/*<h4>Giao dịch nhận tiền</h4>*/}
                  {/*<TableInfoTransfer*/}
                  {/*    data={receiveHistory}*/}
                  {/*></TableInfoTransfer>*/}

                  {/*<h4>Giao dịch nhắc nợ</h4>*/}
                  {/*<TableInfoDept data={historyDebt}></TableInfoDept>*/}
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