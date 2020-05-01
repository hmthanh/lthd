import React from 'react';
import {Table} from 'reactstrap';
import useSortableData from "../../utils/useSortableData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import {formatFormalDate, formatMoney} from "../../utils/utils";

const TableInfoDept = (props) => {
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
          <th>#</th>
          <th>
            <div
                onClick={() => requestSort("date_time")}
                className={getClassNamesFor('date_time')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Ngày nợ
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("name")}
                className={getClassNamesFor('name')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Họ và tên
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("debt_val")}
                className={getClassNamesFor('debt_val')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Số nợ
            </div>
          </th>
          <th>
            <div
                onClick={() => requestSort("note")}
                className={getClassNamesFor('note')}
            >
              <FontAwesomeIcon icon={faSort}/>{' '}Ghi chú
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
                <td>{formatFormalDate(item.date_time)}</td>
                <td>{item.name}</td>
                <td>{formatMoney(item.debt_val)}</td>
                <td>{item.note}</td>
              </tr>
          ))
        }
        </tbody>
      </Table>
  )
};

export default TableInfoDept;