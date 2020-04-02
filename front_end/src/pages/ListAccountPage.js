import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from 'reactstrap'
import {getAllAccount} from '../redux/creators/accountCreator'

const ListAccountPage = onRejected => {
  const dispatch = useDispatch();
  const AccountInfo = useSelector((state) => {
    return [state.AccountInfo.data.item]
  });

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getAllAccount(uid, accessToken))
        .then((response) => {
          console.log(response);
        });
  }, [dispatch]);

  console.log("AccountInfo", AccountInfo);

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
                      <th>#</th>
                      <th>Loại tài khoản</th>
                      <th>Số tài khoản</th>
                      <th>Số dư hiện tại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{*/}
                    {/*  AccountInfo.item &&*/}
                    {/*  AccountInfo.item.map((item, index) =>*/}
                    {/*      (*/}
                    {/*          <tr key={index}>*/}
                    {/*            <th scope="row">{item.id}</th>*/}
                    {/*            <td>{item.type}</td>*/}
                    {/*            <td>{item.number}</td>*/}
                    {/*            <td>{item.money}</td>*/}
                    {/*          </tr>*/}
                    {/*      ))*/}
                    {/*}*/}
                    {
                      AccountInfo && AccountInfo.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{1}</th>
                            <td>{item.user_name}</td>
                            <td>{item.account_num}</td>
                            <td>{item.phone}</td>
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