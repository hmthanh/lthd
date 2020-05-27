import React, {Component, useState} from 'react';
import {Alert, Card, CardBody, CardTitle} from 'reactstrap'
import {connect} from 'react-redux';
import {getAllRemindDetail} from "../../redux/actions/remindDetail.action";


const AlertExample = ({data}) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        {data.name} nhắc nợ bạn khoản nợ {data.debt_val} ghi chú {data.note}
      </Alert>
  );
};

class RemindPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');

    this.props.getAllRemindDetaill(uid, accessToken);
  }


  render() {
    return (

        <div style={{marginTop: '20px'}}>
          <Card>
            <CardBody>
              {
                this.props.RemindDetail.data.item &&
                this.props.RemindDetail.data.item.length === 0 &&
                <CardTitle>Không có thông báo</CardTitle>

              }
              {
                this.props.RemindDetail.data.item &&
                this.props.RemindDetail.data.item.map((item, index) => (
                    <AlertExample key={index} data={item}/>
                ))
              }


            </CardBody>
          </Card>
        </div>


    )
  }
}

const mapDispatchToProps = dispatch => ({
  getAllRemindDetaill: (id, accessToken) => dispatch(getAllRemindDetail(id, accessToken))
});

const mapStateToProps = (state) => {
  return {
    RemindDetail: state.RemindDetail,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RemindPage)