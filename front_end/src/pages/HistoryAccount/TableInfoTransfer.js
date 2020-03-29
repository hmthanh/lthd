import React, {Component} from 'react';
import {Table} from 'reactstrap'
import './HistoryAccount.css';

export default class TableInfoTransfer extends Component {
  render() {
    let {tableInfo} = this.props;
    return (
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Ngày giao dịch</th>
            <th>Loại giao dịch</th>
            <th>Tài khoản giao dịch</th>
            <th>Số tiền</th>
          </tr>
          </thead>
          <tbody>
          {
            tableInfo &&
            tableInfo.map(item => (
                <tr key={item.id}>
                  <td scope="row">{item.id}</td>
                  <td>{new Intl.DateTimeFormat('vi-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    year: 'numeric',
                    month: 'numeric',
                    day: '2-digit',

                  }).format(new Date(item.dayTransaction))}</td>
                  <td>{item.typeTransaction}</td>
                  <td>{item.accountNumber}</td>
                  <td>{item.moneyTransaction}</td>
                </tr>
            ))
          }
          </tbody>
        </Table>

    )
  }
}