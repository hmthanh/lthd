import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {getInDebt} from '../../redux/creators/InDebtCreator'
import {Link} from "react-router-dom";
import {formatFormalDate} from "../../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";

const ListInDebtPage = () => {
  const dispatch = useDispatch();
  const GetInDebtInfo = useSelector((state) => {
    return state.GetInDebtInfo
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    let uid = localStorage.getItem('uid');
    dispatch(getInDebt(uid, accessToken))
        .then((response) => {
          console.log(response)
        })
  }, [dispatch])

  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className=" mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">DANH SÁCH NỢ</h3>
                  <Table>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên Tài Khoản</th>
                      <th>Số Tiền</th>
                      <th>Ngày giao dịch</th>
                      <th>Ghi chú</th>
                      <th>Thanh toán</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      GetInDebtInfo.data.response &&
                      GetInDebtInfo.data.response.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.debt_val}</td>
                            <td>{formatFormalDate(item.date_time)}</td>
                            <td>{item.note}</td>
                            <td>
                              <Link to={`/transfer?account=${item.account_num}&name=${item.name}&money=${item.debt_val}&note=${item.note}`}>
                                <Button color="success">
                                  <span style={{marginRight: "10px", paddingLeft: "10px"}}>Thanh toán</span>
                                  <FontAwesomeIcon style={{marginRight: "10px"}} icon={faCreditCard}></FontAwesomeIcon>
                                </Button>
                              </Link>
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

export default ListInDebtPage;