import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

class Transfer extends Component {
    render() {

        return (
            <div className="container">
                <div className="container-fluid py-3">
                    <div className="row">
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
                            <div id="pay-invoice" className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h3 className="text-center">Chuyển khoản</h3>
                                    </div>
                                    <hr/>
                                    <Form method="post" noValidate="novalidate"
                                          className="needs-validation">
                                        <FormGroup>
                                            <Label for="exampleSelect">Tài khoản gửi</Label>
                                            <Input type="select" name="select" id="sourceTransfer">
                                                <option>Tài khoản thanh toán
                                                    1
                                                </option>
                                                <option>Tài khoản thanh toán
                                                    2
                                                </option>
                                                <option>Tài khoản
                                                    tiết kiệm
                                                </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="receiverTransfer">Thông tin
                                                người nhận</Label>
                                            <Input type="text" name="receiverTransfer" id="receiverTransfer"
                                                   placeholder="Thông tin người nhận"/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="moneyTransfer">Số tiền</Label>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transfer;
