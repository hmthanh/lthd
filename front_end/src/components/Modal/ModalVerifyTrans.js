import React from 'react';
import {Button, CardTitle, Form, FormFeedback, FormGroup, Input, Label, ModalFooter, Spinner} from "reactstrap";
import useInputChange from "../../utils/useInputChange";
import {verifyOTP} from "../../redux/actions/transfer.action";
import {useDispatch, useSelector} from "react-redux";
import useToggle from "../../utils/useToggle";

const ModalVerifyTrans = ({transId, onBack, onFinish}) => {
  const dispatch = useDispatch();
  const verifyInfo = useSelector((state) => {
    return state.VerifyResult
  });
  const invalidOTPToggle = useToggle(false);
  const OTP = useInputChange("");

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
            onFinish();
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
        <CardTitle>
          <h3 className="text-center">2. NHẬP MÃ XÁC NHẬN</h3>
        </CardTitle>
        <hr/>
        <Form>
          <h5>Vui lòng nhập mã OTP để xác nhận</h5>
          <FormGroup>
            <Label for="OTP">Mã OTP</Label>
            <Input type="number" name="OTP" id="OTP"
                   onChange={OTP.onChange}
                   value={OTP.value}
                   invalid={invalidOTPToggle.active}
                   required
            />
            <FormFeedback>Mã OTP không chính xác, vui lòng kiểm tra lại</FormFeedback>
          </FormGroup>
        </Form>
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
          {" "}
          <Button color="secondary"
                  onClick={onBack}
                  className="d-flex align-items-center justify-content-center">
            <span style={{marginLeft: "5px", paddingRight: "40px"}}>Quay lại</span></Button>
        </ModalFooter>
      </>
  );
};

export default ModalVerifyTrans;
