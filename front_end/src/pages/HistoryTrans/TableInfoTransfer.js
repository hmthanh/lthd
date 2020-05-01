import React from 'react';
import {Table} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort} from '@fortawesome/free-solid-svg-icons'
import useSortableData from "../../utils/useSortableData";

const TableInfoTransfer = (props) => {
  console.log("receiving", props.receiving);
  const {items, requestSort, sortConfig} = useSortableData(props.data.item);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
      <Table>
        <thead>
        <tr>
          <th>
            <div onClick={() => requestSort("trans_id")}
                 className={getClassNamesFor('trans_id')}>
              #
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("timestamp")}
                className={getClassNamesFor('timestamp')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Ngày giao dịch
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("type")}
                className={getClassNamesFor('type')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Loại giao dịch
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("from_account")}
                className={getClassNamesFor('from_account')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Tài khoản nguồn
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("to_account")}
                className={getClassNamesFor('to_account')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Tài khoản đích
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("amount")}
                className={getClassNamesFor('amount')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Số tiền
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("surplus")}
                className={getClassNamesFor('surplus')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Số dư
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("surplus")}
                className={getClassNamesFor('surplus')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Số dư
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        {
          items &&
          items.map((item, index) => (
              <tr key={index}>

                <th scope="row">{index + 1}</th>
                <td>{new Intl.DateTimeFormat('vi-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',

                }).format(new Date(item.timestamp))}</td>
                <td>{(item.type === 1 ? 'Chuyển tiền' : (item.type === 2 ? 'Nhận tiền' : "Nhắc nợ"))}</td>
                <td>{item.from_account}</td>
                <td>{item.to_account}</td>
                <td>{item.amount}</td>
                <td>{item.surplus}</td>
                <td>{item.state}</td>
              </tr>
          ))
        }
        </tbody>
      </Table>
  )
};

export default TableInfoTransfer;