import React, { Component } from 'react'
// import { Router, Route, Redirect} from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import Maintabs from './Maintabs';
import MenteeDetails from './MenteeDetails';

export class StartingMentor extends Component {
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
      <div className="App">
      <Router>
        <Route exact path = "/mentor" render  = {props =>( //put more than one component!!!
            <React.Fragment>
              {<Maintabs/>} 
            </React.Fragment>
          )}/>
          <Route path="/MenteeDetails/:menteeaid" exact component={MenteeDetails}/>
      </Router>
    </div>
    )
  }
}

export default StartingMentor;

