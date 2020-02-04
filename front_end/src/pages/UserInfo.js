import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Card, Form, Label, CardBody,
  CardTitle, Col, Button, FormGroup
} from 'reactstrap';
import {Link} from 'react-router-dom'

class UserInfo extends Component {

  componentDidMount() {
    console.log('componentDidMount', this.props.Login.data.user)
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
          <Link to="/resetpws">Đổi mật khẩu</Link>
        </CardBody>
      </Card>
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    Login: state.Login,
  }
}

export default connect(mapStateToProps)(UserInfo);

// export default UserInfo;