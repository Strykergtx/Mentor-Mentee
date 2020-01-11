import React, { Component } from "react";
import ActionHeader from "terra-action-header/lib/ActionHeader";
import Table from "terra-table";
import Divider from "terra-divider";
import { LineChart, PieChart } from 'react-chartkick';
import 'chart.js'
import Axios from 'axios';
import TableHeader from './Tableheader.js'
const aid="RR073390"

export default class Performances extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details:[],
      current:[],
      exprof:'',
      comms:'',
      l_a:'',
      mkc:'',
      qwp:'',
      //pie chart
      truep:'',
      falsep:'',
      progressp:'',
      total:'' 
    };
  }
  componentDidMount=()=> { 
    Axios({
      method :'get',
      url: 'http://localhost:3002/getscorecard/' +aid,
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
        console.log(response);
       
        for(var i = 0; i<response.data.length; i++){
          this.setState({details:[...this.state.details,response.data[i]]  });
        
          }
       console.log(this.state.details);    
        
    });
    Axios({
      method :'get',
      url: 'http://localhost:3002/getcurrentweek/'+aid,
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response=> {
      console.log(response.data)
    if(response.data=="nse") 
      {
        this.setState({
                                     
          exprof:"NA",
          comms:"NA",
          l_a:"NA",
          mkc:"NA",
          qwp:"NA",
          tc:"NA",
         });


     }
     else{
      this.setState({
                                     
       exprof:response.data.EP,
       comms:response.data.CE,
       l_a:response.data.LA,
       mkc:response.data.MK,
       qwp:response.data.WQ,
       tc:response.data.TC,
      });
    }
    
    });
    // Axios({
    //   method :'get',
    //   url: 'http://localhost:3002/getgoalstatus',
    //   config: {headers : {'Content-Type' : 'application/json'}}
    // }).then( response => {
       
    //    console.log("hi");
    //   // console.log(response.data.len);
    //   // console.log(response.data.tc);
    //   // console.log(response.data.fc);
    //   // console.log(response.data.ip);
    //    // console.log(ct) ; 
      
    //    this.setState({
    //     truep:((response.data.tc/response.data.len)*100),
    //     falsep:((response.data.fc/response.data.len)*100),
    //     progressp:((response.data.ip/response.data.len)*100),
    //     total:response.data.len
    //    });
    // });

  }

  render() {
 return(
      <div>
        <ActionHeader
          title={
            <div>
              <h1
                style={{
                  textAlign: "left",
                  fontSize: "25px",
                  marginTop: "5px",
                  marginBottom: "1%",
                  paddingLeft:"5px"
                }}
              >
                Last Week Score
              </h1>
 
              <Table isStriped={false} style={{ marginBottom: "-1%" }}>
                <Table.Rows
                  style={{ border: "2px solid #f4f4f4", marginBottom: "-1%" }}
                >
                  <Table.Row key="PERSON_1" style={{ marginTop: "-1%" }}>
                    <Table.Cell
                      content="Professionalism"
                      key="liveMentees"
                      
                      style={{
                        textAlign: "center",
                       
                        width:"15%",    
                        fontWeight: "bold",
                        paddingBottom: "0em"
                      }}
                    />
                    <Table.Cell
                      content="Communication"
                      key="totalMentees"
                      style={{
                        textAlign: "center",   
                        width:"15%", 
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Learing Agility"
                      key="totalBatches"
                      style={{
                        textAlign: "center", 
                        width:"15%", 
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Makes and Keeps Commitments"
                      key="totalGoalsCreated"
                      style={{
                        textAlign: "center", 
                        width:"15%", 
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Quality Work Products"
                      key="totalBATCHES"
                      style={{
                        textAlign: "center",
                        width:"15%",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Technical Competency"
                      key="totalBATCHES"
                      style={{
                        textAlign: "center",
                        width:"15%",
                        fontWeight: "bold"
                      }}
                    />
                  </Table.Row>
                  <Table.Row
                    key="PERSON_0"
                    style={{
                      borderBottom: "1px solid #f4f4f4"
                    }}
                  >
                    <Table.Cell
                      
                      content={this.state.exprof}
                      key="col1"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.state.comms}
                      key="col2"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.state.l_a}
                      key="col3"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.state.mkc}
                      key="col4"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.state.qwp}
                      key="col5"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                     <Table.Cell
                      content={this.state.tc}
                      key="col5"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                  </Table.Row>
                </Table.Rows>
              </Table>
            </div>
          }
        />
        <br/>
        <h2>Total Number of Goals Assigned : {this.state.total}</h2>
        <PieChart data={[["Goals Completed", this.state.truep], ["Goals pending",this.state.falsep],["Goals in progress",this.state.progressp]]} colors={["#4ACE48","#EC0D1E","#E2EC0D"]}/>

    <br/>
        <Divider/>
        <TableHeader details={this.state.details}/>
        
      </div>
     
    );
  }
}
 
 