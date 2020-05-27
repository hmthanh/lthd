import React from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from "reactstrap";
import useInputChange from "../../utils/useInputChange";
import {useDispatch, useSelector} from "react-redux";
import useToggle from "../../utils/useToggle";
import {changePwd} from "../../redux/actions/changePassword";

const ModalVerifyPwd = ({isShow, verifyPwdData, onClose, onVerifySuccess}) => {
  const dispatch = useDispatch();
  const verifyPwd = useSelector((state) => {
    return state.ChangePassword
  });
  const invalidOTPToggle = useToggle(false);
  const OTP = useInputChange(0);

  function onVerify(e) {
    let accessToken = localStorage.getItem('accessToken');
    let {uId, newPwd} = verifyPwdData;
    let data = {
      uId: uId,
      newPwd: newPwd,
      OTP: OTP.value
    };
    dispatch(changePwd(data, accessToken))
        .then((response) => {
          console.log("response Verify OTP", response)
          if (response.error === 0) {
            console.log('success');
            onClose();
            onVerifySuccess();
          } else {
            invalidOTPToggle.setActive();
          }
          console.log(response);
        })
        .catch((err) => {
          console.log("Error", err);
          invalidOTPToggle.setActive();
        }, [dispatch]);
  }

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
                       invalid={invalidOTPToggle.active}
                       required
                />
                <FormFeedback>Mã OTP không chính xác, vui lòng kiểm tra lại</FormFeedback>
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

export default ModalVerifyPwd;
