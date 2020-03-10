import React, {Component} from 'react';
import {
    Badge,
    Button,
    ButtonGroup,
    Card,
    CardTitle,
    Col,
    Collapse,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
    Spinner
} from "reactstrap";
import './Transfer.css';
import {getInterbankAssociate, getListReceiverSaved, transfer} from "../../redux/creators/transferCreator";
import {connect} from "react-redux";
import MessageBox from "../../components/Modal/MessageBox";
import {convertObjectToArray} from "../../utils/utils";
import ModalOTP from "../../components/Modal/ModalOTP";

class Transfer extends Component {
    constructor(props) {
        // console.log("1. transfer");
        super(props);
        this.state = {
            isInterbank: false,
            isSavedList: false,
            senderId: 1,
            listSenderAccount: [
                {name: 'Tài khoản thanh toán 1', value: 1},
                {name: 'Tài khoản thanh toán 2', value: 2}
            ],
            receiverBank: 0,
            receiverSavedList: 0,
            receiverId: '',
            receiverName: '',
            moneyTransfer: 0,
            messageTransfer: '',
            isSenderPay: true,
            isShowInvalidModal: false,
            isShowVerifyOTPModal: false
        };
    }

    changeReceiverId = () => {
        this.setState({
            receiverId: this.state.receiverSavedList
        });
    };

    changeInterbank = () => {
        this.setState({
            isInterbank: !this.state.isInterbank
        });
    };

    changeSavedList = () => {
        if (!this.state.isSavedList) {
            this.changeReceiverId();
        }
        this.setState({
            isSavedList: !this.state.isSavedList
        });
    };

    changeTypeTransfer = () => this.setState({
        isSenderPay: !this.state.isSenderPay
    });

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    };

    onChangeReceiverSaved = (e) => {
        let target = e.target;
        this.setState({
            receiverId: target.value
        });

        if (!this.state.isSavedList) {
            this.changeReceiverId();
        }
    };

    loadInvalidTransferModal = () => this.setState({
        isInvalidTransfer: true
    });

    onSubmit = (e) => {
        e.preventDefault();
        let {
            isInterbank,
            receiverBank,
            receiverId,
            moneyTransfer,
            messageTransfer,
            isSenderPay
        } = this.state;
        let partner_code = 0;
        if (isInterbank) {
            partner_code = receiverBank;
        }
        let uid = localStorage.getItem('uid');
        let to_account = receiverId, note = messageTransfer, amount = moneyTransfer;
        let cost_type = isSenderPay ? 0 : 1;

        let data = {
            partner_code: partner_code,
            uid: uid,
            to_account: to_account,
            note: note,
            amount: amount,
            cost_type: cost_type,
        };
        console.log("data", data);
        let accessToken = localStorage.getItem('accessToken');
        // this.props.transfer(data, accessToken);

        let xxx = {
            partner_code: '0',
            uid: '1',
            to_account: '12',
            note: 'abc',
            amount: 23,
            cost_type: 0
        };

        this.props.transfer(xxx, accessToken);
    };

    componentDidMount() {
        let accessToken = localStorage.getItem('accessToken');
        let uid = localStorage.getItem('uid');
        this.props.getInterbankAssociate(accessToken);
        this.props.getListReceiverSaved(uid, accessToken);
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdatesdfs dfsdf", nextProps);
        return true;
    }

    componentWillReceiveProps(props) {
        console.log("propasdfsdfsds", props);
        let errorCode = this.props.TransferInfo.errorCode;
        console.log("errorCode", errorCode);
        if (errorCode === 1) {
            console.log("isVerifyModal");
            this.setState({
                isShowVerifyOTPModal: true
            });
            // this.loadInvalidTransferModal();
            // console.log("abc")
        } else if (errorCode === -206) {
            console.log("isInvalidModal");
            this.setState({
                isShowInvalidModal: true
            });
            // this.loadInvalidTransferModal();

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("prevProps", prevProps);
        console.log("prevState", prevState);
        console.log("snapshot", snapshot);

    }

    render() {
        let {
            isInterbank,
            senderId,
            listSenderAccount,
            isSavedList,
            receiverBank,
            receiverSavedList,
            receiverId,
            receiverName,
            moneyTransfer,
            messageTransfer,
            isSenderPay,
            isShowInvalidModal,
            isShowVerifyModal
        } = this.state;
        let transId = 0;
        let listReceiverSaved = convertObjectToArray(this.props.ReceiverSaved.data);

        return <div className="container">
            <div className="container-fluid py-3">
                <Row>
                    <Col xs={12} sm={8} md={6} lg={5} className={"mx-auto"}>
                        <Card id="localBank">
                            <div className="card-body">
                                <CardTitle>
                                    <h3 className="text-center">CHUYỂN KHOẢN</h3>
                                </CardTitle>
                                <hr/>
                                <Form method="post" noValidate="novalidate"
                                      className="needs-validation" onSubmit={this.onSubmit}>
                                    <h4>1. Người gửi</h4>
                                    <FormGroup>
                                        <Label for="senderAccountType">Tài khoản người
                                            gửi {this.showFieldRequire()}</Label>
                                        <Input type="select" onChange={this.onChange}
                                               name="senderId"
                                               id="senderId" value={senderId}>
                                            {listSenderAccount.map((item, index) => {
                                                return <option key={index} value={item.value}>{item.name}</option>
                                            })}
                                        </Input>
                                    </FormGroup>
                                    <h4>2. Người nhận</h4>
                                    <FormGroup>
                                        <Label for="receiverTransfer">Chọn ngân hàng</Label>
                                        <div>
                                            <ButtonGroup className="mb-2 ">
                                                <Button color="primary" onClick={this.changeInterbank}
                                                        active={isInterbank === false}>Nội bộ</Button>
                                                <Button color="primary" onClick={this.changeInterbank}
                                                        active={isInterbank === true}>Liên ngân hàng</Button>
                                            </ButtonGroup>
                                        </div>
                                        <Collapse isOpen={isInterbank}>
                                            <Input type="select"
                                                   value={receiverBank}
                                                   onChange={this.onChange}
                                                   name="receiverBank" id="receiverBank">
                                                {
                                                    this.props.InterbankAssociate.data.item &&
                                                    this.props.InterbankAssociate.data.item.map((item, index) => {
                                                        return <option key={index}
                                                                       value={item.partner_code}>{item.name}</option>
                                                    })
                                                }
                                            </Input>
                                        </Collapse>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="receiverSavedList">Thông tin người
                                            nhận {this.showFieldRequire()}</Label>
                                        <div>
                                            <ButtonGroup className="mb-2 ">
                                                <Button color="primary" onClick={this.changeSavedList}
                                                        active={isSavedList === false}>Nhập thông tin mới</Button>
                                                <Button color="primary" onClick={this.changeSavedList}
                                                        active={isSavedList === true}>Danh sách đã lưu</Button>
                                            </ButtonGroup>
                                        </div>
                                        <Collapse isOpen={isSavedList}>
                                            <Input type="select"
                                                   value={receiverSavedList}
                                                   onChange={this.onChangeReceiverSaved}
                                                   name="receiverSavedList" id="receiverSavedList">
                                                {
                                                    listReceiverSaved &&
                                                    listReceiverSaved.map((item, index) => {
                                                        return <option key={index}
                                                                       value={item.account_num}>{item.alias_name}</option>
                                                    })
                                                }
                                            </Input>
                                        </Collapse>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="mb-2">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Số tài khoản</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="receiverId" id="receiverId"
                                                   onChange={this.onChange}
                                                   value={receiverId}
                                                   placeholder="2343-5928-3472"/>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>Họ và tên</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" name="receiverName" id="receiverName"
                                                   onChange={this.onChange}
                                                   value={receiverName}
                                                   placeholder="Nguyễn Văn A"/>
                                        </InputGroup>
                                    </FormGroup>
                                    <h4>3. Thông tin cần chuyển tiền</h4>
                                    <FormGroup>
                                        <Label for="moneyTransfer">Số tiền {this.showFieldRequire()}</Label>
                                        <Input type="number" name="moneyTransfer" id="moneyTransfer"
                                               onChange={this.onChange}
                                               value={moneyTransfer}
                                               required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="messageTransfer">Nội dung chuyển tiền</Label>
                                        <Input type="textarea" name="messageTransfer"
                                               value={messageTransfer}
                                               onChange={this.onChange}
                                               id="messageTransfer"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Hình thức trả phí</Label>
                                        <ButtonGroup className="mb-2">
                                            <Button color="primary" onClick={this.changeTypeTransfer}
                                                    active={isSenderPay === true}>Người nhận trả phí</Button>
                                            <Button color="primary" onClick={this.changeTypeTransfer}
                                                    active={isSenderPay === false}>Người gửi trả phí</Button>
                                        </ButtonGroup>
                                    </FormGroup>
                                    <div>
                                        <Button id="btnTransferLocal" type="submit" color={"success"}
                                                size={"lg"}
                                                block={true}
                                                className="d-flex align-items-center justify-content-center"
                                                disabled={false}>
                                            <Spinner className={(false ? "visible" : "disable")} color="light"
                                                     size={"sm"} role="status"
                                                     aria-hidden="true"/>{' '}
                                            <span style={{marginLeft: "5px"}}>Chuyển Tiền</span>
                                        </Button>
                                    </div>
                                </Form>
                                <MessageBox isOpen={isShowInvalidModal}></MessageBox>
                                <ModalOTP isOpen={isShowVerifyModal} transId={transId}></ModalOTP>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>;
    }

    showFieldRequire() {
        return <Badge color="danger" pill>Yêu cầu</Badge>
    }
}

const mapDispatchToProps = dispatch => ({
    getInterbankAssociate: (accessToken) => dispatch(getInterbankAssociate(accessToken)),
    transfer: (data, accessToken) => dispatch(transfer(data, accessToken)),
    getListReceiverSaved: (uid, accessToken) => dispatch(getListReceiverSaved(uid, accessToken))
});

const mapStateToProps = (state) => {
    return {
        InterbankAssociate: state.InterbankAssociate,
        TransferInfo: state.TransferInfo,
        ReceiverSaved: state.ReceiverSaved
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
