import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Control, Errors, LocalForm} from "react-redux-form";
import {required} from "../../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const AddEmployee = ({handleCreate}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    values = {...values,};
    console.log(values);
    handleCreate(values);
    setModal(!modal)
  };

  return (
      <div>
        <Button color="success" onClick={toggle}>
          <FontAwesomeIcon style={{marginLeft: "40px"}} icon={faPlus}></FontAwesomeIcon>
          <span style={{marginLeft: "5px", paddingRight: "40px"}}>Tạo mới</span>
        </Button>

        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>Thêm nhân viên</ModalHeader>
          <LocalForm id='create-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
            <ModalBody>
              <div className='form-group'>
                <label htmlFor='name'>Tên nhân viên</label>
                <Control.text model='.name' id='name' name='name'
                              className='form-control' autoComplete='off'
                              validators={{required}}/>
                <Errors className='text-danger' model='.name' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <Control.text type='email' model='.email' id='email' name='email'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}}/>
                <Errors className='text-danger' model='.email' show="touched"
                        messages={{required: 'Required'}}/>
              </div>

              <div className='form-group'>
                <label htmlFor='phone'>Phone</label>
                <Control.text type='text' model='.phone' id='phone' name='phone'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}}/>
                <Errors className='text-danger' model='.phone' show="touched"
                        messages={{required: 'Required'}}/>
              </div>

              <div className='form-group'>
                <label htmlFor='date_of_birth'>Ngày sinh</label>
                <Control.text type="date" model='.date_of_birth' id='date_of_birth' name='date_of_birth'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}}/>
                <Errors className='text-danger' model='.date_of_birth' show="touched"
                        messages={{required: 'Required'}}/>
              </div>

            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-primary">Đồng ý</button>
            </ModalFooter>
          </LocalForm>
        </Modal>
      </div>
  );
};

export default AddEmployee;