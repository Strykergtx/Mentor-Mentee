import React, { Component } from 'react'
import Table from 'terra-table/lib/Table';
import "../../App.css";
import MappleToolTip from 'reactjs-mappletooltip';


export default class TableContent extends Component {
  
  // onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} 


 render() {
      var weekno=1
        return (this.props.table.slice(0,6).map((score) => (

          
  <React.Fragment>   
      <Table.Row key="score.id" className="App-table-content">
        <Table.Cell style = {{border: '1px solid black',width:"9%"}} className="App-table-content-cell" content={weekno++} key="week"/>
        <Table.Cell style = {{border: '1px solid black',width:"9%"}} className="App-table-content-cell" content={
             <MappleToolTip showMappleIf={score.EP==="-"?true:false}float={true} mappleType={'warning'}>
             {score.EP}
             <div>
               {score.nfEP}
             </div>
           </MappleToolTip>
          } key="Pro" />
        <Table.Cell style = {{border: '1px solid black',width:"9%"}} className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.CE==="-"?true:false}float={true} mappleType={'warning'}>
          {score.CE}
          <div>
            {score.nfCE}
          </div>
        </MappleToolTip>
          } key="Comms" />
        <Table.Cell style = {{border: '1px solid black',width:"9%"}} className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.LA==="-"?true:false}float={true} mappleType={'warning'}>
          {score.LA}
          <div>
          {score.nfLA}
          </div>
        </MappleToolTip>
          } key="L_A" />
        <Table.Cell  style = {{border: '1px solid black',width:"9%"}} className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.MK==="-"?true:false}float={true} mappleType={'warning'}>
             {score.MK}
             <div>
             {score.nfMK}
             </div>
           </MappleToolTip>
        } key="commit" />
        <Table.Cell style = {{border: '1px solid black',width:"9%"}} className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.WQ==="-"?true:false}float={true} mappleType={'warning'}>
          {score.WQ}
          <div>
          {score.nfWQ}
          </div>
        </MappleToolTip>
        } key="Qual" />
        <Table.Cell style = {{border: '1px solid black',width:"9%"}} className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.TC==="-"?true:false}float={true} mappleType={'warning'}>
          {score.TC}
          <div>
          {score.nfTC}
          </div>
        </MappleToolTip>
        } key="Compete" />
        <Table.Cell style = {{border: '1px solid black',width:"9%"}}  className="App-table-content-cell" content={score.feedback}key="comments" />
    </Table.Row>
 
   </React.Fragment> 
))
 
 )
}
}



