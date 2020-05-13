import React, {useCallback, useState} from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import useToggle from "../../utils/useToggle";
import useInputChange from "../../utils/useInputChange";
import {getAccName} from "../../redux/creators/transferCreator";
import ShowRequire from "../../components/ShowRequire/ShowRequire";
import {Create, getAllDebt} from "../../redux/creators/debtCreator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const ModalAddNew = () => {
  const dispatch = useDispatch();
  const AccName = useSelector((state) => {
    return state.AccName
  });
  const CreateDebt = useSelector((state) => {
    return state.CreateDebt
  });
  const modalToggle = useToggle(false);
  const [accountNum, setAccountNum] = useState("");
  const [accValid, setAccValid] = useState(false);
  const [accInValid, setAccInValid] = useState(false);
  const [accInValidMsg, setAccInValidMsg] = useState("");
  const name = useInputChange("");
  const money = useInputChange(0);
  const message = useInputChange("");


  const onChangeAccountNum = useCallback((e) => {
    setAccountNum(e.target.value);
  }, [setAccountNum])

  const onBlurAccountNum = useCallback(() => {
    if (accountNum.value === "") {
      setAccInValid(true)
      setAccInValidMsg("Không được để trống")
      return false;
    }
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      query: accountNum
    }
    dispatch(getAccName(data, accessToken))
        .then((response) => {
          console.log("success response", response)
          name.setValue(response.account.name)
          setAccountNum(response.account.account_num)
          setAccValid(true)
          setAccInValid(false)
          setAccInValidMsg("")
        })
        .catch((err) => {
          console.log(err)
          setAccInValid(true)
          setAccInValidMsg("Không tìm thấy số tài khoản hoặc username trên")
          setAccountNum("")
        })

  }, [accountNum, dispatch, name]);

  const createDept = useCallback((e) => {
    e.preventDefault();
    if (accountNum === "") {
      setAccInValid(true)
      setAccInValidMsg("Vui lòng nhập lại số tài khoản")
      return;
    }
    const uid = localStorage.getItem('uid');
    let accessToken = localStorage.getItem('accessToken');
    let data = {
      ownerId: uid,
      accountNum: accountNum,
      money: money.value,
      message: message.value,
      datetime: new Date(),
    }
    console.log(data);
    dispatch(Create(data, accessToken))
        .then((response) => {
          console.log(response);
          dispatch(getAllDebt(uid, accessToken))
              .then((response) => {
                console.log(response);
                modalToggle.setInActive();
              })
        })
        .catch((err) => {
          console.log(err);
        })
  }, [dispatch, accountNum, money, message, modalToggle]);

  return (
      <>
        <Button color="success" onClick={modalToggle.setActive}>
          <FontAwesomeIcon style={{marginLeft: "40px"}} icon={faPlus}></FontAwesomeIcon>
          <span style={{marginLeft: "5px", paddingRight: "40px"}}>Tạo nhắc nợ</span>
        </Button>

        <Modal isOpen={modalToggle.active} toggle={modalToggle.toggle}>
          <ModalHeader className="padding-header" toggle={modalToggle.toggle}>Thêm mới nợ</ModalHeader>
          <ModalBody className="padding-body">
            <Form method="post" noValidate="novalidate"
                  className="needs-validation" onSubmit={createDept}>
              <Label for="accountNum">Thông tin tài khoản <ShowRequire/></Label>
              <FormGroup>
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>ID</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text"
                         name="accountNum"
                         id="accountNum"
                         onChange={onChangeAccountNum}
                         value={accountNum}
                         onBlur={onBlurAccountNum}
                         invalid={accInValid}
                         valid={accValid}
                         placeholder="Nhập số tài khoản hoặc username"/>
                  {
                    AccName.isLoading ? (<InputGroupAddon addonType="prepend">
                      <InputGroupText><Spinner color="primary"
                                               size={"sm"} role="status"
                                               aria-hidden="true"/></InputGroupText>
                    </InputGroupAddon>) : ""
                  }
                  <FormFeedback>{accInValidMsg}</FormFeedback>
                </InputGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Họ và tên</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" name="name"
                         disabled={true}
                         value={name.value}/>
                </InputGroup>
              </FormGroup>
              <hr/>
              <FormGroup>
                <Label for="money">Số tiền <ShowRequire/></Label>
                <Input type="number" name="money" id="money"
                       onChange={money.onChange}
                       value={money.value}
                       required/>
              </FormGroup>

              <FormGroup>
                <Label for="message">Ghi chú</Label>
                <Input type="textarea" name="message"
                       value={message.value}
                       onChange={message.onChange}
                       id="message"/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary"
                    className="d-flex align-items-center justify-content-center"
                    onClick={createDept}
                    disabled={CreateDebt.isLoading}
            >
              <span style={{marginLeft: "40px"}}>
                {(CreateDebt.isLoading ? <Spinner color="light"
                                                  size={"sm"} role="status"
                                                  aria-hidden="true"/> : "")}
              </span>
              <span style={{marginLeft: "5px", paddingRight: "40px"}}>Tạo nhắc nợ</span></Button>
          </ModalFooter>
        </Modal>
      </>
  );
};

export default ModalAddNew;