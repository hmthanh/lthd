import React, {useCallback} from 'react';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../utils/useToggle";
import {useDispatch} from "react-redux";
import {Delete, fetchDebtReminder} from "../../redux/actions/debt.action";
import useInputChange from "../../utils/useInputChange";
import {useHistory} from "react-router";

const CancelDebt = ({debtId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalToggle = useToggle(false);
  const message = useInputChange("");

  const deleteReminder = useCallback((e) => {
    let uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      message: message.value,
      ownerId: uid,
      debtId: debtId,
    }
    dispatch(Delete(data, accessToken))
        .then((response) => {
          console.log(response);
          const uid = localStorage.getItem('uid');
          dispatch(fetchDebtReminder(uid, accessToken))
              .then((response) => {
                console.log(response);
                modalToggle.setInActive();
                history.go(0);
              })
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, message, modalToggle, debtId, history])

  return (
      <>
        <Button color="danger" onClick={modalToggle.setActive}>
          <span style={{marginRight: "10px"}}>Hủy nhắc nợ</span>
          <FontAwesomeIcon  icon={faTrash}></FontAwesomeIcon>
        </Button>

        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle}>
          <ModalHeader className="padding-header" toggle={modalToggle.toggle}>Xóa nhắc nợ</ModalHeader>
          <ModalBody className="padding-body">
            <FormGroup>
              <Label for="message">Nội dung hủy nhắc nợ</Label>
              <Input type="textarea" name="message"
                     value={message.value}
                     onChange={message.onChange}
                     id="message"/>
            </FormGroup>
            <strong>Bạn có chăc muốn hủy nhắc nợ không ?</strong>
          </ModalBody>
          <ModalFooter className="padding-footer">
            <Button color="danger"
                    className="d-flex align-items-center justify-content-center"
                    onClick={deleteReminder}>
              <span style={{padding: "0px 40px"}}>Hủy nhắc nợ</span></Button>
            <Button color="light"
                    className="d-flex align-items-center justify-content-center"
                    onClick={modalToggle.setInActive}>
              <span style={{padding: "0px 40px"}}>Bỏ qua</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
}


export default CancelDebt;