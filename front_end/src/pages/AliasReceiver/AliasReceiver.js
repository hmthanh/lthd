import React, {useEffect} from 'react'
import {Button, Card, Collapse, Container, Table} from 'reactstrap'
import {useDispatch, useSelector} from 'react-redux'
import {FetchAlias} from '../../redux/actions/aliasReceiver.action'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import useToggle from "../../utils/useToggle";
import CreateAliasReceiver from "./CreateAliasReceiver.js";
import DeleteAliasReceiver from "./DeleteAliasReceiver";
import EditAliasReceiver from "./EditAliasReceiver";

const AliasReceiver = () => {
  const dispatch = useDispatch();
  const fetchAliasReceiver = useSelector(state => state.AliasReceiver.fetch);
  const createToggle = useToggle(false);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    console.log(accessToken);
    dispatch(FetchAlias(uid, accessToken))
        .then((response) => {
          console.log(response)
        });
  }, [dispatch])

  const showCreate = () => {
    createToggle.setInActive();
  }

  const handleCreateReceiver = (e) => {
    createToggle.setActive();
  }

  return (
      <Container className="container" style={{marginTop: '20px'}}>
        <CreateAliasReceiver isOpen={createToggle.active} showCreate={showCreate}/>
        <Collapse isOpen={!createToggle.active}>
          <Card className="p-6">
            <div className="card-block" style={{padding: "20px 40px"}}>
              <h3 className="col-centered table-heading">DANH SÁCH NGƯỜI NHẬN</h3>
              <Button color="success" onClick={handleCreateReceiver}>
                <FontAwesomeIcon style={{marginLeft: "40px"}} icon={faUser}></FontAwesomeIcon>
                <span style={{marginLeft: "5px", paddingRight: "40px"}}>Tạo người nhận</span>
              </Button>
              <hr/>
              <Table striped>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Số Tài Khoản</th>
                  <th>Tên Gợi Nhớ</th>
                  <th width="200"></th>
                  <th width="200"></th>
                </tr>
                </thead>
                <tbody>
                {
                  fetchAliasReceiver.item &&
                  fetchAliasReceiver.item.map((item, index) => {
                    return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.account_num}</td>
                          <td>{item.alias_name}</td>
                          <td>
                            <EditAliasReceiver accountId={item.id} accountNum={item.account_num} aliasName={item.alias_name}/>
                          </td>
                          <td>
                            {/*<ButtonToolbar>*/}
                            {/*  <ButtonGroup>*/}
                            {/*    <ConfirmDelete buttonLabel={'Xóa'} accountId={item.id}*/}
                            {/*                   handleDelete={handleDelete}/>*/}
                            {/*  </ButtonGroup>*/}
                            {/*</ButtonToolbar>*/}
                            <DeleteAliasReceiver accountId={item.id}/>
                          </td>
                        </tr>
                    )
                  })
                }
                </tbody>
              </Table>
            </div>
          </Card>
        </Collapse>
      </Container>
  )
}

export default AliasReceiver;