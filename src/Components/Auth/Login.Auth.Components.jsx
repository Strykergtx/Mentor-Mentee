import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import "C:/Users/SR073167/Downloads/NedDevx/src/App.css"

export class LoginAuthComponents extends Component {
  constructor(props){
    super()
    const token = localStorage.getItem("token")

    let loggedIn = true
    if(token == null){
      loggedIn = false
    }

    this.state = {
      username:'',
      password:'',
      loggedIn,
      type: 'null'
    }

    this.onChange = this.onChange.bind(this)
    this.SubmitForm = this.SubmitForm.bind(this)
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  SubmitForm(e){
    e.preventDefault()
    const {username, password, type} = this.state;
    console.log(username)
    console.log(password)
    console.log(type)
    //login code
    if(username === "Admin" && password==="124")
    {localStorage.setItem("token", "123")
      this.setState({
        loggedIn:true,
        type:"admin"
      })
    }
    if(username === "Mentee" && password==="124")
   { localStorage.setItem("token", "456")
      this.setState({
        loggedIn:true,
        type:"mentee"
      })
    }
    if(username ==="Mentor" && password==="124")
   { localStorage.setItem("token", "789")
      this.setState({
        loggedIn:true,
        type:"mentor"
      })
    }
  }
  render() {
    if(this.state.loggedIn && this.state.type === "admin"){
      return <Redirect to="/admin"/>
    } else if(this.state.loggedIn && this.state.type === "mentor"){
      return <Redirect to="/mentor"/>
    } else if(this.state.loggedIn && this.state.type === "mentee"){
        return <Redirect to="/mentee"/>
    }
    return (
      <div className="App-Login">
         <h2>Associate Login</h2>
         <hr style={{width:"190px"}}/>
         <br/>
        <form onSubmit={this.SubmitForm}>
          <input type="text" placeholder="Associate ID" name="username" value={this.state.username} onChange={this.onChange} style={style}/> <br/><br/>
          <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} style={style}/> <br/><br/>
          <button style={style1}>Login</button>
        </form>
        <p style={{fontSize:"10px", marginTop:"15%"}}> <span style={{color:"red"}}>Note :</span> Currently this web app is in Beta version. Stable version will be released soon.</p>
      </div>
    )
  }
}

const style = {
 padding:"5px 20px 5px 20px",
 border:"1px solid #5151E0",
 borderRadius:"2px"
}

const style1 = {
  marginLeft:"149px",
  padding:"3px 10px 3px 10px",
  border:".5px solid green",
  background:"#6AA63F",
  borderRadius:"2px",
  color:"white"

}

export default LoginAuthComponents;
