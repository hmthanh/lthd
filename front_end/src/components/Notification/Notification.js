import React, {useCallback, useState} from 'react';
import {Alert, Button, Container} from "reactstrap";
import Websocket from "react-websocket";
import useToggle from "../../utils/useToggle";
import {Link} from "react-router-dom";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatMoney} from "../../utils/utils";

const Notification = () => {
  const alertToggle = useToggle(false);
  const [ownerAccNum, setOwnerAccNum] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [money, setMoney] = useState(0);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState(0);

  function handleOpen() {
    console.log('connected:)')
  }

  function handleClose() {
    console.log('disconnected:(')
  }

  const handleData = useCallback((result) => {
    let data = JSON.parse(result);
    console.log("data", data);
    const uid = parseInt(localStorage.getItem("uid"));
    const recipient = parseInt(data.recipient);
    if (uid === recipient) {
      let alertType = parseInt(data.alertType);
      setAlertType(alertType);
      alertToggle.setActive();

      if (alertType === 1) {
        setOwnerAccNum(data.ownerAccNum);
        setOwnerName(data.ownerName);
        setMoney(data.money);
        setMessage(data.message);
      } else if (alertType === 2) {
        setOwnerAccNum(data.ownerAccNum);
        setOwnerName(data.ownerName);
        setMessage(data.message);
      } else if (alertType === 3) {
        setOwnerAccNum(data.ownerAccNum);
        setOwnerName(data.ownerName);
        setMessage(data.message);
      } else if (alertType === 4) {
        setOwnerAccNum(data.ownerAccNum);
        setOwnerName(data.ownerName);
        setMessage(data.message);
      }
    }
  }, [alertToggle, setOwnerAccNum, setOwnerName, setMoney, setMessage])


  return (
      <>
        <Websocket url='ws://localhost:6500'
                   onMessage={handleData} onOpen={handleOpen}
                   onClose={handleClose}/>
        <Container>
          <Alert isOpen={alertToggle.active} fade={true} style={{textAlign: "left"}} color="warning" className="notification">
            <Button onClick={alertToggle.setInActive} className="close" data-dismiss="alert" aria-label="close" title="close">×</Button>
            {
              alertType === 1 ? (
                  <>
                    <strong>[Nhắc nợ]</strong> Bạn nợ tài khoản {ownerAccNum} ({ownerName}) số tiền {formatMoney(money)} VNĐ.
                    Nhấn vào đây để{" "}
                    <Link to={`/transfer?account=${ownerAccNum}&name=${ownerName}&money=${money}&note=${message}`}>
                      Thanh toán{" "}
                      <FontAwesomeIcon style={{marginRight: "10px"}} icon={faCreditCard}/>
                    </Link>.
                    <br/>
                    Xem <Link to="/reminder">danh sách nợ chưa thanh toán</Link>
                  </>
              ) : ""
            }
            {
              alertType === 2 ? (
                  <>
                    <strong>[Chủ nợ hủy]</strong> Chủ nợ có tài khoản {ownerAccNum} ({ownerName}) đã hủy nhắc nợ với nội dung :<br/>
                    {message}<br/>
                    Xem <Link to="/reminder">danh sách nợ chưa thanh toán</Link>
                  </>
              ) : ""
            }
            {
              alertType === 3 ? (
                  <>
                    <strong>[Con nợ hủy]</strong> Con nợ có tài khoản {ownerAccNum} ({ownerName}) đã hủy nhắc nợ với nội dung :<br/>
                    {message}<br/>
                    Xem <Link to="/debt">danh sách nhắc nợ</Link>
                  </>
              ) : ""
            }
            {
              alertType === 4 ? (
                  <>
                    <strong>[Con nợ đã thanh toán]</strong> Con nợ có tài khoản {ownerAccNum} ({ownerName}) đã thanh toán nợ với nội dung :<br/>
                    {message}<br/>
                    Xem <Link to="/debt">danh sách nhắc nợ</Link>
                  </>
              ) : ""
            }
          </Alert>
        </Container>
      </>
  );
}

export default Notification;