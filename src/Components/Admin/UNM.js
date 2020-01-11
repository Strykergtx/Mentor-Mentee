import React, { Component } from 'react'
import Divider from 'terra-divider';
import Axios from 'axios';
import Table from 'terra-table/lib/Table';
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
import DialogModal from 'terra-dialog-modal';
import ActionHeader from 'terra-action-header/lib/ActionHeader';
import AvMentors from './AvailableMentors.js'
const cx = classNames.bind(styles);
export class AssignedMentees extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            menteedetails:[],
            batch:this.props.batch,
            dmopen:false,
            selection:[]
        };
        this.openDM=this.openDM.bind(this)
        this.closeDM=this.closeDM.bind(this)
      }

 openDM(props){
    this.setState({dmopen:true})
   this.setState({selection:props})
 }
 closeDM(){
     this.setState({dmopen:false})
 }
load(batch){
   this.setState({menteedetails:[]})
    Axios({
        method :'get',
        url: 'http://localhost:3002/umentee/'+batch,
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
if(this.state.menteedetails.length>0)
 {       return (
            <div>
                 <Table>     
             <Table.Header>
    <Table.HeaderCell content="Name" key="NAME" minWidth="small" />
    <Table.HeaderCell content="AID" key="ADDRESS" minWidth="medium" />
    <Table.HeaderCell content="Skills" key="skillz" minWidth="large" />
    <Table.HeaderCell content="Assign Mentor" key="ASM" minWidth="medium" />
  </Table.Header>
  <Table.Rows>
    {this.state.menteedetails.map(detail => (
                    
                        
                      <Table.Row key={detail._id} >
                         
                      <Table.Cell content={detail.fname+" "+detail.lname} key="NAME" />
                      <Table.Cell content={detail.AID} key="aid" />
                      <Table.Cell content={detail.skills} key="skills" />
                      <Table.Cell content={<Button text="Assign Mentor" variant="emphasis" className={cx('button')} onClick={()=>this.openDM(detail)}/>} key="ASM" />
                      </Table.Row> 
                     
                      
                    
                    ))}
   
   </Table.Rows>
</Table>    

            <DialogModal
                isOpen={this.state.dmopen}
                onRequestClose={this.closeDM}
                header={<ActionHeader title="Assign Mentor" onClose={this.closeDM} />}
                width="1000"
                >  
                <AvMentors content={this.state.selection}/>
            </DialogModal>
 
            </div>
        )
    }
    else{
        return(
            <div>
           <h3>Looks like this list is empty!</h3> 
            </div>
        )
    }
    }
}

export default AssignedMentees
