import React, {Component} from 'react';
import './MessageBox.css';
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {verifyOTP} from "../../redux/creators/transferCreator";
import {connect} from "react-redux";

class ModalOTP extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            OTP: 0,
            transId: props.transId
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    onChange = (e) => {
        this.setState({
            OTP: e.target.value
        });
    };

    handleVerifyOTP = () => {
        let {OTP, transId} = this.state;
        let data = {
            transId: transId,
            OTP: OTP
        };
        console.log(data);
        let accessToken = localStorage.getItem('accessToken');
        this.props.verifyOTP(transId, data, accessToken);
    };

    render() {
        let {className, OTP} = this.state;
        console.log("ppsdf", this.props.transId);

        return (
            <div>
                <Modal isOpen={true} toggle={this.toggle} className={className}>
                    <ModalHeader>Vui lòng nhập mã OTP để xác nhận</ModalHeader>
                    <ModalBody>
                        <Input type="number" name="OTP" id="OTP"
                               onChange={this.onChange}
                               value={OTP}
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
    verifyOTP: (transID, data, accessToken) => dispatch(verifyOTP(transID, data, accessToken))
});

const mapStateToProps = (state) => {
    return {
        VerifyResult: state.VerifyResult
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOTP);
