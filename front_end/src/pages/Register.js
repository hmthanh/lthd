import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { required, requiredText, validEmail, validEmailText, isNumber, isNumberText} from '../utils/utils';


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
			<div className="container" style={{ marginTop: '10px' }}>
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card-group mb-0">
							<div className="card p-4">
								<div className="card-block">
									<h1>Đăng ký</h1>
									<p className="text-muted">Đăng ký tài khoản</p>
									<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
										<div className='form-group'>
											<label htmlFor='.name'>Họ Tên:</label>
											<Control.text model='.name' id='name' name='name'
												className='form-control' autoComplete='off'
												validators={{ required }} />
											<Errors className='text-danger' model='.userName' show="touched"
												messages={{ required: requiredText}} />
										</div>
										<div className='form-group'>
											<label htmlFor='.email'>Email:</label>
											<Control.text model='.email' id='email' name='email'
												className='form-control' autoComplete='off'
												validators={{ required, validEmail }} />
											<Errors className='text-danger' model='.email' show="touched"
												messages={{ required: requiredText, validEmail: validEmailText }} />
										</div>
										<div className='form-group'>
											<label htmlFor='.phone'>Số Điện Thoại:</label>
											<Control.text model='.phone' id='phone' name='phone'
												className='form-control' autoComplete='off'
												validators={{ required, isNumber }} />
											<Errors className='text-danger' model='.phone' show="touched"
												messages={{ required: requiredText, isNumber: isNumberText }} />
										</div>
										<button type="submit" className="btn btn-primary">Đăng ký</button>
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
});

const mapStateToProps = (state) => {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);