import React, { Component } from 'react'
import Divider from 'terra-divider';
import Axios from 'axios';
import Table from 'terra-table/lib/Table';
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
const cx = classNames.bind(styles);
export class AssignedMentees extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            menteedetails:[],
            batch:this.props.batch,
          
        };
    
      }

load(batch){
   this.setState({menteedetails:[]})
    Axios({
        method :'get',
        url: 'http://localhost:3002/amentee/'+batch,
        config: {headers : {'Content-Type' : 'application/json'}}
      }).then( response => {
         
        console.log(response.data);
        
        for(var i = 0; i<response.data.length; i++){
            this.setState({menteedetails:[...this.state.menteedetails,response.data[i]]  });
          
            }
      
    
      });
}      
componentDidMount(){

this.load(this.state.batch)
}
    render() {
        if(this.props.batch!=this.state.batch)
        {  
         this.setState({batch:this.props.batch})
          //console.log("yolo")
          this.load(this.props.batch)
        }

        return (
            <div>
           <Table>     
             <Table.Header>
    <Table.HeaderCell content="Name" key="NAME" minWidth="small" />
    <Table.HeaderCell content="AID" key="ADDRESS" minWidth="medium" />
    <Table.HeaderCell content="MID" key="MID" minWidth="medium" />
    <Table.HeaderCell content="Skills" key="skillz" minWidth="large" />
    <Table.HeaderCell content="Showmore" key="show" minWidth="large" />
  </Table.Header>
  <Table.Rows>
    {this.state.menteedetails.map(detail => (
                  
                      <Table.Row key={detail._id} >  
                      <Table.Cell content={detail.fname+" "+detail.lname}  key="NAME" />
                      <Table.Cell content={detail.AID} key="aid" />
                      <Table.Cell content={detail.MID} key="mid" />
                      <Table.Cell content={detail.skills} key="skills" />
                      <Table.Cell content={<Button text="Show more info" variant="emphasis" className={cx('button')} onClick={()=>this.openDM(detail)}/>} key="showmore" />
                      </Table.Row> 
                     
                      
                    
                    ))}
   
   </Table.Rows>
</Table>
            </div>
        )
    }
}

export default AssignedMentees
