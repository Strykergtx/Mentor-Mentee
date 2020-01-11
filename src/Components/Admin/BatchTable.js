import React, { Component } from 'react';
import Table from 'terra-table/lib/Table';
import BatchTableBody from './BatchTableBody';

export class BatchTable extends Component {
    render() {
       return (
            <div>
                <Table>
                    <Table.Header style={tableHeader}>
                            <Table.HeaderCell style={tableCell} content="Batch ID" key="Batch ID" minWidth="small" />
                            <Table.HeaderCell style={tableCell} content="No Mentees" key="No Mentees" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="Start" key="Start" minWidth="small" />
                            <Table.HeaderCell style={tableCell} content="Remaining Weeks" key="Remaining Weeks" minWidth="small" />
                            <Table.HeaderCell style={tableCell} content="% Graduated" key="Graduated" minWidth="large" />
                            <Table.HeaderCell style={tableCell} content="TAT" key="TAT" minWidth="small" />
                    </Table.Header>
                        <BatchTableBody table={this.props.batchs}/>  
                    
                   
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

export default BatchTable


