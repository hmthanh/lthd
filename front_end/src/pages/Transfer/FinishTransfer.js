import React from 'react';
import {Alert, CardTitle} from "reactstrap";
import {useSelector} from "react-redux";
import {formatMoment, formatMoney} from "../../utils/utils";

const FinishTransfer = () => {
  const finishInfo = useSelector((state) => {
    return state.VerifyResult.data
  });
  return (
      <>
        <CardTitle>
          <h3 className="text-center">3. HOÀN TẤT</h3>
        </CardTitle>
        {finishInfo && (<Alert color="success">
          <h5>Thông tin giao dịch</h5>
          <hr/>
          Người gửi : {finishInfo.from_account}<br/>
          Người nhận : {finishInfo.to_account}<br/>
          Số tiền : {formatMoney(finishInfo.amount)} VNĐ<br/>
          Thời gian giao dịch : {formatMoment(finishInfo.timestamp)}<br/>
        </Alert>)
        }
        <hr/>
        <strong>Sẽ chuyển đến trang lịch sử giao dịch trong 5s nữa</strong>
        {/*<hr/>*/}
        {/*<Button color="secondary"*/}
        {/*        onClick={onBack}*/}
        {/*        className="d-flex align-items-center justify-content-center">*/}
        {/*  <span style={{marginLeft: "5px", paddingRight: "40px"}}>Quay lại</span></Button>*/}

      </>
  );
};

export default FinishTransfer;
