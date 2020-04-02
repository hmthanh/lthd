import React from 'react';
import './MessageBox.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const MessageBox = ({isOpen, onClose, title, content}) => {

  return (
      <>
        <Modal isOpen={isOpen}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {content}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={onClose}>Đồng ý</Button>
          </ModalFooter>
        </Modal>
      </>
  );
};


export default MessageBox