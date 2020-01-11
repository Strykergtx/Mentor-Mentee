import React, { Component } from "react";
import Divider from "terra-divider/lib/Divider";
import Axios from 'axios';
import Table from 'terra-table/lib/Table';

export default class Batchlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batches:[]
    };
  }
  componentDidMount = () => { 
    Axios({
      method :'get',
      url: 'http://localhost:3002/adminlanding/',
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
      for(var i = 0; i<response.data.length; i++){
      this.setState({batches:[...this.state.batches,response.data[i]]  });
      }
      console.log(response.data.length)
    });

  }
  render() {
    return (
        <div style={{width:'90%', float:'inherit'}}>
        <br /><br/>
       
        <p style  = {{textAlign:'justify'}} ><h1>TimeLine</h1></p> <br/>
      <br/>
      <br/>
      <Divider />
      <br/>
      <Table>
                    <Table.Header style={tableHeader}>
                            <Table.HeaderCell style={tableCell} content="Batch ID" key="Batch ID" minWidth="small" />
                            <Table.HeaderCell style={tableCell} content="Start Date" key="Date" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="No of Mentees" key="NUM" minWidth="small" />
                            <Table.HeaderCell style={tableCell} content="Remaining Weeks" key="Remaining Weeks" minWidth="small" />
                            <Table.HeaderCell style={tableCell} content="% Graduated" key="Graduated" minWidth="large" />
                            <Table.HeaderCell style={tableCell} content="TAT" key="TAT" minWidth="small" />
                    </Table.Header>
                       
                    
                   
              
            
    {this.state.batches.map(b => (
          
          <Table.Row style={{borderBottom:'1px solid grey'}}>
          <Table.Cell content={b.batch_id} key="Batch ID" />
          <Table.Cell content={b.start_date} key="No Mentees" />
          <Table.Cell content={b.no_mentees} key="Start" />
          <Table.Cell content={b.remainweek} key="Remaining Weeks" />
          <Table.Cell content={b.gradper} key="Graduated" />
          <Table.Cell content={b.TAT} key="TAT" />
      </Table.Row>
          
        
        ))}
          
          </Table> 
       
        </div>
      
    );
  }
}
const tableCell = {
    color: 'white'
}

const tableHeader = {
    width:'30%',
    background: '#05386B',
    color: 'white'
}