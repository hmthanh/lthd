import React, { Component } from 'react';
import {
  Badge
} from 'reactstrap'
import { connect } from 'react-redux';
import { getAllRemind } from '../redux/creators/remindCreator';


class remindPage extends Component {

    constructor(props) {
      super(props);
      this.state = {}
    }
  
    componentDidMount() {
      const account_num = localStorage.getItem('account_num')
      this.props.getAll(account_num)
    }
  
  
    render() {
      return (

                          this.props.RemindInfo.data.val &&
                          // console.log(this.props.HistoryInfo.data.val)
                          this.props.RemindInfo.data.val.map(item => ( 
                            <Badge style={{ position: "absolute", top: '0px', right: '0px', fontSize: '8px' }}
                             color="secondary">{item.num}
                            </Badge>
                          ))
                        
                      
      )
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    account_num: (account_num) => dispatch(getAllRemind(account_num))
  })
  
  const mapStateToProps = (state) => {
    return {
      RemindInfo: state.RemindInfo,
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(remindPage)