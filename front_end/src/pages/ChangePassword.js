import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Alert } from 'reactstrap'
import {changepwd} from '../redux/creators/changePasswordCreator'

const required = (val) => val && val.length;

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isFailed: false
    }
    let uid = localStorage.getItem('uid')
    if(!uid) {
      this.props.history.push('/login')
    }
  }

  handleSubmit(values) {
    let uid = localStorage.getItem('uid')
    if(!uid) {
      this.props.history.push('/login')
    } else {
      this.props.changepwd(uid, values.password1, values.password2, values.oldpassword)
      .then(()=>{
        if(!this.props.ChangePassword.errMess) {
          this.props.history.push('/')
        }
      })
    }
  }
  render() {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
          {
            this.props.ChangePassword.errMess&&
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changepwd: (uId, newPw1, newPw2, oldPw) => dispatch(changepwd(uId, newPw1, newPw2, oldPw)),
  // login: (userName, password) => dispatch(login({userName, password})),
});

const mapStateToProps = (state) => {
  return {
    ChangePassword: state.ChangePassword,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);