import React from 'react';
import {Table} from 'reactstrap';

const TableInfoDept = ({data}) => {
  return (
      <Table>
        <thead>
        <tr>
          <th>#</th>
          <th>Ngày nợ</th>
          <th>Họ và tên</th>
          <th>Số nợ</th>
          <th>Ghi chú</th>
        </tr>
        </thead>
        <tbody>
        {
          data.item &&
          data.item.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{new Intl.DateTimeFormat('vi-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',

                }).format(new Date(item.date_time))}</td>
                <td>{item.name}</td>
                <td>{item.debt_val}</td>
                <td>{item.note}</td>
              </tr>
          ))
        }
        </tbody>
      </Table>
  )
};

export default TableInfoDept;