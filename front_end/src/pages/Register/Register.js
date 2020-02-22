import React, {Component} from 'react';

class Register extends Component {
    render() {
        return (
            <div className="container">
                <form classsName="form-horizontal" action='' method="POST">
                    <fieldset>
                        <div id="legend">
                            <legend classsName="">Register</legend>
                        </div>
                        <div classsName="control-group">
                            <label classsName="control-label" for="username">Username</label>
                            <div classsName="controls">
                                <input type="text" id="username" name="username" placeholder=""
                                       classsName="input-xlarge"/>
                                <p classsName="help-block">Username can contain any letters or numbers, without
                                    spaces</p>
                            </div>
                        </div>
                        <div classsName="control-group">
                            <label classsName="control-label" for="email">E-mail</label>
                            <div classsName="controls">
                                <input type="text" id="email" name="email" placeholder="" classsName="input-xlarge"/>
                                <p classsName="help-block">Please provide your E-mail</p>
                            </div>
                        </div>
                        <div classsName="control-group">
                            <label classsName="control-label" for="password">Password</label>
                            <div classsName="controls">
                                <input type="password" id="password" name="password" placeholder=""
                                       classsName="input-xlarge"/>
                                <p classsName="help-block">Password should be at least 4 characters</p>
                            </div>
                        </div>
                        <div classsName="control-group">
                            <label classsName="control-label" for="password_confirm">Password (Confirm)</label>
                            <div classsName="controls">
                                <input type="password" id="password_confirm" name="password_confirm" placeholder=""
                                       classsName="input-xlarge"/>
                                <p classsName="help-block">Please confirm password</p>
                            </div>
                        </div>
                        <div classsName="control-group">
                            <div classsName="controls">
                                <button classsName="btn btn-success">Register</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Register;
