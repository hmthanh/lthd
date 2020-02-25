import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'reactstrap'
import {getAllReceiver} from '../../redux/creators/receiverInfoCreator'

class ListReceiverPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getAllReceiver(1);
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
                                            <th>Số tài khoản</th>
                                            <th>Tên tài khoản</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.ReceiverInfo.data.val &&
                                            this.props.ReceiverInfo.data.val.map(item => (
                                                <tr key={item.id}>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.number}</td>
                                                    <td>{item.name}</td>
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
    getAllReceiver: (id) => dispatch(getAllReceiver(id))
});

const mapStateToProps = (state) => {
    return {
        ReceiverInfo: state.ReceiverInfo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListReceiverPage);