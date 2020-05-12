import React, {useState} from 'react';

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Control, Errors, LocalForm} from "react-redux-form";
const required = (val) => val && val.length;

const ModalEdit = (props) => {
  const {
    buttonLabel,
    className,
    handleEdit,
    accountNum,
    debtval,
    note,
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
                <label htmlFor='accountNum'>Số tài Khoản</label>
                <Control.text model='.accountNum' id='accountNum' name='accountNum'
                              className='form-control' autoComplete='off'
                              validators={{required}} defaultValue={accountNum} disabled={true}/>
                <Errors className='text-danger' model='.accountNum' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
              <div className='form-group'>
                <label htmlFor='debtval'>Số tiền</label>
                <Control.text model='.debtval' id='debtval' name='debtval'
                              className='form-control' rows='6' autoComplete='off'
                              defaultValue={debtval} disabled={true}/>
                <Errors className='text-danger' model='.debtval' show="touched"
                />
              </div>

              <div className='form-group'>
                <label htmlFor='note'>Ghi chú</label>
                <Control.text model='.note' id='note' name='note'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}} defaultValue={note}/>
                <Errors className='text-danger' model='.note' show="touched"
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

export default ModalEdit;