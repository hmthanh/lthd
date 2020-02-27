import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Alert } from 'reactstrap'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { changepwd, verifyPassword } from '../redux/creators/changePasswordCreator'

const required = (val) => val && val.length;

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitOTP = this.handleSubmitOTP.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isFailed: false,
      modal: false
    };
    let uid = localStorage.getItem('uid');
    if (!uid) {
      this.props.history.push('/login')
    }
  }

  handleSubmit(values) {
    let uid = localStorage.getItem('uid')
    if (!uid) {
      this.props.history.push('/login')
    } else {
      this.props.verifyPassword(uid, values.oldpassword, values.password1, values.password2).then(() => {
        if(this.props.ChangePassword.data.authenticated){
          console.log("authen OTP and submit .... ")
          this.setState({
            modal: !this.state.modal,
            pwd: values.password1
          })
        }
      })
    }
  }

  toggle() {
    this.setState({modal: !this.state.modal})
  }

  handleSubmitOTP(values) {
    console.log(values)
    let uid = localStorage.getItem('uid')
    this.props.changepwd(uid, this.state.pwd, values.otp)
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Mã OTP</ModalHeader>
        <LocalForm id='confirm-otp' onSubmit={(values) => this.handleSubmitOTP(values)} autoComplete="off">
          <ModalBody>
            <div className='form-group'>
              <label htmlFor='otp'>Số tài Khoản</label>
              <Control.text model='.otp' id='otp' name='otp'className='form-control' autoComplete='off'
                validators={{ required }} />
              <Errors className='text-danger' model='.otp' show="touched"
                messages={{ required: 'Required' }} />
            </div>
            {
              this.props.ChangePassword.errMess &&
              <Alert color="danger">
                {'Sai OTP'}
              </Alert>
            }
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-primary">Đồng ý</button>
          </ModalFooter>
        </LocalForm>
      </Modal>
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {
              this.props.ChangePassword.errMess &&
              <Alert color="danger">
                {this.props.ChangePassword.errMess}
              </Alert>
            }
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <h1>Đổi Mật Khẩu</h1>
                  {/* <p className="text-muted">Sign In to your account</p> */}
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <div className='form-group'>
                      <label htmlFor='password1'>Mật Khẩu Mới</label>
                      <Control.password model='.password1' id='password1' name='password1'
                        className='form-control' rows='6' autoComplete='off'
                        validators={{ required }} />
                      <Errors className='text-danger' model='.password1' show="touched"
                        messages={{ required: 'Required' }} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password2'>Nhập Lại Mật Khẩu Mới</label>
                      <Control.password model='.password2' id='password2' name='password1'
                        className='form-control' rows='6' autoComplete='off'
                        validators={{ required }} />
                      <Errors className='text-danger' model='.password2' show="touched"
                        messages={{ required: 'Required' }} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='oldpassword'>Mật Khẩu Cũ</label>
                      <Control.password model='.oldpassword' id='oldpassword' name='oldpassword'
                        className='form-control' rows='6' autoComplete='off'
                        validators={{ required }} />
                      <Errors className='text-danger' model='.oldpassword' show="touched"
                        messages={{ required: 'Required' }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
                  </LocalForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changepwd: (uId, newPw1, OTP) => dispatch(changepwd(uId, newPw1, OTP)),
  verifyPassword: (uId, oldPwd, newPw1, newPw2)  => dispatch(verifyPassword(uId, oldPwd, newPw1, newPw2))
  // login: (userName, password) => dispatch(login({userName, password})),
});

const mapStateToProps = (state) => {
  return {
    ChangePassword: state.ChangePassword,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);