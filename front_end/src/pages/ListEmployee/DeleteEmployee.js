import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const DeleteEmployee = ({handleDelete, accountId}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const deleteAccount = () => {
    handleDelete(accountId);
    setModal(!modal)
  };

  return (
      <>
        <Button color="danger" onClick={toggle}>
          <span style={{marginRight: "10px"}}>Xóa</span>
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </Button>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Xóa nhân viên</ModalHeader>
          <ModalBody>
            <strong>Bạn có chăc muốn xóa không ?</strong>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={deleteAccount}>Đồng ý</Button>{' '}
            <Button color="secondary" onClick={toggle}>Bỏ qua</Button>
          </ModalFooter>
        </Modal>
      </>
  );
};

export default DeleteEmployee;