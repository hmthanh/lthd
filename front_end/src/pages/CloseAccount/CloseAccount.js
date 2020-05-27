import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Badge,
  Button, Collapse,
  FormGroup,
  Input,
  InputGroup,
  Label,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledTooltip
} from "reactstrap";
import useToggle from "../../utils/useToggle";
import {useDispatch, useSelector} from "react-redux";
import {formatMoney} from "../../utils/utils";
import {closeAccount, getAllAccount} from "../../redux/actions/account.action";

const CloseAccount = ({index, account_num, surplus, type}) => {
  const color = type === 1 ? "danger" : "success";
  const payTitle = type === 1 ? "Thanh toán" : "Tiết kiệm";
  const dispatch = useDispatch();
  const modalToggle = useToggle(false);
  const alertToggle = useToggle(false);
  const [receive, setReceive] = useState("");
  const listReceive = useSelector(state => {
    return state.AccountInfo.data.account
  });


  const onChangeReceive = (e) => {
    setReceive(e.target.value);
  }

  const onClosePayment = useCallback((e) => {
    let accessToken = localStorage.getItem('accessToken');
    let uid = localStorage.getItem('uid');
    let data = {
      uid: uid,
      closerId: account_num,
      receiveId: receive,
    }
    console.log(data);
    dispatch(closeAccount(data, accessToken))
        .then((response) => {
          console.log(response, response.errorCode, response.errorCode === -200);
          if (response.errorCode === -200) {
            modalToggle.setActive();
            alertToggle.setActive();
          } else {
            modalToggle.setInActive();
            dispatch(getAllAccount(uid, accessToken))
                .then((response) => {
                  console.log(response);
                })
                .catch((e) => {
                  console.log(e);
                });
          }
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, account_num, modalToggle, receive, alertToggle])

  useEffect(() => {
    for (let i = 0; i < listReceive.length; i++) {
      if (listReceive[i].account_num !== account_num) {
        let acc_num = listReceive[i].account_num;
        setReceive(acc_num);
        break;
      }
    }
  }, [listReceive, account_num]);

  return (
      <>
        <Alert color={color} className="alert-dismissible">
          {
            listReceive.length > 1 ? (
                <div>
                  <Button type="button"
                          className="close"
                          color="link"
                          onClick={modalToggle.setActive}
                          aria-label="Close"
                          id={"toolTip" + index}><span aria-hidden="true">×</span></Button>
                  <UncontrolledTooltip placement="top" target={"toolTip" + index}>Đóng tài khoản
                  </UncontrolledTooltip>
                </div>
            ) : ""
          }
          <ListGroupItem>
            <h5 className="alert-heading">Số tài khoản : {`${account_num} `}
              <Badge color={color}>{`${payTitle} ${index + 1}`}</Badge>
            </h5>
            <hr/>
            <p>Số dư : {`${formatMoney(surplus)} VNĐ`}</p>
          </ListGroupItem>
        </Alert>

        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle}>
          <ModalHeader className="padding-header" toggle={modalToggle.toggle}>Đóng tài khoản</ModalHeader>
          <ModalBody className="padding-body">
            <Collapse isOpen={!alertToggle.active}>
              <strong>Để đóng tài khoản, bạn cần chọn tài khoản để chuyển số dư {formatMoney(surplus)} VNĐ</strong>
              <FormGroup>
                <Label>Số tài khoản</Label>
                <InputGroup>
                  <Input type="select"
                         onChange={onChangeReceive}
                         name="receive"
                         id="receive"
                         value={receive}>
                    {
                      listReceive.map((acc, index) => {
                        if (account_num !== acc.account_num) {
                          return (
                              <option key={index} value={acc.account_num}>{acc.account_num}</option>)
                        } else {
                          return ""
                        }
                      })
                    }
                  </Input>
                </InputGroup>
              </FormGroup>
              <h6>Bạn có chăc muốn đóng tài khoản không ?</h6>
            </Collapse>
            <Collapse isOpen={alertToggle.active}>
              <strong>Không thể đóng tài khoản thanh toán cuối cùng</strong>
            </Collapse>
          </ModalBody>
          <ModalFooter className="padding-footer">
            <Collapse isOpen={!alertToggle.active}>
              <Button color="danger"
                      className="d-flex align-items-center justify-content-center"
                      onClick={onClosePayment}>
                <span style={{padding: "0px 40px"}}>Đóng tài khoản</span></Button>
            </Collapse>
            <Button color="light"
                    className="d-flex align-items-center justify-content-center"
                    onClick={modalToggle.setInActive}>
              <span style={{padding: "0px 40px"}}>Bỏ qua</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
}


export default CloseAccount;