import React, {useEffect} from 'react'
import './UserInfo.css'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardGroup, Col, Form, FormGroup, Label} from 'reactstrap'
import {getBankingInfo} from '../../redux/actions/bankingInfo'
import {getAllAccount} from "../../redux/actions/account.action";
import CloseAccount from "../CloseAccount/CloseAccount";

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
  }, [dispatch]);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    dispatch(getAllAccount(uid, accessToken))
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [dispatch])

  return (
      user !== 'undefined' ?
          (
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
                              return <CloseAccount key={index}
                                                   type={acc.type}
                                                   index={index}
                                                   surplus={acc.surplus}
                                                   account_num={acc.account_num}></CloseAccount>
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
          )
          :
          (
              <div>Không có thông tin người dùng</div>
          )
  )
};

export default UserInfo;