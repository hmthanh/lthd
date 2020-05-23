import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Container} from "reactstrap";
import Websocket from "react-websocket";
import {Link, useHistory} from "react-router-dom";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatMoney} from "../../utils/utils";
import {useDispatch} from "react-redux";
import {delNotify, getNotify} from "../../redux/creators/remindCreator";

const Notification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [alertData, setAlertData] = useState([]);

  function handleOpen() {
    console.log('connected:)')
  }

  function handleClose() {
    console.log('disconnected:(')
  }

  const handleData = useCallback((result) => {
    console.log(result);
    const uid = parseInt(localStorage.getItem('uid'));
    let data = JSON.parse(result);
    const recipient = parseInt(data.recipient);
    if (uid === recipient) {
      history.go(0);
    }
  }, [history])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    dispatch(getNotify(uid, accessToken))
        .then((response) => {
          console.log("response alert data", response);
          if (response.status !== 403) {
            setAlertData(response);
          }
        });
  }, [dispatch])

  function closeAlert(notifyId) {
    console.log(notifyId);
    const accessToken = localStorage.getItem('accessToken');
    dispatch(delNotify(notifyId, accessToken))
        .then(() => {
          const uid = localStorage.getItem('uid');
          dispatch(getNotify(uid, accessToken))
              .then((response) => {
                setAlertData(response);
              });
        })

  }


  return (
      <>
        <Websocket url='ws://localhost:6500'
                   onMessage={handleData} onOpen={handleOpen}
                   onClose={handleClose}/>
        <Container>
          {
            alertData &&
            alertData.map((alert, index) => {
              if (alert.type === 1) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="danger">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">×
                      </div>
                      <strong>[Nhắc nợ]</strong> Bạn nợ tài khoản {alert.account_id} ({alert.name}) số
                      tiền {formatMoney(alert.money)} VNĐ.<br/>
                      Nhấn vào đây để{" "}
                      <Link
                          to={`/transfer?account=${alert.account_id}&name=${alert.name}&money=${alert.money}&note=${alert.message}&debt=${alert.debt_id}`}>
                        Thanh toán{" "}
                        <FontAwesomeIcon style={{marginRight: "10px"}} icon={faCreditCard}/>
                      </Link>.
                      <br/>
                      Xem <Link to="/reminder">danh sách nợ chưa thanh toán</Link>
                    </Alert>
                )
              } else if (alert.type === 2) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="info">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">×
                      </div>
                      <strong>[Chủ nợ hủy]</strong> Chủ nợ có tài khoản {alert.account_id} ({alert.name}) đã hủy nhắc nợ với nội dung :<br/>
                      {alert.message}<br/>
                      Xem <Link to="/reminder">danh sách nợ chưa thanh toán</Link>
                    </Alert>
                )
              } else if (alert.type === 3) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="warning">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">×
                      </div>
                      <strong>[Con nợ hủy]</strong> Con nợ có tài khoản {alert.account_id} ({alert.name}) đã hủy nhắc nợ với nội dung :<br/>
                      {alert.message}<br/>
                      Xem <Link to="/debt">danh sách nhắc nợ</Link>
                    </Alert>
                )
              } else if (alert.type === 4) {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="success">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">×
                      </div>
                      <strong>[Con nợ đã thanh toán]</strong> Con nợ có tài khoản {alert.account_id} ({alert.name}) đã thanh toán nợ với nội
                      dung
                      :<br/>
                      {alert.message}<br/>
                      Xem <Link to="/debt">danh sách nhắc nợ</Link>
                    </Alert>
                )
              } else {
                return (
                    <Alert key={index} style={{textAlign: "left"}} color="primary">
                      <div onClick={() => closeAlert(alert.id)} className="close" data-dismiss="alert" aria-label="close" title="close">×
                      </div>
                      <strong>Thông báo lỗi</strong>
                    </Alert>
                )
              }
            })
          }
        </Container>
      </>
  );
}

export default Notification;