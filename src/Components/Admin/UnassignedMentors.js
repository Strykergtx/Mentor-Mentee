import React, { Component } from 'react';
import Populate from './unassigned.js';
import Axios from 'axios';
import { thisExpression } from '@babel/types';
import Table from 'terra-table/lib/Table';
export default class Mentors extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mentordetails:[],  
        };
      }
    componentDidMount(){
        Axios({
            method :'get',
            url: 'http://localhost:3002/nsumentor',
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
              //console.log(response.data);
             
              for(var i = 0; i<response.data.length; i++){
                this.setState({mentordetails:[...this.state.mentordetails,response.data[i]]  });
              
                }
              console.log(this.state.mentordetails);  
             // console.log(this.state.mentordetails[0])
             
             
          });
          
         
    }
    render() {
        return (
            <div>
            
          <Table>
                    <Table.Header style={tableHeader}>
                            <Table.HeaderCell style={tableCell} content="Associate ID" key="User_ID" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="Name" key="name" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="Skills" key="skillz" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="E-mail" key="Name" minWidth="medium" />
                            {/* <Table.HeaderCell style={tableCell} content="Name" key="Name" minWidth="medium" /> */}
                            <Table.HeaderCell style={tableCell} content="Active Mentees" key="Name" minWidth="medium" />
                    </Table.Header>
                     {this.state.mentordetails.map(detail => (
                      <Populate
                        mentoraid = {detail.AID}
                        name={detail.fname}
                        skills={detail.skills}
                        emailid = {detail.email}
                        count={detail.acm}

                      />
                    ))}
                   
                </Table> 
          
          </div>
          
        )
    }
}



const tableCell = {
    color: 'white'
}

const tableHeader = {
    background: '#05386B',
    color: 'white'
}