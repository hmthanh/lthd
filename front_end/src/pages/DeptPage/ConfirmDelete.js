import React, {useCallback} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../utils/useToggle";
import {useDispatch} from "react-redux";
import {Delete, getAllDebt} from "../../redux/creators/debtCreator";

const ConfirmDelete = ({accountId}) => {
  const dispatch = useDispatch();
  const modalToggle = useToggle(false);

  const deleteReminder = useCallback((e) => {
    let accessToken = localStorage.getItem('accessToken');
    dispatch(Delete(accountId, accessToken))
        .then((response) => {
          console.log(response);
          const uid = localStorage.getItem('uid');
          dispatch(getAllDebt(uid, accessToken))
              .then((response) => {
                console.log(response);
                modalToggle.setInActive();
              })
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, modalToggle, accountId])

  return (
      <>
        <Button color="danger" onClick={modalToggle.setActive}>
          <span style={{marginRight: "10px"}}>Xóa</span>
          <FontAwesomeIcon  icon={faTrash}></FontAwesomeIcon>
        </Button>

        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle}>
          <ModalHeader className="padding-header" toggle={modalToggle.toggle}>Xóa nhắc nợ</ModalHeader>
          <ModalBody className="padding-body">
            Bạn có chăc muốn xóa không
          </ModalBody>
          <ModalFooter className="padding-footer">
            <Button color="primary"
                    className="d-flex align-items-center justify-content-center"
                    onClick={deleteReminder}>
              <span style={{padding: "0px 40px"}}>Xóa nhắc nợ</span></Button>
            <Button color="light"
                    className="d-flex align-items-center justify-content-center"
                    onClick={modalToggle.setInActive}>
              <span style={{padding: "0px 40px"}}>Bỏ qua</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
}


export default ConfirmDelete;