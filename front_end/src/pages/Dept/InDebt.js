import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import { getInDebt } from '../../redux/creators/InDebtCreator'

class ListInDebtPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    //const uid = localStorage.getItem('uid')
    this.props.getInDebt()
  }

  render() {
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
                        <th>Số Tài Khoản</th>
                        <th>Số Tiền</th>
                        <th>Ngày giao dịch</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.GetInDebtInfo.data.val &&
                        this.props.GetInDebtInfo.data.val.map((item, index)  => (
                          <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.account_num}</td>
                            <td>{item.debt_val}</td>
                            <td>{item.date_time.toString()}</td>
                            <td>{item.note}</td>
                           
                           
                    
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
}

const mapDispatchToProps = dispatch => ({
  getInDebt: () => dispatch(getInDebt())
});

const mapStateToProps = (state) => {
  return {
    GetInDebtInfo: state.GetInDebtInfo
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListInDebtPage)