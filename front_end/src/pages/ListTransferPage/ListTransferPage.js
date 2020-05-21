import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {transfer} from "../../redux/creators/ListtransferCreator";
import {formatMoney} from "../../utils/utils";
//import DataTable, { createTheme } from 'react-data-table-component';

const ListTransferPage = () => {
  const dispatch = useDispatch();
  const ListTransferInfo = useSelector((state) => {
    return state.ListTransferInfo.data
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(transfer(uid, accessToken))
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
                  <h3 className="col-centered table-heading">LỊCH SỬ GIAO DỊCH</h3>
                  <hr/>
                  <Table>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Ho tên</th>
                      <th>Loại</th>
                      <th>Người chuyển</th>
                      <th>Người nhận</th>
                      <th>Số tiền</th>
                      <th>Ghi chú</th>
                      <th>Trạng thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      ListTransferInfo.response && ListTransferInfo.response.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">{item.trans_id}</th>
                                <td>{item.acc_name}</td>
                                <td>{(item.type === 1 ? "Chuyển tiền" : "Nhận tiền")}</td>
                                <td>{item.from_account}</td>
                                <td>{item.to_account}</td>
                                <td>{formatMoney(item.amount, 0)} VNĐ</td>
                                <td>{item.note}</td>
                                <td>{item.state === 0 ? "Thành công" : "Thất bại"}</td>
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

export default ListTransferPage;