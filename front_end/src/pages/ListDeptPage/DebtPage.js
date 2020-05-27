import React, {useEffect} from 'react';
import {Button, Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux';
import {fetchDebtReminder} from '../../redux/actions/debt.action';
import {formatMoment} from "../../utils/utils";
import CancelDebt from "./CancelDebt";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


const DebtPage = () => {
  const dispatch = useDispatch();
  const DebtInfo = useSelector((state) => {
    return state.DebtInfo.data
  });

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    let uid = localStorage.getItem('uid');
    dispatch(fetchDebtReminder(uid, accessToken))
        .then((response) => {
          // console.log(response);
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
                  <Link to="/create-debt">
                    <Button color="success">
                      <FontAwesomeIcon style={{marginLeft: "40px"}} icon={faPlus}></FontAwesomeIcon>
                      <span style={{marginLeft: "5px", paddingRight: "40px"}}>Tạo nhắc nợ</span>
                    </Button>
                  </Link>
                  <hr/>
                  <Table>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên Tài Khoản</th>
                      <th>Số Tài Khoản</th>
                      <th>Số Tiền</th>
                      <th>Ngày giao dịch</th>
                      <th>Nội dung</th>
                      {/*<th width="140">Nhắc nợ</th>*/}
                      <th width="170">Xóa</th>
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
                            <td>{formatMoment(it.date_time)}</td>
                            <td>{it.note}</td>
                            {/*<td>*/}
                            {/*  <ModalEdit accountId={it.id}*/}
                            {/*             accountNum={it.account_num}*/}
                            {/*             money={it.debt_val}*/}
                            {/*             note={it.note}*/}
                            {/*             name={it.name}/>*/}
                            {/*  {' '}</td>*/}
                            <td>
                              <CancelDebt debtId={it.id}/>
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