import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardGroup, Col, Container, Row, Table} from 'reactstrap'
import {createEmployee, deleteEmployee, editEmployee, fetchEmployee} from "../../redux/actions/employee.action";
import {formatFormalDate} from "../../utils/utils";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";

class ListEmployee extends Component {

  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken');
    let uid = localStorage.getItem('uid');
    this.props.fetchEmployee(uid, accessToken);
  }

  handleCreate(input) {
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');

    let data = {...input, uid: uid};
    this.props.createEmployee(data, accessToken).then(() => {
      this.props.fetchEmployee(uid, accessToken);
    })
  }


  handleEdit(data) {
    const uid = localStorage.getItem('uid');
    data = {...data, ownerId: uid};
    let accessToken = localStorage.getItem('accessToken');
    this.props.editEmployee(data, accessToken).then(() => {
      this.props.fetchEmployee(uid, accessToken);
    })
  }

  handleDelete(id) {
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    this.props.deleteEmployee(id, accessToken).then(() => {
      this.props.fetchEmployee(uid, accessToken);
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
                    <h3 className="col-centered table-heading">DANH SÁCH NHÂN VIÊN</h3>
                    <hr/>
                    <AddEmployee handleCreate={this.handleCreate}/>
                    <hr/>
                    <Table>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Ngày sinh</th>

                        <th>Sửa</th>
                        <th>Xóa</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        this.props.EmployeeStore.fetch.response && this.props.EmployeeStore.fetch.response.map((item, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.phone}</td>
                                  <td>{formatFormalDate(item.date_of_birth)}</td>

                                  <td><EditEmployee buttonLabel={'Sửa'} accountId={item.id} name={item.name}
                                                    accountNum={item.account_num} email={item.email} phone={item.phone}
                                                    date_of_birth={item.date_of_birth}
                                                    handleEdit={this.handleEdit}/>
                                  </td>
                                  <td><DeleteEmployee buttonLabel={'xóa'} accountId={item.id}
                                                      handleDelete={this.handleDelete}/>
                                  </td>
                                </tr>
                            )
                        )
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
  };
}

const mapDispatchToProps = dispatch => ({
  fetchEmployee: (id, accessToken) => dispatch(fetchEmployee(id, accessToken)),
  createEmployee: (item, accessToken) => dispatch(createEmployee(item, accessToken)),
  editEmployee: (item, accessToken) => dispatch(editEmployee(item, accessToken)),
  deleteEmployee: (id, accessToken) => dispatch(deleteEmployee(id, accessToken)),
});

const mapStateToProps = (state) => {
  return {
    EmployeeStore: state.EmployeeStore,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListEmployee);