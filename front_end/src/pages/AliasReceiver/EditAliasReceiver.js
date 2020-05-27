import React, {useCallback, useState} from 'react';
import {
  Alert,
  Button,
  Collapse,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../utils/useToggle";
import {useDispatch, useSelector} from "react-redux";
import {EditAlias, FetchAlias} from "../../redux/actions/aliasReceiver.action";
import useInputRequire from "../../utils/useInputRequire";
import ShowRequire from "../../components/ShowRequire/ShowRequire";

const EditAliasReceiver = ({accountId, accountNum, aliasName}) => {
  const dispatch = useDispatch();
  const modalToggle = useToggle(false);
  const alertToggle = useToggle(false);
  const [errorMsg, setErrorMsg] = useState("");
  const editAliasReceiver = useSelector(state => state.AliasReceiver.edit);
  const aliasNameEdit = useInputRequire({
    value: aliasName,
    valid: false,
    invalid: false,
    inValidMsg: ""
  })
  const editAlias = useCallback((e) => {
        const uid = localStorage.getItem('uid');
        const accessToken = localStorage.getItem('accessToken');
        let data = {
          accountNum: accountNum,
          aliasName: aliasNameEdit.value,
          id: accountId,
          ownerId: uid
        };
        dispatch(EditAlias(data, accessToken))
            .then(response => {
              console.log(response);
              if (parseInt(response.errorCode) === 0) {
                dispatch(FetchAlias(uid, accessToken))
                    .then(res => {
                      console.log(res);
                    })
              } else {
                alertToggle.setActive();
                setErrorMsg("Đã xảy ra lỗi");
              }
            })
      }, [dispatch, aliasNameEdit, accountId, accountNum, alertToggle]
  )

  return (
      <>
        <Button color="success" onClick={modalToggle.setActive}>
          <span style={{marginRight: "10px"}}>Sửa tên gợi nhớ</span>
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </Button>

        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle}>
          <ModalHeader className="padding-header" toggle={modalToggle.toggle}>Sửa tên gợi nhớ</ModalHeader>
          <ModalBody className="padding-body">
            <Label for="aliasNameEdit">Thông tin tài khoản <ShowRequire/></Label>
            <FormGroup>
              <Label>Số tài khoản</Label>
              <Input type="text"
                     name="accountNum"
                     value={accountNum}
                     disabled={true}
              >
              </Input>
            </FormGroup>

            <FormGroup>
              <InputGroup className="mb-2">
                <Input type="text"
                       name="aliasNameEdit"
                       id="aliasNameEdit"
                       onChange={aliasNameEdit.onChange}
                       value={aliasNameEdit.value}
                       invalid={aliasNameEdit.invalid}
                       valid={aliasNameEdit.valid}
                       placeholder="Nhập số tài khoản hoặc username"/>
                {
                  editAliasReceiver.isLoading ? (<InputGroupAddon addonType="prepend">
                    <InputGroupText><Spinner color="primary"
                                             size={"sm"} role="status"
                                             aria-hidden="true"/></InputGroupText>
                  </InputGroupAddon>) : ""
                }
                <FormFeedback>{aliasNameEdit.inValidMsg}</FormFeedback>
              </InputGroup>
            </FormGroup>
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
                    onClick={editAlias}>
              <span style={{padding: "0px 40px"}}>Sửa tên gợi nhớ</span></Button>
            <Button color="light"
                    className="d-flex align-items-center justify-content-center"
                    onClick={modalToggle.setInActive}>
              <span style={{padding: "0px 40px"}}>Bỏ qua</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
}


export default EditAliasReceiver;