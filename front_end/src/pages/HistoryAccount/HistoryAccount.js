import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardTitle, Col, Container, Form, FormGroup, Input, Row} from 'reactstrap'
import './HistoryAccount.css';
import Label from "reactstrap/es/Label";
import TableInfoTransfer from "./TableInfoTransfer";

class HistoryAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receiverExchangeInfo: [
        {
          id: 1,
          dayTransaction: '12/03/2010',
          typeTransaction: 'Giao dịch tiền mặt',
          accountNumber: 234234234,
          moneyTransaction: 212000000
        },
        {
          id: 2,
          dayTransaction: '12/03/2010',
          typeTransaction: 'Giao dịch thẻ',
          accountNumber: 3429587485,
          moneyTransaction: 999000000
        },
      ],
      transferExchangeInfo: [
        {
          id: 1,
          dayTransaction: '12/03/2010',
          typeTransaction: 'Giao dịch thẻ',
          accountNumber: 3429587485,
          moneyTransaction: 999000000
        },
        {
          id: 2,
          dayTransaction: '12/03/2010',
          typeTransaction: 'Giao dịch thẻ',
          accountNumber: 3429587485,
          moneyTransaction: 999000000
        },
      ],
      debtExchangeInfo: [
        {
          id: 1,
          dayTransaction: '12/03/2010',
          typeTransaction: 'Giao dịch thẻ',
          accountNumber: 3429587485,
          moneyTransaction: 999000000
        },
        {
          id: 2,
          dayTransaction: '12/03/2010',
          typeTransaction: 'Giao dịch thẻ',
          accountNumber: 3429587485,
          moneyTransaction: 999000000
        },
      ],
    }
  }

  componentDidMount() {
    // const uid = localStorage.getItem('uid');
    // const accessToken = localStorage.getItem('accessToken');
    // console.log('componentDidMount ' + uid + 'accessToken' + accessToken);
    // this.props.getAll(uid, accessToken)
  }

  render() {
    let {receiverExchangeInfo, transferExchangeInfo, debtExchangeInfo} = this.state;
    return (
        <Container>
          <div className="container-fluid py-3">
            <Row>
              <Col xs={12} className={"mx-auto"}>
                <Card id="localBank">
                  <Col xs={12} className={"mx-auto"}>
                    <div style={{marginTop: "30px"}}></div>
                    <Form method="post" noValidate="novalidate"
                          className="needs-validation" onSubmit={this.onSubmit}>
                      <h4>Tìm kiềm tài khoản</h4>
                      <FormGroup>
                        <Label>Mã tài khoản</Label>
                        <Row>
                          <Col xs={6}>
                            <Input id="txtSearch" type="text" placeholder="2323-2334-2342"></Input>
                          </Col>
                          <Col xs={6}>
                            <Button id="btnSearch" type="submit" color={"success"}
                                    className="btn-search"
                                    disabled={false}>
                              <span>Tìm kiếm</span>
                            </Button>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Form>
                  </Col>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className={"mx-auto"}>
                <Card id="localBank">
                  <div className="card-body">
                    <CardTitle>
                      <h3 className="text-center">LỊCH SỬ GIAO DỊCH TÀI KHOẢN</h3>
                    </CardTitle>
                    <hr/>

                    <h4>Giao dịch nhận tiền</h4>

                    <FormGroup>
                      <TableInfoTransfer tableInfo={receiverExchangeInfo}></TableInfoTransfer>
                    </FormGroup>
                    <hr/>
                    <h4>Giao dịch chuyển khoản</h4>
                    <FormGroup>
                      <TableInfoTransfer tableInfo={transferExchangeInfo}></TableInfoTransfer>
                    </FormGroup>
                    <hr/>
                    <h4>Giao dịch thanh toán mắc nợ</h4>
                    <FormGroup>
                      <TableInfoTransfer tableInfo={debtExchangeInfo}></TableInfoTransfer>
                    </FormGroup>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>

    )
  }
}

function headInfoTable() {
  return (<div></div>);
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = (state) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryAccount)