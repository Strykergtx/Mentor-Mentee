import React, { Component } from "react";
import Table from 'terra-table';
import Axios from 'axios'
import moment from 'moment'
import MappleToolTip from 'reactjs-mappletooltip';
export default class Givecontent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        scorecard:[],
        };
    
      }
componentDidMount(){
    this.setState({scorecard:[]})
    Axios({
        method :'get',
        url: 'http://localhost:3002/getmentee/'+ this.props.aid,
        config: {headers : {'Content-Type' : 'application/json'}}
      }).then( response => {
        console.log(response);
       var i=0
         response.data.scorecard.forEach(ele => { 
          ele.weekno=++i;
         });
        //console.log(response.data.scorecard)
        this.setState({scorecard:response.data.scorecard});
        
        }
      );
}

render(){
    
    return(
        <div style={{overflowY:"overlay"}}>
            <hr/>
            <h3 style={{float:"left", fontSize:"20px"}}>Scores from last week </h3>
            <Table isStriped={false}>
                <Table.Header>
                    <Table.HeaderCell content="Week" key="Date" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Date" key="Date" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Exhibites Professionalism " key="EP" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Communicates Effectively" key="CE" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Learning Agility" key="LA" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Makes and Keeps Commitments" key="MK" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Quality Work Products" key="WQ" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Technical Competency" key="TC" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Feedback" key="Feedback" minWidth="small" style={style}/>
                    <Table.HeaderCell content="Approval Status" key="approval" minWidth="small" style={style}/>
                </Table.Header>
                <Table.Rows>
 {this.state.scorecard.map((element) => (
         <Table.Row key="PERSON_0">
            <Table.Cell content={element.weekno} key="weekno" style={style1} />
            <Table.Cell content={moment(element.week).format('MMMM D YYYY, h:mm:ss a')} key="Date" style={style1}/>
            
            <Table.Cell  content={
          <MappleToolTip showMappleIf={element.EP==="-"?true:false} mappleType={'warning'}>
          {element.EP}
          <div>
          {element.nfEP}
          </div>
        </MappleToolTip>
          } key="EP" style={{ border: '1px solid black',width:"9%",background:element.EP=="-"?"#F0414F":"white"}}/>

            <Table.Cell   content={
          <MappleToolTip showMappleIf={element.CE==="-"?true:false} mappleType={'warning'}>
          {element.CE}
          <div>
          {element.nfCE}
          </div>
        </MappleToolTip>
          }key="CE" style={{ border: '1px solid black',width:"9%",background:element.CE=="-"?"#F0414F":"white"}}/>

            <Table.Cell  content={
          <MappleToolTip showMappleIf={element.LA==="-"?true:false} mappleType={'warning'}>
          {element.LA}
          <div>
          {element.nfLA}
          </div>
        </MappleToolTip>
          } key="LA" style={{ border: '1px solid black',width:"9%",background:element.LA=="-"?"#F0414F":"white"}}/>

            <Table.Cell  content={
          <MappleToolTip showMappleIf={element.MK==="-"?true:false} mappleType={'warning'}>
          {element.MK}
          <div>
          {element.nfMK}
          </div>
        </MappleToolTip>
          }key="MK" style={{ border: '1px solid black',width:"9%",background:element.MK=="-"?"#F0414F":"white"}}/>

            <Table.Cell  content={
          <MappleToolTip showMappleIf={element.WQ==="-"?true:false} mappleType={'warning'}>
          {element.WQ}
          <div>
          {element.nfWQ}
          </div>
        </MappleToolTip>
          } key="WQ" style={{ border: '1px solid black',width:"9%",background:element.WQ=="-"?"#F0414F":"white"}}/>

            <Table.Cell   content={
          <MappleToolTip showMappleIf={element.TC==="-"?true:false} mappleType={'warning'}>
          {element.TC}
          <div>
          {element.nfTC}
          </div>
        </MappleToolTip>
          }key="TC" style={{ border: '1px solid black',width:"9%",background:element.TC=="-"?"#F0414F":"white"}}/>
            <Table.Cell content={element.feedback} key="Feedback" style={style1}/>
            <Table.Cell content={element.approved=="true"?"Approved":"Approval Pending"} key="Approval" style={style1}/>
        </Table.Row>    
    ))}
    </Table.Rows>


                  
            </Table>

        </div>
    );
}
}

const style = {
    fontSize:"13px",
    textAlign:"center",
    border: '1px solid black',width:"9%"
}

  
  const style1={
    textAlign:"center",
    border: '1px solid black',width:"9%",
  
  }
  
