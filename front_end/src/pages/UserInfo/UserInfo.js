import React, {useEffect} from 'react'
import './UserInfo.css'
import {useDispatch, useSelector} from 'react-redux'
import {Badge, Card, CardBody, CardTitle, Col, Form, FormGroup, Label, ListGroup, ListGroupItem} from 'reactstrap'
import {getBankingInfo} from '../../redux/creators/bankingInfoCreator'
import {getAllAccount} from "../../redux/creators/accountCreator";
import {formatMoney} from "../../utils/utils";

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


  return (
      user != 'undefined' ?
          (<div>
            <Card>
              <CardBody>
                <CardTitle>
                  <h3 className="text-center">THÔNG TIN TÀI KHOẢN</h3>
                </CardTitle>
                <hr/>

                <Form>
                  <FormGroup row>
                    <Label sm={3} className="float-sm-right text-right">Số tài khoản</Label>
                    <Col sm={9} className="algin-self">
                      {user.account_num}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={3} className="float-sm-right text-right">Tài khoản ngân hàng</Label>
                    <Col sm={9} className="algin-self">
                      <ListGroup>
                        {
                          banking && banking.map((acc, index) => {
                            return <ListGroupItem key={index}>
                              {(acc.type === 1 ? "Thanh toán" : `Tiết kiệm ${index}`)}
                              {':  '}<Badge color="success">{`${formatMoney(acc.surplus)} VNĐ`}</Badge>
                            </ListGroupItem>
                        })
                        }
                      </ListGroup>
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
              </CardBody>
            </Card>
          </div>)
          :
          (<div>Không có thông tin người dùng</div>)
  )
};

export default UserInfo;