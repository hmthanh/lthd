import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {Control, Errors, LocalForm} from 'react-redux-form'
import {isNumber, isNumberText, required, requiredText, validEmail, validEmailText} from '../utils/utils'
import DatePicker from 'react-datepicker'
import {backRegister, register} from '../redux/creators/registerCreator'
import {Alert, Button} from 'reactstrap'

import 'react-datepicker/dist/react-datepicker.css'
import Loading from '../components/Loading'

const DateInput = (props) => {
  let maxDate = new Date();
  maxDate.setFullYear(2002);
  const [startDate, setStartDate] = useState(maxDate);
  return (
      <DatePicker className='form-control'
                  selected={startDate}
                  dateFormat='dd/MM/yyyy'
                  autoComplete='off'
                  onChange={
                    date => {
                      props.onChange(date);
                      return setStartDate(date)
                    }
                  }/>
  );
};

class Register extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleSubmit(values) {
    // console.log(values)
    let info = {...values};
    delete info.dob;
    let dob = values.dob;
    if (!dob) {
      dob = new Date();
      dob.setFullYear(2002)
    }
    let date_of_birth = dob.getDate() + '-' + (dob.getMonth() + 1) + '-' + dob.getFullYear();
    info['date_of_birth'] = date_of_birth;
    this.props.register(info)
  }

  handleBack() {
    this.props.backRegister()
  }

  render() {
    if (this.props.Register.isLoading) {
      return (
          <div className="container" style={{marginTop: '10px'}}>
            <div className="row justify-content-center">
              <Loading/>
            </div>
          </div>
      )
    } else if (this.props.Register.errMess) {
      return (
          <div className="container" style={{marginTop: '10px'}}>
            <div className="row justify-content-center">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <Alert color="danger">
                    {this.props.Register.errMess}
                  </Alert>
                  <Button color="primary" size="sm" onClick={this.handleBack}>Quay Lại</Button>{' '}
                </div>
              </div>
            </div>
          </div>
      )
    } else
      return (
          <div className="container" style={{marginTop: '10px'}}>
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
                                        validators={{required}}/>
                          <Errors className='text-danger' model='.name' show="touched"
                                  messages={{required: requiredText}}/>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='.email'>Email:</label>
                          <Control.text model='.email' id='email' name='email'
                                        className='form-control' autoComplete='off'
                                        validators={{required, validEmail}}/>
                          <Errors className='text-danger' model='.email' show="touched"
                                  messages={{
                                    required: requiredText,
                                    validEmail: validEmailText
                                  }}/>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='.phone'>Số Điện Thoại:</label>
                          <Control.text model='.phone' id='phone' name='phone'
                                        className='form-control' autoComplete='off'
                                        validators={{required, isNumber}}/>
                          <Errors className='text-danger' model='.phone' show="touched"
                                  messages={{required: requiredText, isNumber: isNumberText}}/>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='.dob'>Ngày sinh:</label> {'  '}
                          <Control.text className='form-control'
                                        model=".dob"
                                        component={DateInput}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">Đăng ký</button>
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
  register: (formVal) => dispatch(register(formVal)),
  backRegister: () => dispatch(backRegister())
});

const mapStateToProps = (state) => {
  return {
    Register: state.Register,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)