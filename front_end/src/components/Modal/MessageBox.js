import React, {Component} from 'react';
import './MessageBox.css';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps", nextProps);
        this.setState({
            isOpen: nextProps.isOpen
        });
    }

    render() {
        let {isOpen, className} = this.state;
        return (
            <div>
                <Modal isOpen={isOpen} toggle={this.toggle} className={className}>
                    <ModalHeader toggle={this.toggle}>Chuyển tiền không thành công</ModalHeader>
                    <ModalBody>
                        Số tiền của bạn không đủ !
                        Vui lòng kiểm tra lại tài khoản
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggle}>Đồng ý</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


export default MessageBox