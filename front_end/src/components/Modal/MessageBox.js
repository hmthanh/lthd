import React from 'react';
import './MessageBox.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const MessageBox = ({className, isOpen, onClose, messageId, moneyTransfer, numberAccount}) => {
  const titleMessage = ["", "Nạp tiền thất bại", "Nạp tiền thành công"];
  const contentMessage = ["", "Đã xảy ra lỗi\nVui lòng kiểm tra lại", "Đã nạp " + moneyTransfer + " VNĐ vào tài khoản " + numberAccount + "  thành công"];
  return (
      <>
        <Modal isOpen={isOpen} className={className}>
          <ModalHeader>{titleMessage[messageId]}</ModalHeader>
          <ModalBody>
            {contentMessage[messageId]}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={onClose}>Đồng ý</Button>
          </ModalFooter>
        </Modal>
      </>
  );
};


export default MessageBox