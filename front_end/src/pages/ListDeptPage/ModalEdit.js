import React, {useCallback} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import {useDispatch} from "react-redux";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {Edit, fetchDebtReminder} from "../../redux/actions/debt.action";

const ModalEdit = ({accountId, accountNum, note, money, name}) => {
  const dispatch = useDispatch();
  const modalToggle = useToggle(false);
  const message = useInputChange(note);

  const reminderDept = useCallback((e) => {
    e.preventDefault();
    let data = {
      uid: accountId,
      note: message.value
    };
    console.log(data);
    let accessToken = localStorage.getItem('accessToken');
    dispatch(Edit(data, accessToken))
        .then((response) => {
          console.log(response);
          const uid = localStorage.getItem('uid');
          dispatch(fetchDebtReminder(uid, accessToken))
              .then((response) => {
                console.log(response);
                modalToggle.setInActive();
              })
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, accountId, message, modalToggle]);


  return (
      <>
        <Button color="success" onClick={modalToggle.setActive}>
          <span style={{marginRight: "10px"}}>Nhắc nợ</span>
          <FontAwesomeIcon  icon={faBell}></FontAwesomeIcon>
        </Button>

        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle}>
          <ModalHeader className="padding-header" toggle={modalToggle.toggle}>Sửa nhắc nợ</ModalHeader>
          <ModalBody className="padding-body">
            <Form method="post" noValidate="novalidate"
                  className="needs-validation" onSubmit={reminderDept}>
              <Label for="accountNum">Thông tin tài khoản <ShowRequire/></Label>
              <FormGroup>
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Số tài khoản</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text"
                         name="accountNum"
                         id="accountNum"
                         value={accountNum}
                         disabled={true}/>
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Họ và tên</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text"
                         name="name"
                         id="name"
                         disabled={true}
                         value={name}/>
                </InputGroup>
              </FormGroup>
              <hr/>
              <FormGroup>
                <Label for="money">Số tiền <ShowRequire/></Label>
                <Input type="number"
                       name="money"
                       id="money"
                       disabled={true}
                       value={money}/>
              </FormGroup>

              <FormGroup>
                <Label for="message">Ghi chú</Label>
                <Input type="textarea"
                       name="message"
                       id="message"
                       value={message.value}
                       onChange={message.onChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className="padding-footer">
            <Button color="primary"
                    className="d-flex align-items-center justify-content-center"
                    onClick={reminderDept}>
              <span style={{padding: "0px 40px"}}>Gửi nhắc nợ</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
};

export default ModalEdit;