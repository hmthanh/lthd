import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {Card, CardTitle, Col, Container, Row, Table} from 'reactstrap'
import {useDispatch, useSelector} from "react-redux";
import {getAllStaff} from "../../redux/creators/staffCreator";
import {formatMoney} from "../../utils/utils";
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
      <Container style={{marginTop: '20px'}}>
        <Row className=" justify-content-center">
          <Col className="col-md-12">
            <div className="card-group mb-0">
              <Card className="card p-6">
                <div className="card-block">
                  <CardTitle>
                    <h3 className="col-centered table-heading">DANH SÁCH NHÂN VIÊN</h3>
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
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default ListStaffPage;