import React, { Component } from 'react'
import Table from 'terra-table/lib/Table';
import MappleToolTip from 'reactjs-mappletooltip';


export default class TableContent extends Component {
   

 render() {

      var weekno=7;
        return (this.props.table.slice(6,7).map((score) => (
  <React.Fragment>     
  <Table.Row key="" style = {{ background:"#F81F44",fontSize: "15px",border: '1px solid black'}} >
  <Table.Cell className="App-table-content-cell" content={weekno++} key="week"/>
        <Table.Cell  className="App-table-content-cell" content={
             <MappleToolTip showMappleIf={score.EP==="-"?true:false}float={true} mappleType={'warning'}>
             {score.EP}
             <div>
               {score.nfEP}
             </div>
           </MappleToolTip>
          } key="Pro" />
        <Table.Cell  className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.CE==="-"?true:false}float={true} mappleType={'warning'}>
          {score.CE}
          <div>
            {score.nfCE}
          </div>
        </MappleToolTip>
          } key="Comms" />
        <Table.Cell  className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.LA==="-"?true:false}float={true} mappleType={'warning'}>
          {score.LA}
          <div>
          {score.nfLA}
          </div>
        </MappleToolTip>
          } key="L_A" />
        <Table.Cell  className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.MK==="-"?true:false}float={true} mappleType={'warning'}>
             {score.MK}
             <div>
             {score.nfMK}
             </div>
           </MappleToolTip>
        } key="commit" />
        <Table.Cell  className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.WQ==="-"?true:false}float={true} mappleType={'warning'}>
          {score.WQ}
          <div>
          {score.nfWQ}
          </div>
        </MappleToolTip>
        } key="Qual" />
        <Table.Cell  className="App-table-content-cell" content={
          <MappleToolTip showMappleIf={score.TC==="-"?true:false}float={true} mappleType={'warning'}>
          {score.TC}
          <div>
          {score.nfTC}
          </div>
        </MappleToolTip>
        } key="Compete" />
        <Table.Cell  className="App-table-content-cell" content={score.feedback}key="comments" />
 </Table.Row>
  </React.Fragment>

))
 


        )
}
}


