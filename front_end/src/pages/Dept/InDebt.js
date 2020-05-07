import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import { getInDebt } from '../../redux/creators/InDebtCreator'
import {
  Link,
  useParams
} from "react-router-dom";


class ListInDebtPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken');
    let id = localStorage.getItem('id');
    console.log('ListInDebtPage componentDidMount')
    this.props.getInDebt(id, accessToken)
    .then(() => {
      console.log('componentDidMount', this.props)
    })
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
                        <th>Số Tiền</th>
                        <th>Ngày giao dịch</th>
                        <th>Ghi chú</th>
                        <th>Thanh toán</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.GetInDebtInfo.data.response &&
                        this.props.GetInDebtInfo.data.response.map((item, index)  => (
                          <tr >
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.debt_val}</td>
                            <td>{item.date_time.toString()}</td>
                            <td>{item.note}</td>    
                            <td><Link to={`/transfer?name=${item.name}`} className="alert-link"  >Thanh toán</Link>
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
}


const mapDispatchToProps = dispatch => ({
  getInDebt: (id, accessToken) => dispatch(getInDebt(id, accessToken))
});

const mapStateToProps = (state) => {
  return {
    GetInDebtInfo: state.GetInDebtInfo
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListInDebtPage)