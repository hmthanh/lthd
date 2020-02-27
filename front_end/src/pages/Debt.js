import React, { Component, useState } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form'
import {
  Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Modal, ModalBody,
  ModalFooter, ModalHeader, Table
} from 'reactstrap'
import { connect } from 'react-redux';
import { getAllDebt, Create, Delete, Edit } from '../redux/creators/debtCreator';
import Loading from '../components/Loading';




const required = (val) => val && val.length;

const ModalAddNew = (props) => {
  const {
    buttonLabel,
    className,
    handleCreate
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    values = { ...values,datetime:Date().toString()}
    console.log(values)
    handleCreate(values)
    setModal(!modal)
  };

  return (
    <div>
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Thêm mới nợ</ModalHeader>
        <LocalForm id='create-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
          <ModalBody>
          

            <div className='form-group'>
              <label htmlFor='accountNum'>Số tài Khoản</label>
              <Control.text model='.accountNum' id='accountNum' name='accountNum'
                className='form-control' autoComplete='off'
                validators={{ required }} />
              <Errors className='text-danger' model='.accountNum' show="touched"
                messages={{ required: 'Required' }} />
            </div>
            <div className='form-group'>
              <label htmlFor='debtval'>Số tiền</label>
              <Control.text model='.debtval' id='debtval' name='debtval'
                className='form-control' rows='6' autoComplete='off'
                validators={{ required }} />
              <Errors className='text-danger' model='.debtval' show="touched"
                messages={{ required: 'Required' }} />
            </div>

            <div className='form-group'>
              <label htmlFor='note'>Ghi chú</label>
              <Control.text model='.note' id='note' name='note'
                className='form-control' rows='6' autoComplete='off'
                validators={{ required }} />
              <Errors className='text-danger' model='.note' show="touched"
                messages={{ required: 'Required' }} />
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




const ModalEdit = (props) => {
  const {
    buttonLabel,
    className,
    handleEdit,
    accountNum,
    debtval,
    datetime,
    note,
    accountId
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    values = {...values, id: accountId}
    handleEdit(values)
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
              <label htmlFor='accountNum'>Số tài Khoản</label>
              <Control.text model='.accountNum' id='accountNum' name='accountNum'
                className='form-control' autoComplete='off'
                validators={{ required }} defaultValue={accountNum} />
              <Errors className='text-danger' model='.accountNum' show="touched"
                messages={{ required: 'Required' }} />
            </div>
            <div className='form-group'>
              <label htmlFor='debtval'>Số tiền</label>
              <Control.text model='.debtval' id='debtval' name='debtval'
                className='form-control' rows='6' autoComplete='off'
                validators={{ required }} defaultValue={debtval} />
              <Errors className='text-danger' model='.debtval' show="touched"
                />
            </div>

            <div className='form-group'>
              <label htmlFor='note'>Ghi chú</label>
              <Control.text model='.note' id='note' name='note'
                className='form-control' rows='6' autoComplete='off'
                validators={{ required }} />
              <Errors className='text-danger' model='.note' show="touched"
                messages={{ required: 'Required' }} />
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-primary">Đồng ý</button>
          </ModalFooter>

        </LocalForm>


      </Modal>
    </div>
  );
}

const ConfirmDelete = (props) => {
  const {
    buttonLabel,
    className,
    handleDelete,
    accountId
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal)
  const deleteAccount = () => {
    handleDelete(accountId)
    setModal(!modal)
  }

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
}




class debtPage extends Component {

  constructor(props) {
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('accessToken')
    let uid = localStorage.getItem('uid');
    this.props.getAll(uid, accessToken);
  }

  handleCreate(data) {
    const uid = localStorage.getItem('uid')
    console.log('localStorage.getItem("uid")', uid)
    data = { ...data, ownerId: uid }
    this.props.Create(data).then(() => {
      this.props.getAll(uid);
    })
  }

  handleEdit(data) {
    const uid = localStorage.getItem('uid')
    data = { ...data, ownerId: uid }
    this.props.Edit(data).then(() => {
      this.props.getAll(uid);
    })
  }

  handleDelete(id) {
    const uid = localStorage.getItem('uid')
    this.props.Delete(id).then(() => {
      this.props.getAll(uid);
    })
  }

  


  render() {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card-group mb-0">
              <div className="card p-6">
                <div className="card-block">
                  <h1>Danh sách nhắc nợ</h1>
                  <ModalAddNew buttonLabel={'Thêm Mới'} handleCreate={this.handleCreate} />
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
                            <td>{it.date_time.toString()}</td>
                            <td>{it.note}</td>
                            <td><ModalEdit buttonLabel={'Nhắc'} accountId={it.id} datetime={it.date_time} note={it.note} accountNum={it.account_num} debtval={it.debt_val} handleEdit={this.handleEdit} />
                          {' '}</td>
                          <td><ConfirmDelete buttonLabel={'xóa'} accountId={it.id} handleDelete={this.handleDelete}/>
                          </td>
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
  getAll: (id) => dispatch(getAllDebt(id)),
  Create: (item) => dispatch(Create(item)),
  Edit: (item) => dispatch(Edit(item)),
  Delete: (id) => dispatch(Delete(id))
});

const mapStateToProps = (state) => {
  return {
    DebtInfo: state.DebtInfo,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(debtPage);