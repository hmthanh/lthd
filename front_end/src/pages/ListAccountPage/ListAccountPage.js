import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {getAllAccount} from '../../redux/actions/account.action'
import {formatMoney} from "../../utils/utils";

const ListAccountPage = () => {
  const dispatch = useDispatch();
  const listAllAccount = useSelector((state) => {
    return state.AccountInfo.data
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getAllAccount(uid, accessToken))
        .then((response) => {
          console.log(response);
        });
  }, [dispatch]);

  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className=" mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">DANH SÁCH TÀI KHOẢN</h3>
                  <Table>
                    <thead>
                    <tr>
                      <th>Mã tài khoản</th>
                      <th>Loại tài khoản</th>
                      <th>Số tài khoản</th>
                      <th>Số dư hiện tại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      listAllAccount.account && listAllAccount.account.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item.id}</th>
                            <td>{(item.type === 1 ? "Thanh toán" : "Tiết kiệm")}</td>
                            <td>{item.account_num}</td>
                            <td>{formatMoney(item.surplus, 0)} VNĐ</td>
                          </tr>
                        )
                      )
                    }
                    </tbody>
                  </Table>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
  );
};

export default ListAccountPage;