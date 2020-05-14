import React, {useState} from 'react';
import {Alert, Button, Container} from "reactstrap";
import Websocket from "react-websocket";
import useToggle from "../../utils/useToggle";
import {Link} from "react-router-dom";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Notification = () => {
  const alertToggle = useToggle(true);
  const [accountNum, setAccountNum] = useState(0);
  const [name, setName] = useState("");
  const [money, setMoney] = useState(0);
  const [message, setMessage] = useState("");

  function handleOpen() {
    console.log('connected:)')
  }

  function handleClose() {
    console.log('disconnected:(')
  }

  function handleData(data) {
    console.log('saassaasas');
    console.log(data);
    // let result = JSON.parse(data)
  }

  return (
      <>
        <Websocket url='ws://localhost:6500'
                   onMessage={handleData} onOpen={handleOpen}
                   onClose={handleClose}/>
        <Container>
          <Alert isOpen={alertToggle.active} fade={true} style={{textAlign: "left"}} color="warning" className="notification">
            <Button onClick={alertToggle.setInActive} className="close" data-dismiss="alert" aria-label="close" title="close">×</Button>
            <strong>[Nhắc nợ]</strong> Bạn nợ tài khoản A số tiền 1000.000 VNĐ.
            Nhấn vào đây để{" "}
            <Link to={`/transfer?account=${accountNum}&name=${name}&money=${money}&note=${message}`}>
              Thanh toán{" "}
              <FontAwesomeIcon style={{marginRight: "10px"}} icon={faCreditCard}/>
            </Link>
          </Alert>
        </Container>
      </>
  );
}

export default Notification;