import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import Login from './Components/Auth/Login.Auth.Components'
import Admin from './Components/Admin/Starting.Admin.Components'
import Mentee from './Components/Mentee/Starting.Mentee.Components'
import Mentor from "./Components/Mentor/Starting.Mentor"
import Logout from "./Components/Logout/Logout.Component"
import Arch from "./Components/Admin/Archived";
function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/mentee" component={Mentee}/>
        <Route exact path="/mentor" component={Mentor}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/logout" component={Logout}/>
      </Switch> */}
      <Arch/>
    </div>
  );
}
export default App;
