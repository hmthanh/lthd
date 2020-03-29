import React from 'react';
import {Table} from 'reactstrap';

const TableInfoTransfer = ({data}) => {
  return (
      <Table>
        <thead>
        <tr>
          <th>#</th>
          <th>Ngày giao dịch</th>
          <th>Loại giao dịch</th>
          <th>Tài khoản giao dịch</th>
          <th>Tài khoản thụ hưởng</th>
          <th>Số tiền</th>
          <th>Số dư</th>
        </tr>
        </thead>
        <tbody>
        {
          data.item &&
          data.item.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.id}</th>
                <td>{new Intl.DateTimeFormat('vi-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',

                }).format(new Date(item.timestamp))}</td>
                <td>{item.type === 1 ? 'Cộng tiền' : 'Trừ tiền'}</td>
                <td>{item.from_account}</td>
                <td>{item.to_account}</td>
                <td>{item.amount}</td>
                <td>{item.surplus}</td>
              </tr>
          ))
        }
        </tbody>
      </Table>
  )
};

export default TableInfoTransfer;