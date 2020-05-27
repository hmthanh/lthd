import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Control, Errors, LocalForm} from "react-redux-form";
import {required} from "../../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

const EditEmployee = ({handleEdit, phone, email, name, accountId}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSubmit = (values) => {
    values = {...values, id: accountId};
    handleEdit(values);
    setModal(!modal)
  };

  return (
      <>
        <Button color="primary" onClick={toggle}>
          <FontAwesomeIcon style={{marginLeft: "5px"}} icon={faEdit}></FontAwesomeIcon>
          <span style={{marginLeft: "5px", paddingRight: "5px"}}>Sửa</span>
        </Button>

        <Modal isOpen={modal} fade={false} toggle={toggle}>
          <ModalHeader toggle={toggle}>Sửa</ModalHeader>
          <LocalForm id='edit-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
            <ModalBody>
              <div className='form-group'>
                <label htmlFor='name'>Tên</label>
                <Control.text model='.name' id='name' name='name'
                              className='form-control' autoComplete='off'
                              validators={{required}} defaultValue={name}/>
                <Errors className='text-danger' model='.name' show="touched"
                        messages={{required: 'Required'}}/>
              </div>


              <div className='form-group'>
                <label htmlFor='phone'>Phone</label>
                <Control.text model='.phone' id='phone' name='phone'
                              className='form-control' rows='6' autoComplete='off'
                              defaultValue={phone}/>
                <Errors className='text-danger' model='.phone' show="touched"
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <Control.text model='.email' id='email' name='email'
                              className='form-control' rows='6' autoComplete='off'
                              validators={{required}} defaultValue={email} disabled={true}/>
                <Errors className='text-danger' model='.email' show="touched"
                        messages={{required: 'Required'}}/>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="submit" className="btn btn-primary">Đồng ý</button>
            </ModalFooter>

          </LocalForm>


        </Modal>
      </>
  );
};

export default EditEmployee;