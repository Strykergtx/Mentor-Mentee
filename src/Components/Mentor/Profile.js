import React, { Component } from "react";
//import SearchFieldExampleTemplate from 'terra-search-field/lib/terra-dev-site/doc/example/SearchFieldExampleTemplate';
import Profileimg from "./profileimg.png"
//for now keep a global
import Axios from 'axios';

export default class Profile extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      details:[],
      name: '',
      lname:'',
      aid: '',
      email:'',
      skills:'',
    };
  }
  componentDidMount = () => {
    Axios({
      method :'get',
      url: 'http://localhost:3002/getmentor/'+ 2 + '/' + this.props.AID,
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
      console.log(this.props.usertype)
        this.setState({
            name:response.data.fname,
            lname:response.data.lname,
            aid:response.data.AID,
            email:response.data.email,
            skills:response.data.skills,
    });
  });
}
  render() {
    console.log("idk if this will work")
    console.log(this.props.mid)
    const { name, lname, aid, email, skills} = this.state
    return (  
      <div>
        <div>
          <img src={Profileimg} alt="Logo" height='33%' width='38%' style={{float:"left"}}/>
        </div>
        <div style={{background:"#f4f4f4", width:"23%",padding:"0.38%",textAlign:"justify", position:"absolute", left:"20%", top:"10.4%", lineHeight:"300%", letterSpacing:"1px"}}>

            <span style={{fontSize:"20px", fontWeight:"bold", float:"left", paddingLeft:"2%"}}>{name} {lname}</span> <br/> <hr/>
            <strong style = {style} >Associate ID : </strong> <span style={style1}>{aid}</span> <br/>
            <strong style = {style} >Email ID : </strong> <span style={style1}>{email}</span> <br/>
            <strong style = {style} >Skills : </strong> <span style={style1}> {skills}</span>
        </div>           
      </div>

    );
  }
}

const style = {
  fontSize:"16px",
  paddingLeft:"2%"
}
const style1 = {
  fontSize:"14px"
}
