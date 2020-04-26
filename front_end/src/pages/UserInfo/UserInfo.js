import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Card, CardBody, CardTitle, Col, Form, FormGroup, Label} from 'reactstrap'
import {getBankingInfo} from '../../redux/creators/bankingInfoCreator'
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';

const UserInfo = () => {
  const dispatch = useDispatch();
  const BankingInfo = useSelector((state) => {
    return state.BankingInfo.data
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    dispatch(getBankingInfo(uid, accessToken))
        .then((response) => {
          console.log("response", response);
        });

  }, [dispatch]);

  console.log(BankingInfo);

  return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Thông tin tài khoản</CardTitle>
            {/*<Form>*/}
            {/*  <FormGroup row>*/}
            {/*    <Col sm={4}>*/}
            {/*      <Label>Số tài khoản</Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={8}>*/}
            {/*      {BankingInfo.item && BankingInfo.item.account_num}*/}
            {/*    </Col>*/}
            {/*  </FormGroup>*/}

            {/*  <FormGroup row>*/}
            {/*    <Col sm={2}>*/}
            {/*      <Label>Số dư</Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={2}>*/}
            {/*      <Label>tài khoản chính: </Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={3}>*/}
            {/*      <CurrencyFormat value={BankingInfo.item.main} displayType={'text'}*/}
            {/*                      thousandSeparator={true} prefix={'VND '}/>*/}
            {/*    </Col>*/}
            {/*    <Col sm={2}>*/}
            {/*      <Label>tài khoản tiết kiệm: </Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={3}>*/}
            {/*      <CurrencyFormat value={BankingInfo.item.saving_money}*/}
            {/*                      displayType={'text'} thousandSeparator={true} prefix={'VND '}/>*/}
            {/*    </Col>*/}
            {/*  </FormGroup>*/}

            {/*  <FormGroup row>*/}
            {/*    <Col sm={4}>*/}
            {/*      <Label>user name</Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={8}>*/}
            {/*      {BankingInfo.item.account && BankingInfo.item.account.user_name}*/}
            {/*    </Col>*/}
            {/*  </FormGroup>*/}

            {/*  <FormGroup row>*/}
            {/*    <Col sm={4}>*/}
            {/*      <Label>Họ Tên</Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={8}>*/}
            {/*      {BankingInfo.item.account && BankingInfo.item.account.name}*/}
            {/*    </Col>*/}
            {/*  </FormGroup>*/}

            {/*  <FormGroup row>*/}
            {/*    <Col sm={4}>*/}
            {/*      <Label>Email</Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={8}>*/}
            {/*      {BankingInfo.item.account && BankingInfo.item.account.email}*/}
            {/*    </Col>*/}
            {/*  </FormGroup>*/}

            {/*  <FormGroup row>*/}
            {/*    <Col sm={4}>*/}
            {/*      <Label>Số Điện Thoại</Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={8}>*/}
            {/*      +{BankingInfo.item.account && BankingInfo.item.account.phone}*/}
            {/*    </Col>*/}
            {/*  </FormGroup>*/}

            {/*  <FormGroup row>*/}
            {/*    <Col sm={4}>*/}
            {/*      <Label>Ngày Tháng Năm Sinh</Label>*/}
            {/*    </Col>*/}
            {/*    <Col sm={8}>*/}
            {/*      {BankingInfo.item.account && new Intl.DateTimeFormat('vi-US', {*/}
            {/*        year: 'numeric',*/}
            {/*        month: 'numeric',*/}
            {/*        day: '2-digit',*/}

            {/*      }).format(new Date(BankingInfo.item.date_of_birth))}*/}
            {/*    </Col>*/}
            {/*  </FormGroup>*/}

            {/*</Form>*/}
            <Link to="/changepwd">Đổi mật khẩu</Link>
          </CardBody>
        </Card>
      </div>
  )
};

export default UserInfo;