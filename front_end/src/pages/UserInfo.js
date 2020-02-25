import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, CardBody, CardTitle, Col, Form, FormGroup, Label} from 'reactstrap'
import {getBankingInfo} from '../redux/creators/bankingInfoCreator'
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format';

class UserInfo extends Component {

    componentDidMount() {
        console.log('componentDidMount', this.props.Login.data.user);
        if (this.props.Login.data.authenticated) {
            this.props.getBankingInfo(this.props.Login.data.user.id)
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Thông tin tài khoản</CardTitle>
                        <Form>
                            <FormGroup row>
                                <Col sm={4}>
                                    <Label>Số tài khoản</Label>
                                </Col>
                                <Col sm={8}>
                                    {this.props.Login.data.user && this.props.Login.data.user.account_num}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={2}>
                                    <Label>Số dư</Label>
                                </Col>
                                <Col sm={2}>
                                    <Label>tài khoản chính: </Label>
                                </Col>
                                <Col sm={3}>
                                    <CurrencyFormat value={this.props.BankingInfo.data.main} displayType={'text'}
                                                    thousandSeparator={true} prefix={'VND '}/>
                                </Col>
                                <Col sm={2}>
                                    <Label>tài khoản tiết kiệm: </Label>
                                </Col>
                                <Col sm={3}>
                                    <CurrencyFormat value={this.props.BankingInfo.data.saving_money}
                                                    displayType={'text'} thousandSeparator={true} prefix={'VND '}/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={4}>
                                    <Label>user name</Label>
                                </Col>
                                <Col sm={8}>
                                    {this.props.Login.data.user && this.props.Login.data.user.user_name}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={4}>
                                    <Label>Họ Tên</Label>
                                </Col>
                                <Col sm={8}>
                                    {this.props.Login.data.user && this.props.Login.data.user.name}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={4}>
                                    <Label>Email</Label>
                                </Col>
                                <Col sm={8}>
                                    {this.props.Login.data.user && this.props.Login.data.user.email}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={4}>
                                    <Label>Số Điện Thoại</Label>
                                </Col>
                                <Col sm={8}>
                                    +{this.props.Login.data.user && this.props.Login.data.user.phone}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={4}>
                                    <Label>Ngày Tháng Năm Sinh</Label>
                                </Col>
                                <Col sm={8}>
                                    {this.props.Login.data.user && this.props.Login.data.user.date_of_birth}
                                </Col>
                            </FormGroup>

                        </Form>
                        <Link to="/changepwd">Đổi mật khẩu</Link>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getBankingInfo: (uid) => dispatch(getBankingInfo(uid)),
});

const mapStateToProps = (state) => {
    return {
        Login: state.Login,
        BankingInfo: state.BankingInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

// export default UserInfo;