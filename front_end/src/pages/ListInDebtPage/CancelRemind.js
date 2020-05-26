import React, {useCallback} from 'react';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../utils/useToggle";
import {useDispatch} from "react-redux";
import useInputChange from "../../utils/useInputChange";
import {DeleteInDebt, getInDebt} from "../../redux/actions/InDebt.action";
import {useHistory} from "react-router";

const CancelRemind = ({debtId}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalToggle = useToggle(false);
  const message = useInputChange("");
  console.log("debtId", debtId);

  const deleteReminder = useCallback((e) => {
    let uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      userDebtId: uid,
      debtId:debtId,
      message: message.value,
    }
    console.log("sdfsdf", data);
    dispatch(DeleteInDebt(data, accessToken))
        .then((response) => {
          console.log(response);
          const uid = localStorage.getItem('uid');
          dispatch(getInDebt(uid, accessToken))
              .then((response) => {
                history.go(0);
                console.log(response)
              })
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, message, debtId, history])

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


export default CancelRemind;