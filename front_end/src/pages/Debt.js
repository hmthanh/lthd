import React, {Component, useState} from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form'
import {
    Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Modal, ModalBody,
    ModalFooter, ModalHeader, Table
  } from 'reactstrap'
import {connect} from 'react-redux';
import {getAllDebt,Create, Delete, Edit} from '../redux/creators/debtCreator';
import Loading from '../components/Loading';




// const required = (val) => val && val.length;

// const ModalAddNew = (props) => {
//   const {
//     buttonLabel,
//     className,
//     handleCreate
//   } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   const handleSubmit = (values) => {
//     values = { ...values, banking: 0 }
//     console.log(values)
//     handleCreate(values)
//     setModal(!modal)
//   };

//   return (
//     <div>
//       <Button color="success" onClick={toggle}>{buttonLabel}</Button>
//       <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
//         <ModalHeader toggle={toggle}>Thêm mới nợ</ModalHeader>
//         <LocalForm id='create-ac' onSubmit={(values) => handleSubmit(values)} autoComplete="off">
//           <ModalBody>

//             <div className='form-group'>
//               <label htmlFor='accountNum'>Số tài Khoản</label>
//               <Control.text model='.accountNum' id='accountNum' name='accountNum'
//                 className='form-control' autoComplete='off'
//                 validators={{ required }} />
//               <Errors className='text-danger' model='.accountNum' show="touched"
//                 messages={{ required: 'Required' }} />
//             </div>
//             <div className='form-group'>
//               <label htmlFor='aliasName'>Tên gợi nhớ</label>
//               <Control.text model='.aliasName' id='aliasName' name='aliasName'
//                 className='form-control' rows='6' autoComplete='off'
//                 validators={{ required }} />
//               <Errors className='text-danger' model='.aliasName' show="touched"
//                 messages={{ required: 'Required' }} />
//             </div>
//           </ModalBody>
//           <ModalFooter>
//             <button type="submit" className="btn btn-primary">Đồng ý</button>
//           </ModalFooter>

//         </LocalForm>


//       </Modal>
//     </div>
//   );
// };





class debtPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('accessToken')
        let uid = localStorage.getItem('uid');
        this.props.getAll(uid, accessToken);
    }


    render() {
        return (
            <div className="container" style={{marginTop: '20px'}}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card-group mb-0">
                            <div className="card p-6">
                                <div className="card-block">
                                    <h1>Danh sách nợ chưa thanh toán</h1>
                                    <Button color="success">Thêm mới</Button>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tài khoản nợ</th>
                                            <th>Số tiền</th>
                                            <th>Ngày giao dịch</th>
                                            <th>Nhắc nhở</th>
                                            <th>Xóa</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.DebtInfo.data.val &&
                                            // console.log(this.props.DebtInfo.data.val)
                                            this.props.DebtInfo.data.val.map(item => (
                                                <tr key={item.id}>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.userdebt}</td>
                                                    <td>{item.total}</td>
                                                    <td>{item.day.toString()}</td>
                                                    <td><Button outline color="warning">Nhắc nhở</Button></td>
                                                    <td><Button outline color="danger">Xóa</Button></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
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
    getAll: (id) => dispatch(getAllDebt(id))
});

const mapStateToProps = (state) => {
    return {
        DebtInfo: state.DebtInfo,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(debtPage);