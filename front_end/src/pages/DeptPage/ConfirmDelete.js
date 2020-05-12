import React, {useState, Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

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

export default ConfirmDelete;