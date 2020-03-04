import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap'
import { getAllHistory } from '../redux/creators/historyInfoCreator'

class HistoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid')
    console.log('componentDidMount ' + uid)
    this.props.getAll(uid)
  }


  render() {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card-group mb-0">
              <div className="card p-6">
                <div className="card-block">
                  <h1 className="col-centered table-heading">Lịch sử giao dịch</h1>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Ngày giao dịch</th>
                        <th>Loại giao dịch</th>
                        <th>Tài khoản giao dịch</th>
                        <th>Tài khoản thụ hưởng</th>
                        <th>Số tiền</th>
                        <th>Số dư</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.HistoryInfo.data.item &&
                        this.props.HistoryInfo.data.item.map(item => (
                          <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{ new Intl.DateTimeFormat('vi-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: '2-digit',

                                }).format(new Date(item.timestamp))}</td>
                            <td>{item.type === 1 ? 'Cộng tiền' : 'Trừ tiền'}</td>
                            <td>{item.from_account}</td>
                            <td>{item.to_account}</td>
                            <td>{item.amount}</td>
                            <td>{item.surplus}</td>
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
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getAll: (id) => dispatch(getAllHistory(id))
})

const mapStateToProps = (state) => {
  return {
    HistoryInfo: state.HistoryInfo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)