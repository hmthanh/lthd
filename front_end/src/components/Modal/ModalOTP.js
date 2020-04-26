import React from 'react';
import './MessageBox.css';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from "reactstrap";
import useInputChange from "../../utils/useInputChange";
import {verifyOTP} from "../../redux/creators/transferCreator";
import {useDispatch, useSelector} from "react-redux";
import useToggle from "../../utils/useToggle";

const ModalOTP = ({isShow, transId, onClose, onVerifySuccess}) => {
  const dispatch = useDispatch();
  const verifyInfo = useSelector((state) => {
    return state.VerifyResult
  });
  const invalidOTPToggle = useToggle(false);
  const OTP = useInputChange(0);

  function onVerify(e) {
    let data = {
      transId: transId,
      OTP: OTP.value
    };
    let accessToken = localStorage.getItem('accessToken');
    dispatch(verifyOTP(transId, data, accessToken))
        .then((response) => {
          console.log("response Verify OTP", response)
          if (response.errorCode === 0) {
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

  console.log(transId);

  return (
      <div>
        <Modal isOpen={isShow} toggle={onClose}>
          <ModalHeader>Vui lòng nhập mã OTP để xác nhận</ModalHeader>
          <ModalBody>
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
                    disabled={verifyInfo.isLoading}
            >
              <span style={{marginLeft: "40px"}}>
                {(verifyInfo.isLoading ? <Spinner color="light"
                                                  size={"sm"} role="status"
                                                  aria-hidden="true"/> : "")}
              </span>
              <span style={{marginLeft: "5px", paddingRight: "40px"}}>Đồng ý</span></Button>
          </ModalFooter>
        </Modal>
      </div>
  );
};

export default ModalOTP;
