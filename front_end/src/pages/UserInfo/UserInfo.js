import React, {useEffect} from 'react'
import './UserInfo.css'
import {useDispatch, useSelector} from 'react-redux'
import {Alert, Badge, Card, CardGroup, Col, Container, Form, FormGroup, Label, ListGroupItem, Row, UncontrolledTooltip} from 'reactstrap'
import {getBankingInfo} from '../../redux/creators/bankingInfoCreator'
import {getAllAccount} from "../../redux/creators/accountCreator";
import {formatMoney} from "../../utils/utils";
import {Link} from "react-router-dom";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.BankingInfo.data
  });
  const banking = useSelector(state => {
    return state.AccountInfo.data.account
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    dispatch(getBankingInfo(uid, accessToken))
        .then((response) => {
          console.log("response", response);
        });

    dispatch(getAllAccount(uid, accessToken))
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [dispatch]);

  console.log("user", user);
  console.log("sdf", banking);

  const closeAccount = (e) => {
    console.log(e);
  }


  return (
      user !== 'undefined' ?
          (<Container className="container" style={{marginTop: '20px'}}>
                <Row className="justify-content-center">
                  <Col md={12}>
                    <CardGroup className=" mb-0">
                      <Card className="p-6">
                        <div className="card-block" style={{padding: "20px 40px"}}>
                          <h3 className="col-centered table-heading">THÔNG TIN TÀI KHOẢN</h3>
                          <hr/>
                          <Form>
                            {/*<FormGroup row>*/}
                            {/*  <Label sm={3} className="float-sm-right text-right">Số tài khoản</Label>*/}
                            {/*  <Col sm={9} className="algin-self">*/}
                            {/*    {user.account_num}*/}
                            {/*  </Col>*/}
                            {/*</FormGroup>*/}

                            <FormGroup row>
                              <Label sm={3} className="float-sm-right text-right">Tài khoản ngân hàng</Label>
                              <Col sm={9} className="algin-self">
                                {
                                  banking && banking.map((acc, index) => {
                                    if (acc.type === 1) {
                                      return (<Alert color="danger" className="alert-dismissible" key={index}>
                                        <Link type="button"
                                              to="/close-account"
                                              className="close"
                                              color="link"
                                              aria-label="Close"
                                              id={"toolTip" + index}><span aria-hidden="true">×</span></Link>
                                        <UncontrolledTooltip placement="top" target={"toolTip" + index}>Đóng tài khoản
                                        </UncontrolledTooltip>
                                        <ListGroupItem>
                                          <h5 className="alert-heading">Số tài khoản : {`${acc.account_num} `}
                                            <Badge color="danger">Thanh toán{` ${index + 1}`}</Badge>
                                          </h5>
                                          <hr/>
                                          <p>Số dư : {`${formatMoney(acc.surplus)} VNĐ`}</p>
                                        </ListGroupItem>
                                      </Alert>);
                                    } else {
                                      return (<Alert color={"success"} key={index} toggle={closeAccount}>
                                        <Link type="button"
                                              to="/close-account"
                                              className="close"
                                              color="link"
                                              aria-label="Close"
                                              id={"toolTip" + index}><span aria-hidden="true">×</span></Link>
                                        <UncontrolledTooltip placement="top" target={"toolTip" + index}>Đóng tài khoản
                                        </UncontrolledTooltip>
                                        <ListGroupItem>
                                          <h5 className="alert-heading">Số tài khoản : {`${acc.account_num} `}
                                            <Badge color="success">Tiết kiệm</Badge>
                                          </h5>
                                          <hr/>
                                          <p>Số dư : {`${formatMoney(acc.surplus)} VNĐ`}</p>
                                        </ListGroupItem>
                                      </Alert>);
                                    }
                                  })
                                }
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm={3} className="float-sm-right text-right">Họ và tên</Label>
                              <Col sm={9} className="algin-self">
                                {user.name}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm={3} className="float-sm-right text-right">Username</Label>
                              <Col sm={9} className="algin-self">
                                {user.user_name}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm={3} className="float-sm-right text-right">Ngày sinh</Label>
                              <Col sm={9} className="algin-self">
                                {user.date_of_birth && new Intl.DateTimeFormat('en-GB').format(new Date(user.date_of_birth))}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm={3} className="float-sm-right text-right">Email</Label>
                              <Col sm={9} className="algin-self">
                                {user.email}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label sm={3} className="float-sm-right text-right">Số điện thoại</Label>
                              <Col sm={9} className="algin-self">
                                {`+${user.phone}`}
                              </Col>
                            </FormGroup>
                          </Form>
                        </div>
                      </Card>
                    </CardGroup>
                  </Col>
                </Row>
              </Container>
          )
          :
          (
              <div>Không có thông tin người dùng</div>
          )
  )
};

export default UserInfo;