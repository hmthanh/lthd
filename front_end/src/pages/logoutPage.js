import React, { Component } from 'react'

class logoutPage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    localStorage.clear()
    // this.props.logout()
    this.props.history.push("/login")
  }

  render() {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
       
      </div>
    )
  }
}

export default logoutPage;