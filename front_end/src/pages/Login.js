import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Control, Errors, LocalForm } from 'react-redux-form'
import { Alert } from 'reactstrap'
import { login } from '../redux/creators/loginCreator'
import ReCAPTCHA from "react-google-recaptcha";

const required = (val) => val && val.length
const recaptchaRef = React.createRef();

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isFailed: false
    }
  }

  handleSubmit(values) {
    let recaptcha = recaptchaRef.current.getValue()
    console.log('recaptcha ', recaptcha)
    if(recaptcha) {
      this.props.login(values.userName, values.password)
        .then(() => {
          if (this.props.Login.data.authenticated) {
            localStorage.setItem('uid', this.props.Login.data.user.id)
            localStorage.setItem('accessToken', this.props.Login.data.accessToken)
            localStorage.setItem('refreshToken', this.props.Login.data.refreshToken)
            this.props.history.push("/")
          } else {
            this.setState({ isFailed: true })
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
              this.state.isFailed &&
              <Alert color="danger">
                {this.props.Login.errMess}
                {!this.props.Login.authenticated && 'Mật Khẩu Hoặc Tên Đăng Nhập Sai'}
              </Alert>
            }
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <div className='form-group'>
                      <label htmlFor='userName'>Your Account</label>
                      <Control.text model='.userName' id='userName' name='userName'
                        className='form-control' autoComplete='off'
                        validators={{ required }} />
                      <Errors className='text-danger' model='.userName' show="touched"
                        messages={{ required: 'Required' }} />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password'>Password</label>
                      <Control.password model='.password' id='password' name='password'
                        className='form-control' rows='6' autoComplete='off'
                        validators={{ required }} />
                      <Errors className='text-danger' model='.password' show="touched"
                        messages={{ required: 'Required' }} />
                    </div>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LcPtdwUAAAAAGb2pehug_-EHNmV5Ywj7d_9gsWn"
                    />
                    <button type="submit" className="btn btn-primary">Login</button>
                  </LocalForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: (userName, password) => dispatch(login({ userName, password })),
})

const mapStateToProps = (state) => {
  return {
    Login: state.Login,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)