import React, {Component, useState} from 'react';
import {Alert, Card, CardBody, CardTitle} from 'reactstrap'
import {connect} from 'react-redux';
// import {getAllRemindDetaill} from '../../redux/creators/remindDetailCreator';


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
    // const uid = localStorage.getItem('uid');
    // this.props.getAllRemindDetaill(uid)
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
  // getAllRemindDetaill: (id) => dispatch(getAllRemindDetaill(id))
});

const mapStateToProps = (state) => {
  return {
    // RemindDetail: state.RemindDetail,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RemindPage)