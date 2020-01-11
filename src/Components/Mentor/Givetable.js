import React, { Component } from "react";
import ActionHeader from "terra-action-header/lib/ActionHeader";
import Table from "terra-table/lib/Table";
import {Link} from "react-router-dom";
import Grid from 'terra-grid/lib/Grid';
import Card from 'terra-card';


import Avatar, { Facility, SharedUser } from 'terra-avatar';

export default class Givetable extends Component {
  render() {
    const {firstname, contactno, emailid, batch , menteeaid} = this.props;

    return (
        <Grid.Column tiny={6}>
        <Link style = {{color:"white"}} to = {'/MenteeDetails/'+ menteeaid}>
        <Card style={{color:"black"}}> 
       
          <Table isStriped={false}>
            <Table.Rows style={{border:"0"}}>
            <Table.Row>
            <Table.Cell content={<Avatar alt="image displays" image={"https://www.w3schools.com/howto/img_avatar.png"} color="neutral" size="2em"/>} rowspan="4" style={{textAlign:"center"}}>
            </Table.Cell>
              <Table.Cell content={firstname}></Table.Cell>
              </Table.Row>
              <Table.Row style={{border:"0"}}>
              <Table.Cell content={batch} style={{border:"0"}}></Table.Cell>
              </Table.Row>
              <Table.Row style={{border:"0"}}>
              <Table.Cell content={emailid} style={{border:"0"}}></Table.Cell>
              </Table.Row>
              <Table.Row style={{border:"0"}}>
              <Table.Cell content={contactno} style={{border:"0"}}></Table.Cell>
              </Table.Row>
              </Table.Rows>
          </Table> 
        </Card>
        <br />
        </Link>
  </Grid.Column>
  
    )}
    }