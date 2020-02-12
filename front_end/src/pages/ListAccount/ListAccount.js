import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Table } from 'reactstrap'
import { getAllHistory } from '../../redux/creators/historyInfoCreator'

class ListAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getAll(1);
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
                        <th>Người gửi</th>
                        <th>Người nhận</th>
                        <th>Số tiền</th>
                        <th>Số dư</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.HistoryInfo.data.val &&
                        // console.log(this.props.HistoryInfo.data.val)
                        this.props.HistoryInfo.data.val.map(item => (
                          <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.day.toString()}</td>
                            <td>{item.type}</td>
                            <td>{item.send}</td>
                            <td>{item.recieve}</td>
                            <td>{item.money}</td>
                            <td>{item.excess}</td>
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
  getAll: (id) => dispatch(getAllHistory(id))
});

const mapStateToProps = (state) => {
  return {
    HistoryInfo: state.AccountInfo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAccount);