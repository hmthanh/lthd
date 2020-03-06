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
    Row
} from "reactstrap";
import {getInterbankAssociate, transfer} from "../../redux/creators/transferCreator";
import {connect} from "react-redux";

class Transfer extends Component {
    constructor(props) {
        console.log("1. transfer");
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
            listReceiverBank: [
                {name: 'Vietcombank', value: 1},
                {name: 'Agribank', value: 2}
            ],
            receiverSavedList: 2,
            listReceiverSaved: [
                {name: 'Hoàng Minh Thanh', value: 1},
                {name: 'Trần Văn Quang', value: 2}
            ],
            receiverId: '',
            receiverName: '',
            moneyTransfer: 0,
            messageTransfer: '',
            isSenderPay: true
        };

    }


    changeInterbank = () => {
        this.setState({
            isInterbank: !this.state.isInterbank
        });
    };

    changeSavedList = () => this.setState({
        isSavedList: !this.state.isSavedList
    });

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

    onSubmit = (e) => {
        console.log("1console", localStorage.getItem('accessToken'));
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
        let accessToken = localStorage.getItem('accessToken');
        console.log("2accessToken", accessToken);
        console.log("3data", data);
        this.props.transfer(data, accessToken);
    };

    componentDidMount() {
        this.props.getInterbankAssociate();
    }

    render() {
        console.log("begin render");
        let {
            isInterbank,
            senderId,
            listSenderAccount,
            isSavedList,
            receiverBank,
            receiverSavedList,
            listReceiverSaved,
            receiverId,
            receiverName,
            moneyTransfer,
            messageTransfer,
            isSenderPay
        } = this.state;

        return (
            <div className="container">
                <div className="container-fluid py-3">
                    <Row>
                        {console.log("begin return")}
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
                                                       onChange={this.onChange}
                                                       name="receiverSavedList" id="receiverSavedList">
                                                    {listReceiverSaved.map((item, index) => {
                                                        return <option key={index}
                                                                       value={item.value}>{item.name}</option>
                                                    })}
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
                                            <ButtonGroup className="mb-2 ">
                                                <Button color="primary" onClick={this.changeTypeTransfer}
                                                        active={isSenderPay === true}>Người nhận trả phí</Button>
                                                <Button color="primary" onClick={this.changeTypeTransfer}
                                                        active={isSenderPay === false}>Người gửi trả phí</Button>
                                            </ButtonGroup>
                                        </FormGroup>
                                        <div>
                                            <Button id="btnTransferLocal" type="submit"
                                                    className="btn btn-lg btn-info btn-block">
                                                Chuyển tiền
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }


    showFieldRequire() {
        return <Badge color="danger" pill>Yêu cầu</Badge>
    }
}

const mapDispatchToProps = dispatch => ({
    getInterbankAssociate: () => dispatch(getInterbankAssociate()),
    transfer: (data) => dispatch(transfer(data))
});

const mapStateToProps = (state) => {
    return {
        InterbankAssociate: state.InterbankAssociate,
        TransferInfo: state.TransferInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
