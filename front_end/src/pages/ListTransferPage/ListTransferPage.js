import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardTitle, Col, Container, Row, Table} from 'reactstrap'
import {getAllAccount} from "../../redux/creators/accountCreator";
import {formatMoney} from "../../utils/utils";

const ListTransferPage = () => {
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
      <Container style={{marginTop: '20px'}}>
        <Row className=" justify-content-center">
          <Col className="col-md-12">
            <div className="card-group mb-0">
              <Card className="card p-6">
                <div className="card-block">
                  <CardTitle>
                    <h3 className="col-centered table-heading">DANH SÁCH GIAO DỊCH</h3>
                  </CardTitle>

                  <Table>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Loại tài khoản</th>
                      <th>Số tài khoản</th>
                      <th>Số dư hiện tại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      listAllAccount.account && listAllAccount.account.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">{1}</th>
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
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default ListTransferPage;