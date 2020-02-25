import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <form className="form-signin">
                    <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" eight="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Đăng nhập</h1>
                    <label for="inputEmail" className="sr-only">Email</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                           autofocus=""/>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required=""/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Đăng nhập</button>
                </form>
            </div>
        );
    }
}

export default Login;
