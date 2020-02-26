import React, { Component, useState } from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form'
import {
  Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Modal, ModalBody,
  ModalFooter, ModalHeader, Table
} from 'reactstrap'
import { connect } from 'react-redux'
import { Create, Delete, Edit, Fetch } from '../redux/creators/nameReminscentCreator'
import Loading from '../components/Loading'

const required = (val) => val && val.length

const ModalAddNew = (props) => {
  const {
    buttonLabel,
    className,
    handleCreate
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    values = { ...values, banking: 0 }
    console.log(values)
    handleCreate(values)
    setModal(!modal)
  };

  return (
    <div>
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Thêm mới tài khoản</ModalHeader>
        <LocalForm id='create-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
          <ModalBody>
            <div className='form-group'>
              <label htmlFor='banking'>Ngân Hàng</label>
              <Control.select className='form-control' model=".banking" id='banking' name='banking'>
                <option value='0' defaultValue={true}>New Vimo</option>
              </Control.select>
            </div>

            <div className='form-group'>
              <label htmlFor='accountNum'>Số tài Khoản</label>
              <Control.text model='.accountNum' id='accountNum' name='accountNum'
                className='form-control' autoComplete='off'
                validators={{ required }} />
              <Errors className='text-danger' model='.accountNum' show="touched"
                messages={{ required: 'Required' }} />
            </div>
            <div className='form-group'>
              <label htmlFor='aliasName'>Tên gợi nhớ</label>
              <Control.text model='.aliasName' id='aliasName' name='aliasName'
                className='form-control' rows='6' autoComplete='off'
                validators={{ required }} />
              <Errors className='text-danger' model='.aliasName' show="touched"
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

const ModalEdit = (props) => {
  const {
    buttonLabel,
    className,
    handleEdit,
    accountNum,
    aliasName,
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
        <ModalHeader toggle={toggle}>Thêm mới tài khoản</ModalHeader>
        <LocalForm id='edit-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
          <ModalBody>
            <div className='form-group'>
              <label htmlFor='accountNum'>Số tài Khoản</label>
              <Control.text model='.accountNum' id='accountNum' name='accountNum'
                className='form-control' autoComplete='off'
                validators={{ required }} defaultValue={accountNum} disabled={true} />
              <Errors className='text-danger' model='.accountNum' show="touched"
                messages={{ required: 'Required' }} />
            </div>
            <div className='form-group'>
              <label htmlFor='aliasName'>Tên gợi nhớ</label>
              <Control.text model='.aliasName' id='aliasName' name='aliasName'
                className='form-control' rows='6' autoComplete='off'
                validators={{ required }} defaultValue={aliasName} />
              <Errors className='text-danger' model='.aliasName' show="touched"
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

class SettingReceiver extends Component {

  constructor(props) {
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.Fetch(localStorage.getItem('uid'));
  }

  handleCreate(data) {
    const uid = localStorage.getItem('uid')
    console.log('localStorage.getItem("uid")', uid)
    data = { ...data, ownerId: uid }
    this.props.Create(data).then(() => {
      this.props.Fetch(uid);
    })
  }

  handleEdit(data) {
    const uid = localStorage.getItem('uid')
    data = { ...data, ownerId: uid }
    this.props.Edit(data).then(() => {
      this.props.Fetch(uid);
    })
  }

  handleDelete(id) {
    const uid = localStorage.getItem('uid')
    this.props.Delete(id).then(() => {
      this.props.Fetch(uid);
    })
  }

  render() {
    if (this.props.Reminscent.isLoading) {
      return (
        <Loading/>
      )
    } else
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Thiết Lập Danh Sách Người Nhận</BreadcrumbItem>
        </Breadcrumb>
        <ModalAddNew buttonLabel={'Thêm Mới'} handleCreate={this.handleCreate} />
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Số Tài Khoản</th>
              <th>Tên Gợi Nhớ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.Reminscent.data.item &&
              this.props.Reminscent.data.item.map((item, index) => {
                console.log(this.props.Reminscent)
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.account_num}</td>
                    <td>{item.alias_name}</td>
                    <td>
                      <ButtonToolbar>
                        <ButtonGroup>
                          <ModalEdit buttonLabel={'Sửa'} accountId={item.id} accountNum={item.account_num} aliasName={item.alias_name} handleEdit={this.handleEdit} />
                          {' '}
                          <ConfirmDelete buttonLabel={'xóa'} accountId={item.id} handleDelete={this.handleDelete}/>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  Create: (item) => dispatch(Create(item)),
  Edit: (item) => dispatch(Edit(item)),
  Delete: (id) => dispatch(Delete(id)),
  Fetch: (id) => dispatch(Fetch(id))
})

const mapStateToProps = (state) => {
  return {
    Reminscent: state.Reminscent
  }
}

// export default SettingReceiver
export default connect(mapStateToProps, mapDispatchToProps)(SettingReceiver)