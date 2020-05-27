import React from 'react';
import {Button, CardTitle, Collapse, Form, FormFeedback, FormGroup, Input, Label, ModalFooter, Spinner} from "reactstrap";
import {verifyOTP} from "../../redux/actions/transfer.action";
import {useDispatch, useSelector} from "react-redux";
import useInputRequire from "../../utils/useInputRequire";

const ModalVerifyTrans = ({transId, onBack, onFinish, finishToggle}) => {
  const dispatch = useDispatch();
  const verifyInfo = useSelector((state) => {
    return state.VerifyResult
  });
  const OTP = useInputRequire({value: null, valid: false, invalid: false, inValidMsg: ""});

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
            OTP.setInValid(true);
          }
          console.log(response);
        })
        .catch((err) => {
          console.log("Error", err);
          OTP.setInValid(true);
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
                   value={OTP.value || ""}
                   invalid={OTP.invalid}
                   valid={OTP.valid}
                   required
            />
            <FormFeedback>Mã OTP không chính xác, vui lòng kiểm tra lại</FormFeedback>
          </FormGroup>
        </Form>
        <Collapse isOpen={!finishToggle.active}>
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
        </Collapse>
      </>
  );
};

export default ModalVerifyTrans;
