import React, { Component } from 'react'
import {Link, Redirect} from "react-router-dom";


export class LogoutComponent extends Component {
  constructor(props){
    super()
    localStorage.removeItem("token")
  }
  
  render() {
    return (
      <div style={{paddingTop:"16%"}}>
      <span style={{fontSize:"50px"}}> You have been logged out successfully</span><br/><br/>
      <Link style={{fontSize:"20px"}}to="/"><button style={{borderStyle:"none", padding:"10px 30px 10px 30px", color:"white", background:"#6AA63F", borderRadius:"2px"}}>Login Again</button></Link>
      <br/><br/><br/><br/>
      <p style={{fontSize:"10px", marginTop:"15%"}}> <span style={{color:"red"}}>Note :</span> Currently this web app is in Beta version. Stable version will be released soon.</p>
    </div>
    )
  }
}

export default LogoutComponent;