import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner
} from 'reactstrap'
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {getUserDeptHistory, getUserReceiveHistory, getUserTransHistory} from "../../redux/creators/historyTransCreator";
import TableInfoTransfer from "../../components/Table/TableInfoTransfer";
import TableInfoDept from "../../components/Table/TableInfoDept";
import MessageBox from "../../components/Modal/MessageBox";
import {getAccName} from "../../redux/creators/transferCreator";

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
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const search = useInputChange();
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const msgBoxToggle = useToggle(false);

  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange("");

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

  const onBlurAccountNum = useCallback(() => {
    if (accountNum.value === "") {
      setAccInValid(true)
      setAccInValidMsg("Không được để trống")
      return false;
    }
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      query: accountNum
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

  }, [accountNum, dispatch, name]);

  function onChangeAccountNum(e) {
    setAccountNum(e.target.value);
  }


  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className=" mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">TÌM KIẾM LỊCH SỬ GIAO DỊCH</h3>
                  <hr/>
                  <Form method="post" noValidate="novalidate"
                        className="needs-validation" onSubmit={findHistoryAccount}>
                    <h4>Tìm kiếm theo tài khoản</h4>
                    <FormGroup>
                      <Row>
                        <Col xs={6}>
                          <InputGroup className="mb-2" xs={6}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>Số tài khoản</InputGroupText>
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
                    {/*<FormGroup>*/}
                    {/*  <Row>*/}
                    {/*    <Col xs={6}>*/}
                    {/*      <InputGroup>*/}
                    {/*        <InputGroupAddon addonType="prepend">*/}
                    {/*          <InputGroupText>Mã tài khoản</InputGroupText>*/}
                    {/*        </InputGroupAddon>*/}
                    {/*        <Input id="txtSearch"*/}
                    {/*               type="text"*/}
                    {/*               placeholder="2323-2334-2342"*/}
                    {/*               onChange={search.onChange}*/}
                    {/*               value={search.value}*/}
                    {/*        ></Input>*/}
                    {/*      </InputGroup>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={6}>*/}
                    {/*      <Button id="btnSearch" type="submit" color={"success"}*/}
                    {/*              className="btn-search"*/}
                    {/*              disabled={false}>*/}
                    {/*        <span>Tìm kiếm</span>*/}
                    {/*      </Button>*/}
                    {/*    </Col>*/}
                    {/*  </Row>*/}
                    {/*</FormGroup>*/}
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

};


export default HistoryTrans;