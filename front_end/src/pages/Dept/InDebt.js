import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap'
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
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card-group mb-0">
              <div className="card p-6">
                <div className="card-block">
                  <h1 className="col-centered table-heading">Danh sách nợ</h1>
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
              </div>
            </div>
          </div>
        </div>
      </div>
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