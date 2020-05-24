import React, {useEffect, useState} from 'react'
import {Control, Errors, LocalForm} from 'react-redux-form'
import {Button, ButtonGroup, ButtonToolbar, Card, Collapse, Container, Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Create, Delete, Edit, Fetch} from '../../redux/creators/nameReminscentCreator'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../utils/useToggle";
import CreateReceiver from "./CreateReceiver";

const required = (val) => val && val.length;

const ModalAddNew = (props) => {
  const {
    className,
    handleCreate
  } = props;
  const modalToggle = useToggle(false);

  const handleSubmit = (values) => {
    values = {...values, banking: 0};
    console.log(values);
    handleCreate(values);
    modalToggle.toggle();
  };

  return (
      <>
        <Button color="success" onClick={modalToggle.setActive}>
          <span style={{marginRight: "10px", paddingLeft: "10px"}}>Thêm mới</span>
          <FontAwesomeIcon style={{marginRight: "10px"}} icon={faUser}></FontAwesomeIcon>
        </Button>
        <hr/>
        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle} className={className}>
          <ModalHeader toggle={modalToggle.toggle}>Thêm mới tài khoản</ModalHeader>
          <ModalBody>
            <LocalForm id='create-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
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
                              validators={{required}}/>
                <Errors className='text-danger' model='.accountNum' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
              <div className='form-group'>
                <label htmlFor='aliasName'>Tên gợi nhớ</label>
                <Control.text model='.aliasName' id='aliasName' name='aliasName'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}}/>
                <Errors className='text-danger' model='.aliasName' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
            </LocalForm>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-primary">Đồng ý</button>
          </ModalFooter>
        </Modal>
      </>
  );
};

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
    values = {...values, id: accountId};
    handleEdit(values);
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
                              validators={{required}} defaultValue={accountNum} disabled={true}/>
                <Errors className='text-danger' model='.accountNum' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
              <div className='form-group'>
                <label htmlFor='aliasName'>Tên gợi nhớ</label>
                <Control.text model='.aliasName' id='aliasName' name='aliasName'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}} defaultValue={aliasName}/>
                <Errors className='text-danger' model='.aliasName' show="touched"
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
      <>
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
      </>
  );
};

const ListReceiver = () => {
  const dispatch = useDispatch();
  const Reminscent = useSelector(state => {
    return state.AliasReceiver
  });
  const createToggle = useToggle(false);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    console.log(accessToken);
    dispatch(Fetch(uid, accessToken))
        .then((response) => {
          console.log(response)
        });
  }, [dispatch])

  const handleCreate = (data) => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    data = {...data, ownerId: uid};
    dispatch(Create(data, accessToken))
        .then((response) => {
          console.log(response);
          dispatch(Fetch(uid, accessToken))
              .then((response) => {
                console.log(response)
              });
        })
  }

  const handleEdit = (data) => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    data = {...data, ownerId: uid};
    dispatch(Edit(data, accessToken))
        .then(response => {
          console.log(response);
          dispatch(Fetch(uid, accessToken))
              .then(res => {
                console.log(res);
              })
        })
  }

  const handleDelete = (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    dispatch(Delete(id, accessToken))
        .then((response) => {
          console.log(response);
          dispatch(Fetch(uid, accessToken))
              .then((response) => {
                console.log(response)
              });
        })
  }

  const handleCreateReceiver = (e) => {
    createToggle.setActive();
  }

  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <CreateReceiver isOpen={createToggle.active}/>
        <Collapse isOpen={!createToggle.active}>
          <Card className="p-6">
            <div className="card-block" style={{padding: "20px 40px"}}>
              <h3 className="col-centered table-heading">DANH SÁCH NGƯỜI NHẬN</h3>
              {/*<ModalAddNew handleCreate={handleCreate}/>*/}
              <Button color="success" onClick={handleCreateReceiver}>
                <FontAwesomeIcon style={{marginLeft: "40px"}} icon={faUser}></FontAwesomeIcon>
                <span style={{marginLeft: "5px", paddingRight: "40px"}}>Tạo người nhận</span>
              </Button>
              <hr/>
              <Table striped>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Số Tài Khoản</th>
                  <th>Tên Gợi Nhớ</th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {
                  Reminscent.data.item &&
                  Reminscent.data.item.map((item, index) => {
                    console.log(this.props.Reminscent);
                    return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.account_num}</td>
                          <td>{item.alias_name}</td>
                          <td>
                            <ButtonToolbar>
                              <ButtonGroup>
                                <ModalEdit buttonLabel={'Sửa'} accountId={item.id} accountNum={item.account_num}
                                           aliasName={item.alias_name} handleEdit={handleEdit}/>

                              </ButtonGroup>
                            </ButtonToolbar>
                          </td>
                          <td>
                            <ButtonToolbar>
                              <ButtonGroup>
                                <ConfirmDelete buttonLabel={'Xóa'} accountId={item.id}
                                               handleDelete={handleDelete}/>
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
          </Card>
        </Collapse>
      </Container>
  )
}
//
// const mapDispatchToProps = dispatch => ({
//   Create: (item, accessToken) => dispatch(Create(item, accessToken)),
//   Edit: (item, accessToken) => dispatch(Edit(item, accessToken)),
//   Delete: (id, accessToken) => dispatch(Delete(id, accessToken)),
//   Fetch: (id, accessToken) => dispatch(Fetch(id, accessToken))
// });
//
// const mapStateToProps = (state) => {
//   return {
//     Reminscent: state.Reminscent
//   }
// };

export default ListReceiver;