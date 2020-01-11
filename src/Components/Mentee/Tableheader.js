import React, { Component } from 'react';
import Table from 'terra-table/lib/Table';
import TableContent from './tablecontent.js';
import Danger from './Dangerows';

export default class MentorsTable extends Component {
    render() {
     // console.log(this.props.details)
       return (
            <div>

<Table isStriped={true}>
<Table.Header>
  <Table.HeaderCell style = {{border: '1px solid black',width:"9%"}} content="Week" key="Week" />
  <Table.HeaderCell style = {{border: '1px solid black',width:"9%"}} content="Professionalism" key="Prof"/>
  <Table.HeaderCell style = {{width:"9%",border: '1px solid black'}} content="Communication" key="Comms" />
  <Table.HeaderCell style = {{border: '1px solid black',width:"9%"}} content="Learning Agility" key="LA" />
  <Table.HeaderCell style = {{border: '1px solid black', width: '9%'}} content="Makes and keeps Commitments" key="Commitments"/>
  <Table.HeaderCell style = {{border: '1px solid black', width: '9%'}} content="Quality" key="Quality"/>
  <Table.HeaderCell style = {{border: '1px solid black',width:"9%"}} content="Technical Competency" key="Techcom"/>
  <Table.HeaderCell style = {{border: '1px solid black',width:"50%"}} content="feedback" key="feed"/>
  
</Table.Header>

<TableContent table={this.props.details}/>
<Danger table={this.props.details}/>
</Table>
</div>
         )  
        }
       }