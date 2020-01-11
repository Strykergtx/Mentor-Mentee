import React, { Component } from "react";
import Profileimg from "./profileimg.png"
import Card from 'terra-card';
import Axios from 'axios';
import { createGenerateClassName } from "jss";
var aid='RR073390'

export default class Profile extends Component {
  
  

  constructor(props) {
    super(props);
    //isLoaded:false;
   // jiraData:[]
  
    this.state = {
     //userdata : [],
     name: '',
     lname:'',
     aid: '',
     mail:'',
     workexp:'',
     contact:'',
     technology:'',
     college:'',
     batch:'',
     mentor_name:'',
     mentor_lname:'',
     m_aid:'',
     m_eid:'',
     jira_summ:'',
     jira_details:'',
     jira_summary:'',
     jira_subtask:'',
     jira_status:'',
    };
  }
  componentDidMount = () => {
     Axios({   

      method :'get',
      url: 'http://localhost:3002/getprofile/'+aid,
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
      console.log("this is profile page");
      console.log(response); 
      this.setState({
        name:response.data.fname,
        lname:response.data.lname,
        aid:response.data.AID,
        mail:response.data.email,
        contact:"9902768683",
        technology:response.data.skills,
        college:"Harvard",
        batch:response.data.batch,
        mentor_name:"Vijay",
        mentor_lname:"Kumar",
        m_aid:response.data.MID,
        
        m_eid:'Vijay.Kumar@cerner.com',


});
//console.log(this.statname);
    })
Axios({
  method :'get',
  url: 'http://localhost:3002/jirasummary',
  config: {headers : {'Content-Type' : 'application/json'}}
  }).then( response => {
  
 // console.log(response);
 this.setState({
   jira_summary:response.data,
  })
  
  // console.log(this.state.selectedb)
  });

  Axios({
    method :'get',
    url: 'http://localhost:3002/jirasubtasks',
    config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
    console.log("this should work")
    console.log(response.data.fields.subtasks[0].fields.status.name);
   this.setState({
     jira_status:response.data.fields.subtasks[0].fields.status.name,
     jira_subtask:response.data.fields.subtasks[0].key,
    })
    
    // console.log(this.state.selectedb)
    });

    // Axios({
    //   method :'get',
    //   url: 'http://localhost:3002/jtask',
    //   config: {headers : {'Content-Type' : 'application/json'}}
    //   }).then( response => {
    //   console.log(response);
    //  this.setState({
    //    jira_status:response.data,
    //   })
      
    //   // console.log(this.state.selectedb)
    //   });
  

    
    

/*Axios({

  method:'get',
  url :'https://jira2.cerner.com/rest/api/2/issue/DEVACDMY-23507.json',
  config: {headers : {"Content-Type" :"application/json"}}
}).then(response => {
      //console.log(response);
      console.log('jirafetch check')
          
      }).catch(err => {
        console.log("Axios error ");
          console.log(err);
        });
*/
/*Axios({

  method:'get',
  url:'https://jira.atlassian.com/rest/api/2/issue/JRA-9',
  config: {headers : {'Content-Type' : 'application/json'}}
}).then(issue => {
      console.log(issue);
          this.setState({
          jira_test:issue.fields.summary,
        });
      })

      Axios({
        method: "post",
        url: "https://test-jira.instance.foo/rest/api/2/search",
        auth: { ... },
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          jql:
            '(component in ("REDACTED") AND Sprint in openSprints() AND Sprint not in futureSprints())',
          maxResults: 10,
          fields: [ ... ]
        }
      })
        .then(response => {
          console.log("axios REDACTED total " + response.data.total);
        })
        .catch(err => {
          console.log("Axios error on REDACTED");
          console.log(err.response.data);
        }); 
       */ 
/*
      Axios({
        method: "post",
        url: "https://jira2.cerner.com/rest/api/2/DEVACDMY-23507",
          headers: {
          "Content-Type": "application/json"
        },
        data: {
          jql:
            '(component in ("REDACTED") AND Sprint in openSprints() AND Sprint not in futureSprints())',
          maxResults: 10,
         
        }
      })
        .then(response => {
          console.log("axios REDACTED total " + response.data.total);
        })
        .catch(err => {
          console.log("Axios error on REDACTED");
          console.log(err.response.data);
        }); 
        */
      
  }
  //fiels.subtasks[0].fields.summary 

  //fields.summary



  //style={{padding: '1px' , marginTop: '0%', border: 'light', background:'#84cc2a'}}
  render() {
    //console.log("user",this.userdata);
    const {name, lname, aid, mail, workexp, contact, technology, college, batch, mentor_name, mentor_lname, m_aid, m_eid,var1,jira_status,jira_summary,jira_subtask} = this.state
    return (
      <div  >
     {/* ------------------------------------------------------------------------------------------------ */}
              
              <Card variant="raised" style = {{backgroundColor:'#DCDCDC',margin:"2%", marginLeft:"3%", width:"30%" , height:"80%"}}>
              <img style={{float:"center"}} src={Profileimg} alt="Logo" height='25%' width = '25%'/><br/><br/>
                <Card.Body style={{textAlign:"left", lineHeight:"220%", marginLeft:"5%", marginTop:"1%"}}>
                     
                        <span style={{fontSize:"25px", fontWeight:"bold"}}>{name} {lname}</span>
                        <br/>
                        <hr/>
                        <strong style = {style} >Associate ID : </strong> <span style={style1}>{aid}</span> 
                        <br/>
                        <strong style = {style} >Mail ID : </strong> <span style={style1}> {mail}</span>
                        <br/> 
                        <strong style = {style} >Batch : </strong> <span style={style1} >{batch}</span>
                        <br/>
                        <strong style = {style} >Contact : </strong> <span style={style1} >{contact}</span>
                        <br/>
                        <strong style = {style} >Technology : </strong> <span style={style1} >{technology}</span>
                        <br/>
                        <strong style = {style} >College : </strong> <span style={style1} >{college}</span>
                        <br/>
                        <strong style = {style} >Work Experience : </strong> <span style={style1} >{workexp} Years </span>
                      
                </Card.Body>
                </Card>
        
                <Card variant="raised" style = {{backgroundColor:'#DCDCDC',margin:"10%", marginTop:"-28.5%",marginLeft:"50%", width:"40%"}}>
                <Card.Body >
                      
                        <span style={{fontSize:"20px", fontWeight:"bold",textAlign:"top", margincenter:"27%", marginTop:"1%"}}>Mentor Details </span>
                        <br/>
                        <hr/>
                        <strong style = {{float:'left', marginLeft:'10%'}} >Name : </strong> <span style={{float:'left', marginLeft:'12%'}}>{mentor_name} {mentor_lname}</span>
                        <br/>
                        <strong style = {{float:'left', marginLeft:'10%'}} >Associate ID : </strong> <span style={{float:'left', marginLeft:'4.5%'}}>{m_aid}</span> 
                        <br/>
                        <strong style = {{float:'left', marginLeft:'10%'}} >Email ID : </strong> <span style={{float:'left', marginLeft:'9%'}}>{m_eid}</span> <br/>
                </Card.Body>
                </Card>
                <Card variant="raised" style = {{backgroundColor:'#DCDCDC',margin:"10%", marginTop:"-2%",marginLeft:"50%", width:"40%"}}>
                <Card.Body >
                      
                        <span style={{fontSize:"20px", fontWeight:"bold"}}>Project Details </span>
                        <br/>
                        <hr/>
                        <strong style =  {{float:'left', marginLeft:'10%'}} >JIRA Number : </strong> <span style={{float:'left', marginLeft:'9%'}}>DEVACDMY-23507</span>
                        <br/>
                        <strong style = {{float:'left', marginLeft:'10%'}} >JIRA Summary : </strong> <span style={{float:'left', marginLeft:'7.2%'}}>{jira_summary} </span> 
                        <br/>
                        <strong style = {{float:'left', marginLeft:'10%'}} >JIRA Subtask : </strong> <span style={{float:'left', marginLeft:'9.3%'}}>{jira_subtask} </span> 
                        <br/>
                        <strong style = {{float:'left', marginLeft:'10%'}} >JIRA SubtaskStatus : </strong> <span style={{float:'left', marginLeft:'2%'}}>{this.state.jira_status} </span> 
                        <br/>
                        
                </Card.Body>
                </Card>
                
          
           
        </div>

    );
  }
}

const style = {
  fontSize:"16px",
  textAlign:"justify"
}
const style1 = {
  fontSize:"14px"
}
