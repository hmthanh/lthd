import React, {useState, Component} from 'react';
import {Control, Errors, LocalForm} from 'react-redux-form'
import {Button, Card, CardGroup, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap'
import {connect, useDispatch} from 'react-redux';
import {Create, Delete, Edit, getAllDebt} from '../../redux/creators/debtCreator';
import {formatFormalDate} from "../../utils/utils";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import ConfirmDelete from "./ConfirmDelete";


class DebtPage extends Component{
  // const DebtPage = () => {
  //   const dispatch = useDispatch();
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  // useEffect(() => {
  //   let accessToken = localStorage.getItem('accessToken');
  //   console.log('DebtPage ' + accessToken);
  //   let uid = localStorage.getItem('uid');
  //   dispatch(getAll(uid, accessToken))
  //       .then((response) => {
  //         console.log(response)
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // }, [dispatch])

  componentDidMount()
  {
    let accessToken = localStorage.getItem('accessToken');
    console.log('DebtPage ' + accessToken);
    let uid = localStorage.getItem('uid');
    this.props.getAll(uid, accessToken);
  }

  handleEdit(data)
  {
    const uid = localStorage.getItem('uid');
    data = {...data, ownerId: uid};
    let accessToken = localStorage.getItem('accessToken');
    this.props.Edit(data, accessToken).then(() => {
      this.props.getAll(uid, accessToken);
    })
  }

  handleDelete(id)
  {
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    this.props.Delete(id, accessToken).then(() => {
      this.props.getAll(uid, accessToken);
    })
  }


  render()
  {
    return (
        <Container className="container" style={{marginTop: '20px'}}>
          <Row className="justify-content-center">
            <Col md={12}>
              <CardGroup className=" mb-0">
                <Card className="p-6">
                  <div className="card-block" style={{padding: "20px 40px"}}>
                    <h3 className="col-centered table-heading">DANH SÁCH NHẮC NỢ</h3>
                    <ModalAddNew/>
                    <hr/>
                    <Table>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên Tài Khoản</th>
                        <th>Số Tài Khoản</th>
                        <th>Số Tiền</th>
                        <th>Ngày giao dịch</th>
                        <th>Ghi chú</th>
                        <th>Nhắc nhở</th>

                        <th>Xóa</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        this.props.DebtInfo.data.item &&
                        this.props.DebtInfo.data.item.map((it, index) => (
                            <tr key={it.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{it.name}</td>
                              <td>{it.account_num}</td>
                              <td>{it.debt_val}</td>
                              <td>{formatFormalDate(it.date_time)}</td>
                              <td>{it.note}</td>
                              <td><ModalEdit buttonLabel={'Nhắc'} accountId={it.id} note={it.note}
                                             accountNum={it.account_num} debtval={it.debt_val}
                                             handleEdit={this.handleEdit}/>
                                {' '}</td>
                              <td><ConfirmDelete buttonLabel={'xóa'} accountId={it.id}
                                                 handleDelete={this.handleDelete}/>
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
  getAll: (id, accessToken) => dispatch(getAllDebt(id, accessToken)),
  Edit: (item, accessToken) => dispatch(Edit(item, accessToken)),
  Delete: (id, accessToken) => dispatch(Delete(id, accessToken))
});

const mapStateToProps = (state) => {
  return {
    DebtInfo: state.DebtInfo,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtPage);