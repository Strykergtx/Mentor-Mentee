import React, { Component } from 'react'
import Table from 'terra-table';
import Axios from 'axios'
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
import NotificationDialog, { NotificationDialogVariants } from 'terra-notification-dialog';

const cx = classNames.bind(styles);

export default class UnassignedMentees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mentees:[],
            selected:'',
            isOpen:false
        };

        
        this.onChange=this.onChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        }
        
    componentDidMount(){
    
        Axios({
            method :'get',
            url: 'http://localhost:3002/freementors',
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
              console.log(response);
             
              for(var i = 0; i<response.data.length; i++){
                this.setState({mentees:[...this.state.mentees,response.data[i]]  });
              }
             
             console.log(this.state.mentees)
           });
    }
      
    handleOpenModal() {
      this.setState({ isOpen: true });
    }
  
    handleCloseModal() {
      this.setState({ isOpen: false });
 
    }
  
  onChange(event, selectedIndex){
    //console.log(selectedIndexes)
    this.setState({selected:selectedIndex})
  };
 

  handleSubmit(){
    this.handleOpenModal()
   console.log(this.state.selected)

   ///WRITE AXIOS TO ASSIGN MENTOR HERE



   
  }
         
    render() {
         const max=5
      
        return (
            <div>
              <h2>These are the available Mentors for {this.props.content.fname} {this.props.content.lname}</h2>
              {/* <h3>Mentor ID : {this.props.MID}</h3> */}
               <Table isStriped={false}>
  <Table.Header>
    <Table.HeaderCell content="Name" key="NAME" minWidth="small" />
    <Table.HeaderCell content="AID" key="ADDRESS" minWidth="medium" />
    <Table.HeaderCell content="Skills" key="skillz" minWidth="large" />
  </Table.Header>
  <Table.SingleSelectableRows  onChange={this.onChange} >
    {this.state.mentees.map(detail => (
                    
                        
                      <Table.Row key="unsnrow" >
                         
                      <Table.Cell content={detail.fname} key="NAME" />
                      <Table.Cell content={detail.AID} key="aid" />
                      <Table.Cell content={detail.skills} key="skills" />
                      </Table.Row> 
                     
                      
                    
                    ))}
   
   </Table.SingleSelectableRows>
</Table>
<NotificationDialog
          variant={NotificationDialogVariants.SUCCESS}
          header ="Notification"
          isOpen={this.state.isOpen}
          title="Success"
          message="Mentee has been assigned"
          primaryAction={{
            text: 'Close',
            onClick: this.handleCloseModal,
          }}
        />
   <br/>
   <Button text="Assign to selected" variant="emphasis" className={cx('button')} onClick={this.handleSubmit}/>
  
            </div>
        )
    }
}
