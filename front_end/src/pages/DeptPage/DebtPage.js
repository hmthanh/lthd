import React, {useEffect} from 'react';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux';
import {getAllDebt} from '../../redux/creators/debtCreator';
import {formatFormalDate} from "../../utils/utils";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import ConfirmDelete from "./ConfirmDelete";

const DebtPage = () => {
  const dispatch = useDispatch();
  const DebtInfo = useSelector((state) => {
    return state.DebtInfo.data
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    console.log('DebtPage ' + accessToken);
    let uid = localStorage.getItem('uid');
    dispatch(getAllDebt(uid, accessToken))
        .then((response) => {
          console.log(response);
        })
  }, [dispatch])

  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className=" mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">DANH SÁCH NHẮC NỢ</h3>
                  <ModalAddNew/>
                  <hr/>
                  <Table>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên Tài Khoản</th>
                      <th>Số Tài Khoản</th>
                      <th>Số Tiền</th>
                      <th>Ngày giao dịch</th>
                      <th>Ghi chú</th>
                      <th>Nhắc nhở</th>
                      <th>Xóa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      DebtInfo.item &&
                      DebtInfo.item.map((it, index) => (
                          <tr key={it.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{it.name}</td>
                            <td>{it.account_num}</td>
                            <td>{it.debt_val}</td>
                            <td>{formatFormalDate(it.date_time)}</td>
                            <td>{it.note}</td>
                            <td><ModalEdit accountId={it.id}
                                           accountNum={it.account_num}
                                           money={it.debt_val}
                                           note={it.note}
                                           name={it.name}/>
                              {' '}</td>
                            <td><ConfirmDelete accountId={it.id}/>
                            </td>
                          </tr>
                      ))
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
}

export default DebtPage;