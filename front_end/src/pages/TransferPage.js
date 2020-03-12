import React, { Component } from 'react'
import {
  Badge, Button, ButtonGroup, CardTitle, Col, Collapse, Container, Breadcrumb, BreadcrumbItem,
  Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row, Spinner,
  Card, CardImg, CardText, CardBody, CardSubtitle
} from "reactstrap"


const ShowFieldRequire = () => <Badge color="danger" pill>Yêu cầu</Badge>


class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isInternal: true,
      banking: {
        internal: false,
        notInternal: false,
      },
      collapseRevBank: false,
      collapseInfoRev: false,
      listRev: false,
      revQuery: false,
      fullState: false
    }

    this.changeBanking = this.changeBanking.bind(this)
    this.selectBanking = this.selectBanking.bind(this)
    this.onChangeReceiverBanking = this.onChangeReceiverBanking.bind(this)
    this.onChangeReceiverBanking = this.onChangeReceiverBanking.bind(this)
    this.receiverInfo = this.receiverInfo.bind(this)
    this.newInfo = this.newInfo.bind(this)
    this.onChangeReceiverInfo = this.onChangeReceiverInfo.bind(this)
  }

  changeBanking() {
    let isInternal = this.state.banking.internal;
    this.setState({
      banking: {
        internal: !isInternal,
        notInternal: isInternal,
      },
      collapseRevBank: false,
      collapseInfoRev: true,
    })
  }

  selectBanking() {
    let notInternal = this.state.banking.notInternal;
    this.setState({
      banking: {
        internal: notInternal,
        notInternal: !notInternal,
      },
      collapseRevBank: true,
      collapseInfoRev: false,
    })
  }

  onChangeReceiverBanking( evt ){
   
    let target = evt.target
    let val = +target.value
    console.log('onChangeReceiverBanking ' + val)
    if (val !== 0){
      this.setState({
        collapseInfoRev: true,
      })
    } else {
      this.setState({
        collapseInfoRev: false,
      })
    }
  }

  receiverInfo() {
    this.setState({
      listRev: true,
      revQuery: false,
    })
  }

  newInfo() {
    this.setState({
      revQuery: true,
      listRev: false,
    })
  }

  onChangeReceiverInfo( evt ){
   
    let target = evt.target
    let val = +target.value
    console.log('onChangeReceiverInfo ' + val)
    if (val !== 0){
      this.setState({
        fullState: true,
      })
    } else {
      this.setState({
        fullState: false,
      })
    }
  }

  onSubmit = (e) => {
    // e.preventDefault();
    // let {
    //   isInterbank,
    //   receiverBank,
    //   receiverId,
    //   moneyTransfer,
    //   messageTransfer,
    //   isSenderPay
    // } = this.state;
    // let partner_code = 0;
    // if (isInterbank) {
    //   partner_code = receiverBank;
    // }
    // let uid = localStorage.getItem('uid');
    // let to_account = receiverId, note = messageTransfer, amount = moneyTransfer;
    // let cost_type = isSenderPay ? 0 : 1;

    // let data = {
    //   partner_code: partner_code,
    //   uid: uid,
    //   to_account: to_account,
    //   note: note,
    //   amount: amount,
    //   cost_type: cost_type,
    // };
    // // console.log("data", data);
    // let accessToken = localStorage.getItem('accessToken');
    // // this.props.transfer(data, accessToken);

    // let xxx = {
    //   partner_code: '0',
    //   uid: '1',
    //   to_account: '12',
    //   note: 'abc',
    //   amount: 23,
    //   cost_type: 0
    // };

    // this.props.transfer(xxx, accessToken);
  }

  componentWillMount() {
    // console.log("componentWillMount");
  }

  componentDidMount() {
    // console.log("componentDidMount")
    // let accessToken = localStorage.getItem('accessToken');
    // let uid = localStorage.getItem('uid');
    // this.props.getInterbankAssociate(accessToken);
    // this.props.getListReceiverSaved(uid, accessToken);
    // listReceiverSaved

    // let data = {
    //     partner_code: '0',
    //     uid: '1',
    //     to_account: '2173891742',
    //     note: 'abc',
    //     amount: 234234234234224,
    //     cost_type: 0
    // };
    // this.props.transfer(data, accessToken);
  }


  componentWillReceiveProps(props) {
    // // console.log("componentWillReceiveProps", props);
    // let errorCode = this.props.TransferInfo.errorCode;
    // console.log("errorCode", errorCode);
    // if (errorCode === 1) {
    //   console.log("isVerifyModal");
    //   this.setState({
    //     isShowVerifyOTPModal: true
    //   });
    //   // this.loadInvalidTransferModal();
    //   // console.log("abc")
    // } else if (errorCode === -206) {
    //   console.log("isInvalidModal");
    //   this.setState({
    //     isShowInvalidModal: true
    //   });
    //   // this.loadInvalidTransferModal();

    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {


    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Chuyển Khoản</BreadcrumbItem>
        </Breadcrumb>
        <Container>
          <Card>
            <CardBody>
              <CardTitle>Chuuyển Khoản</CardTitle>
              <h4>1. Người gửi</h4>
              <Form method="post" noValidate="novalidate"
                className="needs-validation">
                <FormGroup>
                  <Label for="senderAccountType">Tài khoản người
                                      gửi : <b>Tài khoản thanh toán (mặc định)</b> </Label>
                  <Input type="text" disabled defaultValue='3124124214' />
                </FormGroup>

               
                  <h4>2. Người nhận</h4>
                  <FormGroup>
                    <Label for="receiverTransfer">Chọn ngân hàng</Label>
                    <div>
                      <ButtonGroup className="mb-2 ">
                        <Button color="primary" type='button'
                          active={this.state.banking.internal} onClick={this.changeBanking}>Nội bộ</Button>
                        <Button color="primary" type='button'
                          active={this.state.banking.notInternal} onClick={this.selectBanking}>Liên ngân hàng</Button>
                      </ButtonGroup>
                    </div>
                    <Collapse isOpen={this.state.collapseRevBank}>
                      <Input type="select" onChange={this.onChangeReceiverBanking}
                        name="receiverBank" id="receiverBank">
                          <option value={0}>{'------chọn ngân hàng--------'}</option>
                          <option value={1}>{'------test--------'}</option>
                        {/* {
                      this.props.InterbankAssociate.data.item &&
                      this.props.InterbankAssociate.data.item.map((item, index) => {
                        return <option key={index}
                          value={item.partner_code}>{item.name}</option>
                      })
                    } */}
                      </Input>
                    </Collapse>
                  </FormGroup>
                   {/* main Collapse */}
                <Collapse isOpen={this.state.collapseInfoRev}>

                  <FormGroup>
                    <Label for="receiverSavedList">Thông tin người
                                        nhận <ShowFieldRequire /></Label>
                    <div>
                      <ButtonGroup className="mb-2 ">
                        <Button color="primary"  type='button' onClick={this.newInfo}
                          active={false}>Nhập thông tin mới</Button>
                        <Button color="primary" type='button' onClick={this.receiverInfo}
                          active={true}>Chọn từ danh sách đã lưu</Button>
                      </ButtonGroup>
                    </div>
                    <Collapse isOpen={this.state.listRev}>
                      <Input type="select" onChange={this.onChangeReceiverInfo}
                        name="receiverSavedList" id="receiverSavedList">
                           <option value={0}>{'------chọn danh sach da luu--------'}</option>
                          <option value={1}>{'------test--------'}</option>
                        {/* {
                      listReceiverSaved &&
                      listReceiverSaved.map((item, index) => {
                        return <option key={index}
                          value={item.account_num}>{item.alias_name}</option>
                      })
                    } */}
                      </Input>
                    </Collapse>
                  </FormGroup>

                  <FormGroup>

                  <Collapse isOpen={this.state.revQuery}>
                    <InputGroup className="mb-2">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Số tài khoản</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="receiverId" id="receiverId"
                        placeholder="nhập vào số tài khoản hoặc user name"/>
                        <InputGroupAddon addonType="append">
                          <Button color="secondary" type='button'>Tìm kiếm</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    </Collapse>


                    <InputGroup className="mb-2">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Số tài khoản thụ hưởng</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="receiverId" id="receiverId" disabled defaultValue={'bsadnbsadm'}/>
                    </InputGroup>

                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Họ và tên</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="receiverName" id="receiverName" disabled defaultValue={"Nguyễn Văn A"} />
                    </InputGroup>
                  </FormGroup>
                  </Collapse>


                  <Collapse isOpen={this.state.fullState}>
                    <h4>3. Thông tin cần chuyển tiền</h4>
                    <FormGroup>
                        <Label for="moneyTransfer">Số tiền <ShowFieldRequire /></Label>
                        <Input type="number" name="moneyTransfer" id="moneyTransfer"
                          required />
                      </FormGroup>
                      
                    <FormGroup>
                        <Label for="messageTransfer">Nội dung chuyển tiền</Label>
                        <Input type="textarea" name="messageTransfer"
                          id="messageTransfer" />
                      </FormGroup>

                    <FormGroup>
                  <Label>Hình thức trả phí</Label> <br/>
                  <ButtonGroup className="mb-2">
                    <Button color="primary" type='button'
                      active={ true}>Người nhận trả phí</Button>
                    <Button color="primary"  type='button'
                      active={ false}>Người gửi trả phí</Button>
                  </ButtonGroup>
                </FormGroup>
                
                <Button color="success" type='button'>Chuyển Tiền</Button>
                
                </Collapse>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    )
  }
}

export default Transfer;