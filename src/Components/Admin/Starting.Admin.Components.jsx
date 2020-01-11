import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Landing from './Adminlanding';

export default class StartingAdminComponents extends Component {
  constructor(props){
    super(props)
    const token = localStorage.getItem("token")

    let loggedIn = true
    if(token == null){
      loggedIn = false
    }

    this.state ={
      loggedIn
    }
  }
  render() {
    if(this.state.loggedIn === false){
      return <Redirect to="/"/>
    }
    return (
      <div>
         <Router>
        <Route exact path = "/admin" render  = {props =>( //put more than one component!!!
            <React.Fragment>
              {<Landing/>} 
            </React.Fragment>
          )}/>
      </Router>
      </div>
    )
  }
}

