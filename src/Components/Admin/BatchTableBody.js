import React, { Component } from 'react'
import Table from 'terra-table/lib/Table';

export class BatchTableBody extends Component {
    render() {
        return this.props.table.map((batchs) => (
            <React.Fragment>
                <Table.Row style={{borderBottom:'1px solid grey'}}>
                    <Table.Cell content={batchs.batch} key="Batch ID" />
                    <Table.Cell content={batchs.no_mentees} key="No Mentees" />
                    <Table.Cell content={batchs.Start} key="Start" />
                    <Table.Cell content={batchs.remaining} key="Remaining Weeks" />
                    <Table.Cell content={batchs.Grad} key="Graduated" />
                    <Table.Cell content={batchs.TAT} key="TAT" />
                </Table.Row>
                    
            </React.Fragment>
                    
        ))
    }
}

export default BatchTableBody
