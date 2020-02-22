import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Control, Errors, LocalForm} from 'react-redux-form';

const required = (val) => val && val.length;

class FogetPassword extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isFailed: false
        }
    }

    handleSubmit(values) {
        // this.props.login(values.userName, values.password)
        //     .then(() => {
        //         //localStorage.setItem('user', this.props.Login.data)
        //         // console.log(this.props.Login)
        //         if (this.props.Login.errMess === '' || this.props.Login.errMess === null || this.props.Login.errMess === undefined) {
        //           // console.log('login ', this.props.Login.data)
        //           localStorage.setItem('uid', this.props.Login.data.user.id)
        //           localStorage.setItem('accessToken', this.props.Login.data.accessToken)
        //           localStorage.setItem('refreshToken', this.props.Login.data.refreshToken)
        //           this.props.history.push("/")
        //         } else
        //           this.setState({isFailed: true})
        //     })
    }

    render() {
        return (
            <div className="container" style={{marginTop: '20px'}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {
                            //   this.state.isFailed&&
                            //   <Alert color="danger">
                            //     {this.props.Login.errMess}
                            // </Alert>
                        }
                        <div className="card-group mb-0">
                            <div className="card p-4">
                                <div className="card-block">
                                    <h1>Quên Mật Khẩu</h1>
                                    {/* <p className="text-muted">Sign In to your account</p> */}
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                        <div className='form-group'>
                                            <label htmlFor='password1'>Mật Khẩu Mới</label>
                                            <Control.password model='.password1' id='password1' name='password1'
                                                              className='form-control' rows='6' autoComplete='off'
                                                              validators={{required}}/>
                                            <Errors className='text-danger' model='.password1' show="touched"
                                                    messages={{required: 'Required'}}/>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='password2'>Nhập Lại Mật Khẩu Mới</label>
                                            <Control.password model='.password2' id='password2' name='password1'
                                                              className='form-control' rows='6' autoComplete='off'
                                                              validators={{required}}/>
                                            <Errors className='text-danger' model='.password2' show="touched"
                                                    messages={{required: 'Required'}}/>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='otp'>OTP: </label>
                                            <Control.text model='.otp' id='otp' name='otp'
                                                          className='form-control' autoComplete='off'
                                                          validators={{required}}/>
                                            <Errors className='text-danger' model='.otp' show="touched"
                                                    messages={{required: 'Required'}}/>
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
    // login: (userName, password) => dispatch(login({userName, password})),
});

const mapStateToProps = (state) => {
    return {
        // Login: state.Login,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FogetPassword);