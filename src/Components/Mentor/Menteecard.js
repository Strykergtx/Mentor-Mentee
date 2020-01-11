import React, { Component } from "react";
import Divider from "terra-divider/lib/Divider";
import Grid from 'terra-grid/lib/Grid';
import Givetable from './Givetable';
import Axios from 'axios';


export default class MenteeCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details:[]
    };
  }
  componentDidMount = () => { 
    Axios({
      method :'get',
      url: 'http://localhost:3002/getallmentees/'+ 3 + '/' + this.props.MID,
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
      for(var i = 0; i<response.data.length; i++){
      this.setState({details:[...this.state.details,response.data[i]]  });
      }
      console.log(response.data.length)
    });
  }
  render() {
    return (
      <div>
        <h3 style={{ textAlign: "left" }}>Active</h3>
        <Divider style={{ marginTop: "-1%" }} /> <br/> 
        <Grid>
          <Grid.Row>
        {this.state.details.map(detail => (
          
                      <Givetable
                        menteeaid = {detail.AID}
                        firstname = {detail.fname}
                        lastname = {detail.lname}
                        batch = {detail.batch}
                        emailid = {detail.email}
                      />
                    ))}
        
      </Grid.Row>
      </Grid>
        </div>
      
    );
  }
}
