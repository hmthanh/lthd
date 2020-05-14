import React, {useCallback, useState} from 'react';
import {Alert, Button, Container} from "reactstrap";
import Websocket from "react-websocket";
import useToggle from "../../utils/useToggle";
import {Link} from "react-router-dom";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatMoney} from "../../utils/utils";

const Notification = () => {
  const alertToggle = useToggle(true);
  const [ownerAccNum, setOwnerAccNum] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [money, setMoney] = useState(0);
  const [message, setMessage] = useState("");

  function handleOpen() {
    console.log('connected:)')
  }

  function handleClose() {
    console.log('disconnected:(')
  }

  const handleData = useCallback((result) => {
    let data = JSON.parse(result);
    const uid = localStorage.getItem("uid");
    if (parseInt(uid) === parseInt(data.debtorId)) {
      setOwnerAccNum(data.ownerAccNum);
      setOwnerName(data.ownerName);
      setMoney(data.money);
      setMessage(data.message);
      alertToggle.setActive();
    }
    // let result =
  }, [alertToggle, setOwnerAccNum, setOwnerName, setMoney, setMessage]);

  return (
      <>
        <Websocket url='ws://localhost:6500'
                   onMessage={handleData} onOpen={handleOpen}
                   onClose={handleClose}/>
        <Container>
          <Alert isOpen={alertToggle.active} fade={true} style={{textAlign: "left"}} color="warning" className="notification">
            <Button onClick={alertToggle.setInActive} className="close" data-dismiss="alert" aria-label="close" title="close">×</Button>
            <strong>[Nhắc nợ]</strong> Bạn nợ tài khoản {ownerAccNum} ({ownerName}) số tiền {formatMoney(money)} VNĐ.
            Nhấn vào đây để{" "}
            <Link to={`/transfer?account=${ownerAccNum}&name=${ownerName}&money=${money}&note=${message}`}>
              Thanh toán{" "}
              <FontAwesomeIcon style={{marginRight: "10px"}} icon={faCreditCard}/>
            </Link>.
            <br/>
            Xem <Link to="/reminder">danh sách nợ chưa thanh toán</Link>
          </Alert>
        </Container>
      </>
  );
}

export default Notification;