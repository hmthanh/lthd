import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Card, CardGroup, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap'
import {Control, Errors, LocalForm} from 'react-redux-form'
import {Delete, Edit, getAllStaff} from "../../redux/creators/staffCreator";
import {formatFormalDate} from "../../utils/utils";


const required = (val) => val && val.length;
// const ListStaffPage = () => {
//   const dispatch = useDispatch();
//   const listStaff = useSelector((state) => {
//     return state.StaffInfo.data
//   });

//   useEffect(() => {
//     const uid = localStorage.getItem('uid');
//     const accessToken = localStorage.getItem('accessToken');
//     dispatch(getAllStaff(uid, accessToken))
//         .then((response) => {
//           console.log(response);
//         });
//   }, [dispatch]);


const ModalEdit = (props) => {
  const {
    buttonLabel,
    className,
    handleEdit,
    accountNum,
    phone,
    email,
    name,
    accountId
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    values = {...values, id: accountId};
    handleEdit(values);
    setModal(!modal)
  };

  return (
      <div>
        <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Nhắc nợ</ModalHeader>
          <LocalForm id='edit-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
            <ModalBody>
              <div className='form-group'>
                <label htmlFor='name'>Tên</label>
                <Control.text model='.name' id='name' name='name'
                              className='form-control' autoComplete='off'
                              validators={{required}} defaultValue={name}/>
                <Errors className='text-danger' model='.name' show="touched"
                        messages={{required: 'Required'}}/>
              </div>

              <div className='form-group'>
                <label htmlFor='accountNum'>Số tài Khoản</label>
                <Control.text model='.accountNum' id='accountNum' name='accountNum'
                              className='form-control' autoComplete='off'
                              validators={{required}} defaultValue={accountNum} disabled={true}/>
                <Errors className='text-danger' model='.accountNum' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
              <div className='form-group'>
                <label htmlFor='phone'>Phone</label>
                <Control.text model='.phone' id='phone' name='phone'
                              className='form-control' rows='6' autoComplete='off'
                              defaultValue={phone}/>
                <Errors className='text-danger' model='.phone' show="touched"
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <Control.text model='.email' id='email' name='email'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}} defaultValue={email} disabled={true}/>
                <Errors className='text-danger' model='.email' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-primary">Đồng ý</button>
            </ModalFooter>

          </LocalForm>


        </Modal>
      </div>
  );
};

const ConfirmDelete = (props) => {
  const {
    buttonLabel,
    className,
    handleDelete,
    accountId
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const deleteAccount = () => {
    handleDelete(accountId);
    setModal(!modal)
  };

  return (
      <div>
        <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>xóa</ModalHeader>
          <ModalBody>
            bạn có chăc muốn xóa không
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={deleteAccount}>đồng ý</Button>{' '}
            <Button color="secondary" onClick={toggle}>bỏ qua</Button>
          </ModalFooter>
        </Modal>
      </div>
  );
};


class ListStaffPage extends Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken');
    let uid = localStorage.getItem('uid');
    this.props.getAllStaff(uid, accessToken);
  }


  handleEdit(data) {
    const uid = localStorage.getItem('uid');
    data = {...data, ownerId: uid};
    let accessToken = localStorage.getItem('accessToken');
    this.props.Edit(data, accessToken).then(() => {
      this.props.getAllStaff(uid, accessToken);
    })
  }

  handleDelete(id) {
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    this.props.Delete(id, accessToken).then(() => {
      this.props.getAllStaff(uid, accessToken);
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
                    <Table>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Ngày sinh</th>
                        <th>Số tài khoản</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        this.props.StaffInfo.data.response && this.props.StaffInfo.data.response.map((item, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.phone}</td>
                                  <td>{formatFormalDate(item.date_of_birth)}</td>
                                  <td>{item.account_num}</td>
                                  <td><ModalEdit buttonLabel={'Sửa'} accountId={item.id} name={item.name}
                                                 accountNum={item.account_num} email={item.email} phone={item.phone}
                                                 date_of_birth={item.date_of_birth}
                                                 handleEdit={this.handleEdit}/>
                                  </td>
                                  <td><ConfirmDelete buttonLabel={'xóa'} accountId={item.id}
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
  getAllStaff: (id, accessToken) => dispatch(getAllStaff(id, accessToken)),
  Edit: (item, accessToken) => dispatch(Edit(item, accessToken)),
  Delete: (id, accessToken) => dispatch(Delete(id, accessToken))
});

const mapStateToProps = (state) => {
  return {
    StaffInfo: state.StaffInfo,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStaffPage);