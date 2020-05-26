import React, {useEffect} from 'react'
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {AuthFailed} from "../redux/actions/auth.action";

const LogoutPage = () => {
  const dispatch = useDispatch()
  localStorage.clear()
  const history = useHistory()
  useEffect(() => {
    history.push("/login")
    dispatch(AuthFailed());
  }, [dispatch, history])


  return (
      <div className="container" style={{marginTop: '20px'}}>
      </div>
  )
}

export default LogoutPage;