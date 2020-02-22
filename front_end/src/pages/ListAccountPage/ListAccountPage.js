import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'reactstrap'
import {getAllAccount} from '../../redux/creators/accountCreator'

class ListAccountPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getAllAccount(1);
    }

    render() {
        return (
            <div className="container" style={{marginTop: '20px'}}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card-group mb-0">
                            <div className="card p-6">
                                <div className="card-block">
                                    <h1 className="col-centered table-heading">Danh sách tài khoản</h1>
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Loại tài khoản</th>
                                            <th>Số tài khoản</th>
                                            <th>Số dư hiện tại</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.AccountInfo.data.val &&
                                            this.props.AccountInfo.data.val.map(item => (
                                                <tr key={item.id}>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.type}</td>
                                                    <td>{item.number}</td>
                                                    <td>{item.money}</td>
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
    getAllAccount: (id) => dispatch(getAllAccount(id))
});

const mapStateToProps = (state) => {
    return {
        AccountInfo: state.AccountInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAccountPage);