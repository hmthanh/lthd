import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Errors, LocalForm } from 'react-redux-form';

const required = (val) => val && val.length;

class Register extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleSubmit(values) {
		// this.props.login(values.userName, values.password)
		//     .then(() => {
		//         localStorage.setItem('user', this.props.user.data)
		//         this.props.history.push("/");
		//     })
	}

	render() {
		return (
			<div className="container" style={{ marginTop: '230px' }}>
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card-group mb-0">
							<div className="card p-4">
								<div className="card-block">
									<h1>Login</h1>
									<p className="text-muted">Sign In to your account</p>
									{/* <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

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
										<button type="submit" className="btn btn-primary">Login</button>
									</LocalForm> */}

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
});

const mapStateToProps = (state) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);