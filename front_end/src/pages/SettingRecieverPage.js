import React, { Component, useState } from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form'
import {
  Container, Row, Col, Breadcrumb, BreadcrumbItem, Table,
  Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup, ButtonToolbar
} from 'reactstrap'
import { connect } from 'react-redux'
import { Create, Edit, Delete, Fetch } from '../redux/creators/nameReminscentCreator';

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
    console.log(values)
    setModal(!modal)
  }

  return (
    <div>
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Thêm mới tài khoản</ModalHeader>
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
    aliasName
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    console.log(values)
    setModal(!modal)
  }

  return (
    <div>
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Thêm mới tài khoản</ModalHeader>
        <LocalForm id='create-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
          <ModalBody>
            <div className='form-group'>
              <label htmlFor='accountNum'>Số tài Khoản</label>
              <Control.text model='.accountNum' id='accountNum' name='accountNum'
                className='form-control' autoComplete='off'
                validators={{ required }} value={accountNum} disabled={true} />
              <Errors className='text-danger' model='.accountNum' show="touched"
                messages={{ required: 'Required' }} />
            </div>
            <div className='form-group'>
              <label htmlFor='aliasName'>Tên gợi nhớ</label>
              <Control.text model='.aliasName' id='aliasName' name='aliasName'
                className='form-control' rows='6' autoComplete='off'
                validators={{ required }} value={aliasName}/>
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

class SettingReceiver extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Thiết Lập Danh Sách Người Nhận</BreadcrumbItem>
        </Breadcrumb>
        <ModalAddNew buttonLabel={'Thêm Mới'} />
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <ButtonToolbar>
                  <ButtonGroup>
                    <ModalEdit buttonLabel={'Sửa'} />
                    <Button color='danger'>xóa</Button>
                    <Button color='primary'>sửa</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
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
});

const mapStateToProps = (state) => {
  return {
    Reminscent: state.Reminscent
  }
}

// export default SettingReceiver
export default connect(mapStateToProps, mapDispatchToProps)(SettingReceiver);