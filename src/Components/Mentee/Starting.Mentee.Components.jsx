import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Maintabs from './Maintabs';

export default class StartingMenteeComponents extends Component {
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
        <Route exact path = "/mentee" render  = {props =>( //put more than one component!!!
            <React.Fragment>
              {<Maintabs/>} 
            </React.Fragment>
          )}/>
      </Router>
      </div>
    )
  }
}
