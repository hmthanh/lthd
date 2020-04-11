import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {Card, CardTitle, Col, Container, Row, Table} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import {getAllCustomer} from "../../redux/creators/ListCustomerCreator";
import {formatMoney} from "../../utils/utils";
// import {getAllAccount} from '../../redux/creators/accountCreator'

const ListCustomerPage = () => {
  const dispatch = useDispatch();
  const ListAllCustomer = useSelector((state) => {
    return state.AllCustomer.data
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getAllCustomer(uid, accessToken))
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
                    <h3 className="col-centered table-heading">DANH SÁCH KHÁCH HÀNG</h3>
                  </CardTitle>

                  <Table>
                    <thead>
                    <tr>
                    <th>#</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Ngày sinh</th>
                        <th>Số tài khoản</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      ListAllCustomer.response && ListAllCustomer.response.map((item, index) => (
                              <tr key={index}>
                                 <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.date_of_birth.toString()}</td>
                                <td>{item.account_num}</td> 
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

export default ListCustomerPage;