import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from 'reactstrap'
import {getAllAccount} from '../../redux/creators/accountCreator'
import {formatMoney} from "../../utils/utils";

const ListAccountPage = () => {
  const dispatch = useDispatch();
  const listAllAccount = useSelector((state) => {
    return state.AccountInfo.data
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getAllAccount(uid, accessToken))
        .then((response) => {
          console.log(response);
        });
  }, [dispatch]);

  return (
      <div className="container" style={{marginTop: '20px'}}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card-group mb-0">
              <div className="card p-6">
                <div className="card-block">
                  <h1 className="col-centered table-heading">Danh sách tài khoản</h1>
                  <Table>
                    <thead>
                    <tr>
                      <th>Mã tài khoản</th>
                      <th>Loại tài khoản</th>
                      <th>Số tài khoản</th>
                      <th>Số dư hiện tại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      listAllAccount.account && listAllAccount.account.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item.id}</th>
                            <td>{(item.type === 1 ? "Thanh toán" : "Tiết kiệm")}</td>
                            <td>{item.account_num}</td>
                            <td>{formatMoney(item.surplus, 0)} VNĐ</td>
                          </tr>
                        )
                      )
                    }
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ListAccountPage;