import React, { Component } from 'react'
import Card from 'terra-card';
import Avatar, { Facility, SharedUser } from 'terra-avatar';
import Table from "terra-table/lib/Table";
import Button from 'terra-button';
import styles from './ButtonDocCommon.module.scss';
import Grid from 'terra-grid/lib/Grid';
import classNames from 'classnames/bind';
import NotificationDialog, { NotificationDialogVariants } from 'terra-notification-dialog';
import Axios from 'axios'
const cx = classNames.bind(styles);
export class MenteeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentees:[],
            nopen:false,
            num:5,
            selected:[]
        };
        this.handleClick=this.handleClick.bind(this)
        this.handleCloseNotification=this.handleCloseNotification.bind(this)
        this.handleCloseNotificationAxios=this.handleCloseNotificationAxios.bind(this)
        this.onChange=this.onChange.bind(this);
        }
        
    componentDidMount(){
    
        Axios({
            method :'get',
            url: 'http://localhost:3002/menteesundermentor/'+this.props.mid,
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
              console.log(response);
             
              for(var i = 0; i<response.data.length; i++){
                this.setState({mentees:[...this.state.mentees,response.data[i]]  });
              }
              //  }
             // console.log(this.state.mentordetails);  
             // console.log(this.state.mentordetails[0])
             
           });
    }
    handleClick(event){
        //console.log(event.currentTarget.value)
        this.setState({nopen:true});
        
        }
        
        handleCloseNotification() {
          this.setState({ nopen: false });
        }
        
        handleCloseNotificationAxios()
        {  
          var selectedAIDs=[];
          this.state.selected.forEach(element => {
        selectedAIDs.push(this.state.mentees[element].AID)
          });
          console.log(selectedAIDs)

         Axios.post('http://localhost:3002/removementor', {
              list:selectedAIDs,
              mAID:this.props.mid,
              acm:this.props.acm,
              num:selectedAIDs.length
          }).then(function (request) {
            console.log("removed");
          })
          .catch(function (error) {
            console.log(error);
          });
         
          this.setState({ nopen: false });
          this.props.refresh()
        }

        
        onChange = (event, selectedIndexes, newIndex) => {
          console.log(selectedIndexes)
          this.setState({selected:selectedIndexes})
          //console.log(this.state.selected)
        };
       

    render() {

        return (
            <div>
              <h1> Total Mentees for {this.props.mid} </h1>
              <h2>ACM:{this.props.acm} </h2>
              <br/>
              {/* <h2>Mentees List</h2> */}
              <Table isStriped={false}>
  <Table.Header>
    <Table.HeaderCell content="Name" key="NAME" minWidth="small" />
    <Table.HeaderCell content="AID" key="ADDRESS" minWidth="medium" />
    <Table.HeaderCell content="Batch" key="BATCH" minWidth="large" />
    <Table.HeaderCell content="Skills" key="skillz" minWidth="large" />
  </Table.Header>
  <Table.MultiSelectableRows maxSelectionCount={this.state.num} onChange={this.onChange} >
    {this.state.mentees.map(detail => (
                    
                        
                      <Table.Row key="yolo" >
                         
                      <Table.Cell content={detail.fname} key="NAME" />
                      <Table.Cell content={detail.AID} key="aid" />
                      <Table.Cell content={detail.batch} key="batch" />
                      <Table.Cell content={detail.skills} key="skills" />
                      </Table.Row> 
                     
                      
                    
                    ))}
   
   </Table.MultiSelectableRows>
</Table>
<Button text="remove" variant="action" isCompact onClick={this.handleClick} className={cx('button') } key="remove"/> 
                     <NotificationDialog
        variant={NotificationDialogVariants.ALERT}
        header ="Notification"
        isOpen={this.state.nopen}
        title="Remove Mentee"
        message="Are you sure you want to unassign these mentee(s)"
        primaryAction={{
          text: 'Yes!',
          onClick: this.handleCloseNotificationAxios
        }}
        secondaryAction={{
          text: 'No,I want to review once more',
          onClick: this.handleCloseNotification,
        }}
        /> 
            </div>
        )
    }
}

export default MenteeList
