import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import {getHistoryUserTrans} from "../../redux/creators/historyTransCreator";
import TableInfoTransfer from "./TableInfoTransfer";

const HistoryUserTrans = () => {
  const dispatch = useDispatch();
  const historyTransfer = useSelector(state => {
    return state.HistoryInfo
  });
  const [activeTab, setActivetab] = useState(0);
  const toggleTab = tab => {
    setActivetab(tab);
  };
  const tabTitle = ["Giao dich nhận tiền", "Giao dịch chuyển khoản", "Giao dịch nhắc nợ"];
  const historyInfo = [
    [
      {
        id: 1,
        dayTransaction: '12/03/2010',
        typeTransaction: 'Giao dịch tiền mặt',
        accountNumber: 234234234,
        moneyTransaction: 212000000
      },
      {
        id: 2,
        dayTransaction: '12/03/2010',
        typeTransaction: 'Giao dịch thẻ',
        accountNumber: 3429587485,
        moneyTransaction: 999000000
      }
    ],
    [
      {
        id: 1,
        dayTransaction: '12/03/2010',
        typeTransaction: 'Giao dịch thẻ',
        accountNumber: 3429587485,
        moneyTransaction: 999000000
      },
      {
        id: 2,
        dayTransaction: '12/03/2010',
        typeTransaction: 'Giao dịch thẻ',
        accountNumber: 234234123,
        moneyTransaction: 1000000
      }],
    [
      {
        id: 1,
        dayTransaction: '12/03/2010',
        typeTransaction: 'Giao dịch thẻ',
        accountNumber: 45555,
        moneyTransaction: 3333
      },
      {
        id: 2,
        dayTransaction: '12/03/2010',
        typeTransaction: 'Giao dịch thẻ',
        accountNumber: 3429587485,
        moneyTransaction: 999000000
      },
    ]
  ];
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('accessToken');
    dispatch(getHistoryUserTrans(uid, accessToken))
        .then((response) => {
          console.log(response.item);
        });
  }, [dispatch]);

  return (
      <div className="container" style={{marginTop: '20px'}}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card-group mb-0">
              <div className="card p-6">
                <div className="card-block" style={{padding: "20px 40px"}}>
                  <h1 className="col-centered table-heading">Lịch sử giao dịch</h1>
                  <Nav tabs>
                    {
                      tabTitle.map((title, index) => {
                        return (
                            <NavItem key={index}>
                              <NavLink
                                  className={(activeTab === index ? "active" : "")}
                                  onClick={() => {
                                    toggleTab((index).toString())
                                  }}
                              >
                                {title}
                              </NavLink>
                            </NavItem>)
                      })
                    }
                  </Nav>
                  {/*<TabContent activeTab={activeTab}>*/}
                  {/*  {*/}
                  {/*    historyInfo.map((data, index) => {*/}
                  {/*      return (*/}
                  {/*          <TabPane tabId={index.toString()}>*/}
                  {/*            <Row>*/}
                  {/*              <Col sm="12">*/}
                  {/*                <TableInfoTransfer data={data} ></TableInfoTransfer>*/}
                  {/*              </Col>*/}
                  {/*            </Row>*/}
                  {/*          </TabPane>*/}

                  {/*      )*/}
                  {/*    })*/}
                  {/*  }*/}
                  {/*</TabContent>*/}

                  <TabContent activeTab={'1'}>
                    <TabPane tabId={'1'}>
                      <TableInfoTransfer data={historyTransfer.data}></TableInfoTransfer>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default HistoryUserTrans;