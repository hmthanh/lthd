import React from 'react';
import {Badge, Table} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort} from '@fortawesome/free-solid-svg-icons'
import useSortableData from "../../utils/useSortableData";
import {formatMoment, formatMoney} from "../../utils/utils";

const sortItem = {
  cursor: "pointer"
}


const TableUserTransfer = (props) => {
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
            <div
                style={sortItem}
                onClick={() => requestSort("trans_id")}
                className={getClassNamesFor('trans_id')}>
              #
            </div>
          </th>
          <th>
            <div
                style={sortItem}
                onClick={() => requestSort("timestamp")}
                className={getClassNamesFor('timestamp')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Ngày giao dịch
            </div>
          </th>
          <th>
            <div
                style={sortItem}
                onClick={() => requestSort("acc_name")}
                className={getClassNamesFor('acc_name')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Họ & tên
            </div>
          </th>
          <th>
            <div
                style={sortItem}
                onClick={() => requestSort("from_account")}
                className={getClassNamesFor('from_account')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}TK Nguồn
            </div>
          </th>
          <th>
            <div style={sortItem}
                 onClick={() => requestSort("to_account")}
                 className={getClassNamesFor('to_account')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}TK Đích
            </div>
          </th>
          <th>
            <div style={sortItem}
                 onClick={() => requestSort("amount")}
                 className={getClassNamesFor('amount')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Số tiền
            </div>
          </th>

          <th>
            <div style={sortItem}
                 onClick={() => requestSort("state")}
                 className={getClassNamesFor('state')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Trạng thái
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
                <td>{formatMoment(item.timestamp)}</td>
                <td>{item.acc_name}</td>
                <td>{item.from_account}</td>
                <td>{item.to_account}</td>
                <td>{formatMoney(item.amount)}</td>
                <td>{(item.state === 0 ?
                    <Badge color="success">Thành công</Badge> :
                    <Badge color="danger">Thất bại</Badge>)}
                </td>
              </tr>
          ))
        }
        </tbody>
      </Table>
  )
};

export default TableUserTransfer;