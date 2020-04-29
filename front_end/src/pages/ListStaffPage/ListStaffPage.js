import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import {getAllStaff} from "../../redux/creators/staffCreator";
// import {formatMoney} from "../../utils/utils";
// import {getAllAccount} from '../../redux/creators/accountCreator'

const ListStaffPage = () => {
  const dispatch = useDispatch();
  const listStaff = useSelector((state) => {
    return state.StaffInfo.data
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getAllStaff(uid, accessToken))
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
                  <h3 className="col-centered table-heading">DANH SÁCH NHÂN VIÊN</h3>
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
                      listStaff.response && listStaff.response.map((item, index) => (
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
            </CardGroup>
          </Col>
        </Row>
      </Container>
  );
};

export default ListStaffPage;