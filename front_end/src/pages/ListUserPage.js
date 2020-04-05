import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap'
import { getAllUser } from '../redux/creators/UserCreator'

class ListUserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    //const uid = localStorage.getItem('uid')
    this.props.getAllUser()
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card-group mb-0">
              <div className="card p-6">
                <div className="card-block">
                  <h1 className="col-centered table-heading">Danh sách khách hàng</h1>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Ngày sinh</th>
                        <th>Số tài khoản</th>
                              
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.ListUserInfo.data.val &&
                        this.props.ListUserInfo.data.val.map((item, index)  => (
                          <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.date_of_birth.toString()}</td>
                            <td>{item.account_num}</td> 
                    
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
  getAllUser: () => dispatch(getAllUser())
});

const mapStateToProps = (state) => {
  return {
    ListUserInfo: state.ListUserInfo
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUserPage)