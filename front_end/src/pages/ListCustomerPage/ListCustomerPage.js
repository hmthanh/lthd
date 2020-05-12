import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import {getAllCustomer} from "../../redux/creators/ListCustomerCreator";
import {formatFormalDate} from "../../utils/utils";
// import {formatMoney} from "../../utils/utils";
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
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className=" mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">DANH SÁCH KHÁCH HÀNG</h3>
                  <hr/>
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
                                <td>{formatFormalDate(item.date_of_birth)}</td>
                                <td>{item.account_num}</td> 
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

export default ListCustomerPage;