import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getHistoryUserDept, getHistoryUserTrans} from "../../redux/creators/historyTransCreator";
import TableInfoTransfer from "./TableInfoTransfer";
import TableInfoDept from "./TableInfoDept";

const HistoryUserTrans = () => {
  const dispatch = useDispatch();
  const historyDebt = useSelector(state => {
    return state.HistoryDept.data
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getHistoryUserTrans(uid, accessToken))
        .then((response) => {
          console.log(response.item);
        });
    dispatch(getHistoryUserDept({id: uid}, accessToken))
        .then((response) => {
          // console.log(response.item);
        });
  }, [dispatch]);

  console.log("historyDebt", historyDebt);

  return (
      <div className="container" style={{marginTop: '20px'}}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card-group mb-0">
              <div className="card p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h1 className="col-centered table-heading">Lịch sử giao dịch</h1>
                  <h4>Giao dịch nhận tiền</h4>
                  <TableInfoTransfer></TableInfoTransfer>

                  <h4>Giao dịch nhắc nợ</h4>
                  <TableInfoDept data={historyDebt}></TableInfoDept>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default HistoryUserTrans;