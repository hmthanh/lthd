import React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
const MessageBox = ({isOpen, onClose, title, content}) => {

  return (
      <>
        <Modal isOpen={isOpen}>
          <ModalHeader className="padding-header">{title}</ModalHeader>
          <ModalBody className="padding-body">
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