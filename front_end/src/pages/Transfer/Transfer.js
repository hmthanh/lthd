import React, {Component} from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardTitle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row
} from "reactstrap";

class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interbankID: 1,
            isInterbank: true
        };
        this.setRSelected = this.setRSelected.bind(this);
        this.changeInterbank = this.changeInterbank(this);
    }

    changeInterbank() {
        this.setState({
            isInterbank: false
        })
    }

    setRSelected(number) {
        this.setState({
            interbankID: number
        })
    }

    render() {
        return (
            <div className="container">

                <div className="container-fluid py-3">
                    <Row className=" d-flex justify-content-center">
                        <h3 className="text-center">CHUYỂN KHOẢN</h3>
                    </Row>
                    <Row>
                        <ButtonGroup className="mb-2">
                            <Button color="primary" onClick={() => this.setRSelected(1)}
                                    active={this.state.interbankID === 1}>Nội bộ</Button>
                            <Button color="primary" onClick={() => this.setRSelected(2)}
                                    active={this.state.interbankID === 2}>Liên ngân hàng</Button>
                        </ButtonGroup>
                    </Row>

                    <Row>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
                            <Card id="localBank">
                                <div className="card-body">
                                    <CardTitle>
                                        <h3 className="text-center">Nội bộ</h3>
                                    </CardTitle>
                                    <hr/>
                                    <Form method="post" noValidate="novalidate"
                                          className="needs-validation">
                                        <h4>1. Người gửi</h4>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Thông tin người gửi</Label>
                                            <Input type="select" name="select" id="sourceTransfer">
                                                <option>Tài khoản thanh toán 1
                                                </option>
                                                <option>Tài khoản thanh toán 2
                                                </option>
                                                <option>Tài khoản tiết kiệm
                                                </option>
                                            </Input>
                                        </FormGroup>
                                        <h4>2. Người nhận</h4>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Loại ngân hàng</Label>
                                            <br/>
                                            <ButtonGroup className="mb-2">
                                                <Button color="primary" onClick={() => this.setRSelected(1)}
                                                        active={this.state.interbankID === 1}>Nội bộ</Button>
                                                <Button color="primary" onClick={() => this.setRSelected(2)}
                                                        active={this.state.interbankID === 2}>Liên ngân hàng</Button>
                                            </ButtonGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Chọn ngân hàng</Label>
                                            <Input type="select" name="select" id="sourceTransfer">
                                                <option>Ngân hàng 1</option>
                                                <option>Ngân hàng 2</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Thông tin
                                                người nhận</Label>
                                            <Input type="select" name="select" id="sourceTransfer">
                                                <option>-- Chọn --
                                                </option>
                                                <option>Tài khoản Trần Văn A
                                                </option>
                                                <option>Tài khoản Nguyễn Văn B
                                                </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Số tài khoản</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" name="receiverTransfer" id="receiverTransfer"
                                                       placeholder="2343-5928-3472"/>
                                            </InputGroup>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Họ và tên</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" name="fullNameTransfer" id="fullNameTransfer"
                                                       placeholder="Nguyễn Văn A"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <h4 for="moneyTransfer">3. Thông tin cần chuyển tiền</h4>
                                        <FormGroup>
                                            <Label for="msgTransfer">Số tiền</Label>
                                            <Input type="number" name="money" id="moneyTransfer" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="msgTransfer">Nội dung chuyển tiền</Label>
                                            <Input type="textarea" name="text" id="msgTransfer"/>
                                        </FormGroup>
                                        <FormGroup tag="fieldset">
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="radio1"/>{' '}
                                                    Người nhận trả phí
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="radio1"/>{' '}
                                                    Người gửi trả phí
                                                </Label>
                                            </FormGroup>
                                        </FormGroup>
                                        <div>
                                            <Button id="btnTransfer" type="submit"
                                                    className="btn btn-lg btn-info btn-block">
                                                <span id="lblTransfer">Chuyển tiền</span>
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
                            <Card id="interBank">
                                <div className="card-body">
                                    <CardTitle>
                                        <h3 className="text-center">Liên ngân hàng</h3>
                                    </CardTitle>
                                    <hr/>
                                    <Form method="post" noValidate="novalidate"
                                          className="needs-validation">
                                        <h4>1. Người gửi</h4>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Thông tin người gửi</Label>
                                            <Input type="select" name="select" id="sourceTransfer">
                                                <option>Tài khoản thanh toán 1
                                                </option>
                                                <option>Tài khoản thanh toán 2
                                                </option>
                                                <option>Tài khoản tiết kiệm
                                                </option>
                                            </Input>
                                        </FormGroup>
                                        <h4>2. Người nhận</h4>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Loại ngân hàng</Label>
                                            <br/>
                                            <ButtonGroup className="mb-2">
                                                <Button color="primary" onClick={() => this.setRSelected(1)}
                                                        active={this.state.interbankID === 1}>Nội bộ</Button>
                                                <Button color="primary" onClick={() => this.setRSelected(2)}
                                                        active={this.state.interbankID === 2}>Liên ngân hàng</Button>
                                            </ButtonGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Chọn ngân hàng</Label>
                                            <Input type="select" name="select" id="sourceTransfer">
                                                <option>Ngân hàng 1</option>
                                                <option>Ngân hàng 2</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Thông tin
                                                người nhận</Label>
                                            <Input type="select" name="select" id="sourceTransfer">
                                                <option>-- Chọn --
                                                </option>
                                                <option>Tài khoản Trần Văn A
                                                </option>
                                                <option>Tài khoản Nguyễn Văn B
                                                </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="mb-2">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Số tài khoản</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" name="receiverTransfer" id="receiverTransfer"
                                                       placeholder="2343-5928-3472"/>
                                            </InputGroup>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Họ và tên</InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" name="fullNameTransfer" id="fullNameTransfer"
                                                       placeholder="Nguyễn Văn A"/>
                                            </InputGroup>
                                        </FormGroup>
                                        <h4 htmlFor="moneyTransfer">3. Thông tin cần chuyển tiền</h4>
                                        <FormGroup>
                                            <Label for="msgTransfer">Số tiền</Label>
                                            <Input type="number" name="money" id="moneyTransfer" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="msgTransfer">Nội dung chuyển tiền</Label>
                                            <Input type="textarea" name="text" id="msgTransfer"/>
                                        </FormGroup>
                                        <FormGroup tag="fieldset">
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="radio1"/>{' '}
                                                    Người nhận trả phí
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check>
                                                <Label check>
                                                    <Input type="radio" name="radio1"/>{' '}
                                                    Người gửi trả phí
                                                </Label>
                                            </FormGroup>
                                        </FormGroup>
                                        <div>
                                            <Button id="btnTransfer" type="submit"
                                                    className="btn btn-lg btn-info btn-block">
                                                <span id="lblTransfer">Chuyển tiền</span>
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Transfer;
