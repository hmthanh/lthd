import React, {useCallback, useState} from 'react';
import {Alert, Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../utils/useToggle";
import {useDispatch} from "react-redux";
import {DeleteAlias, FetchAlias} from "../../redux/actions/aliasReceiver.action";

const DeleteAliasReceiver = ({accountId}) => {
  const dispatch = useDispatch();
  const modalToggle = useToggle(false);
  const alertToggle = useToggle(false);
  const [errorMsg, setErrorMsg] = useState("");

  const deleteAlias = useCallback((e) => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    dispatch(DeleteAlias(accountId, accessToken))
        .then((response) => {
          console.log(response);
          if (parseInt(response.errorCode) === 0) {
            dispatch(FetchAlias(uid, accessToken))
                .then((response) => {
                  console.log(response)
                });
          } else {
            alertToggle.setActive();
            setErrorMsg("Đã xảy ra lỗi");
          }
        })
  }, [dispatch, accountId, alertToggle])

  return (
      <>
        <Button color="danger" onClick={modalToggle.setActive}>
          <span style={{marginRight: "10px"}}>Xóa tên gợi nhớ</span>
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </Button>

        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle}>
          <ModalHeader className="padding-header" toggle={modalToggle.toggle}>Xóa tên gợi nhớ</ModalHeader>
          <ModalBody className="padding-body">
            <strong>Bạn có chăc muốn xóa không ?</strong>
            <hr/>
            <Collapse isOpen={alertToggle.active}>
              <Alert color="danger" toggle={alertToggle.setInActive}>
                <h6>Tạo tên gợi nhớ thất bại</h6>
                <hr/>
                <p>{errorMsg}</p>
              </Alert>
            </Collapse>
          </ModalBody>
          <ModalFooter className="padding-footer">
            <Button color="danger"
                    className="d-flex align-items-center justify-content-center"
                    onClick={deleteAlias}>
              <span style={{padding: "0px 40px"}}>Xóa tên gợi nhớ</span></Button>
            <Button color="light"
                    className="d-flex align-items-center justify-content-center"
                    onClick={modalToggle.setInActive}>
              <span style={{padding: "0px 40px"}}>Bỏ qua</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
}


export default DeleteAliasReceiver;