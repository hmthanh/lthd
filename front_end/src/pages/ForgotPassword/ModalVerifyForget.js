import React, {useCallback} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {verifyForget} from "../../redux/actions/changePassword";
import useInputRequire from "../../utils/useInputRequire";

const ModalVerifyForget = ({isShow, verifyPwdData, onClose, onVerifySuccess}) => {
  const dispatch = useDispatch();
  const verifyPwd = useSelector((state) => {
    return state.ChangePassword
  });
  const OTP = useInputRequire({
    value: "",
    valid: false,
    invalid: false,
    inValidMsg: "Mã OTP không chính xác, vui lòng kiểm tra lại"
  });
  const newPwd = useInputRequire({
    value: "",
    valid: false,
    invalid: false,
    inValidMsg: "Mật khâu không được để trống"
  });
  const repeatPwd = useInputRequire({
    value: "",
    valid: false,
    invalid: false,
    inValidMsg: "Lặp lại mật khẩu không được để trống"
  });

  const onVerify = useCallback(() => {
    if (!OTP.value) {
      OTP.setInValid(true);
      return;
    }
    if (!newPwd.value) {
      newPwd.setInValid(true);
      return;
    }
    let data = {
      uid: verifyPwdData,
      newPwd: newPwd.value,
      OTP: OTP.value
    }
    dispatch(verifyForget(data))
        .then((response) => {
          if (response.error === 0) {
            console.log('success');
            localStorage.setItem('refreshToken', response.refreshToken);
            onClose();
            onVerifySuccess();
          } else {
            OTP.setInValid(true);
          }
          console.log(response);
        })
        .catch((err) => {
          console.log("Error", err);
          OTP.setInValid(true);
        });
  }, [dispatch, OTP, newPwd, onClose, onVerifySuccess, verifyPwdData]);

  return (
      <>
        <Modal isOpen={isShow} toggle={onClose}>
          <ModalHeader className="padding-header">Vui lòng nhập mã OTP để xác nhận</ModalHeader>
          <ModalBody className="padding-body">
            <Form>
              <FormGroup>
                <Label for="OTP">Nhập mã OTP</Label>
                <Input type="number" name="OTP" id="OTP"
                       onChange={OTP.onChange}
                       value={OTP.value}
                       onBlur={OTP.onBlur}
                       invalid={OTP.invalid}
                       required
                />
                <FormFeedback>{OTP.inValidMsg}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="newPwd">Mật khẩu mới</Label>
                <Input type="password"
                       name="newPwd"
                       id="newPwd"
                       onChange={newPwd.onChange}
                       value={newPwd.value}
                       onBlur={newPwd.onBlur}
                       invalid={newPwd.invalid}
                       required
                />
                <FormFeedback>{newPwd.inValidMsg}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="repeatPwd">Nhập lại mật khẩu mới</Label>
                <Input type="password"
                       name="repeatPwd"
                       id="repeatPwd"
                       onChange={repeatPwd.onChange}
                       value={repeatPwd.value}
                       onBlur={repeatPwd.onBlur}
                       invalid={repeatPwd.invalid}
                       required
                />
                <FormFeedback>{repeatPwd.inValidMsg}</FormFeedback>
              </FormGroup>
            </Form>

          </ModalBody>
          <ModalFooter>
            <Button color="success"
                    className="d-flex align-items-center justify-content-center"
                    onClick={onVerify}
                    disabled={verifyPwd.isLoading}
            >
              <span style={{marginLeft: "40px"}}>
                {(verifyPwd.isLoading ? <Spinner color="light"
                                                 size={"sm"} role="status"
                                                 aria-hidden="true"/> : "")}
              </span>
              <span style={{marginLeft: "5px", paddingRight: "40px"}}>Đồng ý</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
};

export default ModalVerifyForget;
