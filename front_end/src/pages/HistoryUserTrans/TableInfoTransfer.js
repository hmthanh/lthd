import React, {useEffect, useState} from 'react';
import {Button, Table} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort} from '@fortawesome/free-solid-svg-icons'
import useSort from "../../utils/useSort";
import {useDispatch} from "react-redux";
import {getHistoryUserTrans} from "../../redux/creators/historyTransCreator";

const TableInfoTransfer = ({data}) => {
  const dispatch = useDispatch();
  const [table, setTable] = useState([]);
  const [sortByDay, setSortByDay] = useState(1);
  // const sortByDay = useSort(0);
  const sortByMoney = useSort(0);
  const [sortBy, setSortBy] = useState("");
  const [sortValue, setSortValue] = useState(0);
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getHistoryUserTrans(uid, accessToken))
        .then((response) => {
          console.log("setTable", response.item);
          setTable(response.item);
        });
  }, [dispatch]);

  useEffect(() => {
    console.log("effect tosdfslkfj");
    // if (sortByDay.increase === 1){
    //   console.log("equal 1");
    //   let sortTable = table.sort((a, b) => (a.timestamp - b.timestamp));
    //   setTable(sortTable);
    // }else{
    //   console.log("else");
    //   let sortTable = table.sort((a, b) => (b.timestamp - a.timestamp));
    //   setTable(sortTable);
    // }
    //
    // console.log(table);
  }, [table, setTable, sortByDay]);

  function changeSort(e){
    if (sortByDay.increase === 1){
      let sortTable = table.sort((a, b) => (b.timestamp - a.timestamp));
      setTable(sortTable);
      sortByDay.setStateIncrease(-1);
    }else{
      let sortTable = table.sort((a, b) => (a.timestamp - b.timestamp));
      setTable(sortTable);
      sortByDay.setStateIncrease(1);
    }
  }

  // const changeByDay = useCallback((e) => {
  //   console.log("before", table);
  //   let sortTable = table.sort((a, b) => (a.timestamp - b.timestamp));
  //   console.log("sortTable", sortTable);
  //
  //
  //   console.log("after", table);
  //
  //   // let sortedTable = table.sort((a, b) => (a.timestamp - b.timestamp));
  //   // console.log("after", sortedTable);
  //   // setTable(sortedTable);
  // }, [table]);

  // useEffect(() => {
  //   console.log("effect");
  //   if (table.length === 0) {
  //     console.log("sortByDay.increase", sortByDay.increase);
  //     if (sortByDay.increase === 1) {
  //       let sortedTable = table.sort((a, b) => (a.timestamp - b.timestamp));
  //       console.log("sortedTable ", sortedTable);
  //       setTable(sortedTable);
  //     } else if (sortByDay.increase === -1) {
  //       let sortedTable = table.sort((a, b) => (b.timestamp - a.timestamp));
  //       console.log("sortedTable ", sortedTable);
  //       setTable(sortedTable);
  //     }
  //   }
  //   // console.log("dataTable", dataTable);
  //   // if (sortByDay.increase === 1){
  //   //   console.log("before", dataTable);
  //   //   dataTable.sort((a, b) => (a.timestamp - b.timestamp))
  //   //   setTable(dataTable);
  //   //   console.log("after", dataTable);
  //   // }else if (sortByDay.increase === -1) {
  //   //   dataTable.sort((a, b) => (a.timestamp - b.timestamp))
  //   //   setTable(dataTable);
  //   // }
  //   // console.log("sortByDay.increase", sortByDay.increase);
  //   // if (sortByDay.increase === 1){
  //   //   dataTable.sort((a, b) => (a.timestamp - b.timestamp))
  //   // }else if (sortByDay.increase === -1){
  //   //   dataTable.sort((a, b) => (b.timestamp - a.timestamp))
  //   // }
  //
  //
  //   // if (sortByMoney.increase === 1){
  //   //   dataTable.sort((a, b) => (a.amount - b.amount))
  //   // }else if (sortByMoney.increase === -1){
  //   //   dataTable.sort((a, b) => (b.amount - a.amount))
  //   // }
  //
  //   // }, [table, data, setTable, sortByDay, sortByDay.increase, sortByDay.toggle, sortByMoney])
  // }, [table, data, setTable])


  // useEffect(() => {
  //   console.log("useEffect");
  //   if (sortByDay.increase === 1) {
  //     let newTable = table.sort((a, b) => (a.timestamp - b.timestamp))
  //     console.log("newTable", newTable);
  //     setTable(newTable);
  //   } else if (sortByDay.increase === -1) {
  //     let newTable = table.sort((a, b) => (b.timestamp - a.timestamp))
  //     console.log("newTable", newTable);
  //     setTable(newTable);
  //   }
  //
  // }, [sortByDay, sortByDay.toggle, sortByDay.increase])


  return (
      <Table>
        <thead>
        <tr>
          <th>#</th>
          <th>#</th>
          <th>
            <Button
                onClick={changeSort}>
              <FontAwesomeIcon icon={faSort}/>{' '}Ngày giao dịch
            </Button>
          </th>
          <th>Loại giao dịch</th>
          <th>Tài khoản giao dịch</th>
          <th>Tài khoản thụ hưởng</th>
          <th>
            <Button
                onClick={sortByMoney.toggle}>
              <FontAwesomeIcon icon={faSort}/>{' '}Số tiền
            </Button>
          </th>
          <th>Số dư</th>
        </tr>
        </thead>
        <tbody>
        {
          table &&
          table.map((item, index) => (
              <tr key={index}>

                <th scope="row">{item.trans_id}</th>
                <th scope="row">{index + 1}</th>
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