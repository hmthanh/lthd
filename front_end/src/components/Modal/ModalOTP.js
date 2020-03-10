import React, {Component} from 'react';
import './MessageBox.css';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {verifyOTP} from "../../redux/creators/transferCreator";
import {connect} from "react-redux";

class ModalOTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            otpCode: 0,
            transId: props.transId
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    onChange = (e) => {
        let value = e.value;
        this.setState({
            otpCode: value
        });
    };

    handleVerifyOTP = () => {
        let {OTP, transId} = this.props;
        let data = {
            transId: transId,
            OTP: OTP
        };
        console.log(data);
        let accessToken = localStorage.getItem('accessToken');
        this.props.verifyOTP(transId, data, accessToken);
    };

    render() {
        let {isOpen, className, otpCode} = this.state;
        let {transId, handleDelete} = this.props;
        return (
            <div>
                <Modal isOpen={isOpen} toggle={this.toggle} className={className}>
                    <ModalHeader toggle={this.toggle}>Vui lòng nhập mã OTP để xác nhận</ModalHeader>
                    <ModalBody>
                        <Input type="number" name="otpCode" id="otpCode"
                               onChange={this.onChange}
                               value={otpCode}
                               required/>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleVerifyOTP}>Đồng ý</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    verifyOTP: (transID, data, accessTocken) => dispatch(verifyOTP(transID, data, accessTocken))
});

const mapStateToProps = (state) => {
    return {
        VerifyResult: state.VerifyResult
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOTP);
