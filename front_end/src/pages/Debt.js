import React, {Component} from 'react';
import {Button, Table} from 'reactstrap';
import {connect} from 'react-redux';
import {getAllDebt} from '../redux/creators/debtCreator'

class debtPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getAll(1);
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