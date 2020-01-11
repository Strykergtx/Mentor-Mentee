import React, { Component } from "react";
import ActionHeader from "terra-action-header/lib/ActionHeader";
import Table from "terra-table";
import Profile from './Profile'
//import './App.css';
import Axios from 'axios';


export default class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menteecount:''
    };
  }
  componentDidMount = () => { 
    Axios({
      method :'get',
      url: 'http://localhost:3002/getallmentees/'+ 3 + '/' + this.props.AID,
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
        console.log(response.length)
        this.setState({menteecount:response.data.length})
      }
    );
  }

  render() {
    return (
      <div className="App-grid-container" style={{gridAutoFlow:"column"}}>
        <div><Profile AID={this.props.AID}/></div>
        <br />
        <div>
        <ActionHeader
          title={
            <div>
              <h3
                style={{fontSize:"20px", fontWeight:"bold", textAlign:"left", marginBlockStart:"0",padding:"0",
                marginBlockEnd:"0"}}
              >
                Summary
              </h3>
              <hr/>
              <Table isStriped={false}>
                <Table.Rows
                  style={{ border: "2px solid #f4f4f4"}}
                >
                  <Table.Row
                    key="PERSON_0"
                    style={{
                      borderBottom: "1px solid #f4f4f4"
                    }}
                  >
                    <Table.Cell
                      content={this.state.menteecount}
                      key="col1"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="24"
                      key="col2"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="8"
                      key="col3"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="163"
                      key="col4"
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "bold"
                      }}
                    />
                  </Table.Row>
                  <Table.Row key="PERSON_1" style={{ marginTop: "-1%" }}>
                    <Table.Cell
                      content="Live Mentees"
                      key="liveMentees"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingBottom: "0em"
                      }}
                    />
                    <Table.Cell
                      content="Total Mentees"
                      key="totalMentees"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Total Batches"
                      key="totalBatches"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Total Goals Created"
                      key="totalGoalsCreated"
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
        </div>
       
      </div>
    );
  }
}
