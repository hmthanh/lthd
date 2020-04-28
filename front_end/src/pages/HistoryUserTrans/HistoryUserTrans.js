import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getHistoryUserDept, getHistoryUserTrans} from "../../redux/creators/historyTransCreator";
import TableInfoTransfer from "./TableInfoTransfer";
import TableInfoDept from "./TableInfoDept";
import {Card, CardGroup, Col, Container, Row} from "reactstrap";

const HistoryUserTrans = () => {
  const dispatch = useDispatch();
  const historyDebt = useSelector(state => {
    return state.HistoryDept.data
  });
  const userHistoryTrans = useSelector(state => {
    return state.UserHistoryTrans.data
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getHistoryUserTrans(uid, accessToken))
        .then((response) => {
          console.log(response.item);
        });
    dispatch(getHistoryUserDept({id: uid}, accessToken))
        .then((response) => {
          console.log(response.item);
        });
  }, [dispatch]);

  console.log("historyDebt", historyDebt);

  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className=" mb-0">
              <Card className="p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h3 className="col-centered table-heading">LỊCH SỬ GIAO DỊCH</h3>
                  <hr/>
                  <h4>Giao dịch chuyển tiền</h4>
                  <TableInfoTransfer
                      data={userHistoryTrans}
                      ></TableInfoTransfer>

                  <h4>Giao dịch nhận tiền</h4>
                  <TableInfoTransfer
                      data={userHistoryTrans}
                  ></TableInfoTransfer>

                  <h4>Giao dịch nhắc nợ</h4>
                  <TableInfoDept data={historyDebt}></TableInfoDept>
                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
  )
};

export default HistoryUserTrans;