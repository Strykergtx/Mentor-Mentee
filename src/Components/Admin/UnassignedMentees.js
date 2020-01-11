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
            selected:[],
            num:5,
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
            url: 'http://localhost:3002/freementees',
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
      this.props.modalfx()
    }
  
  onChange = (event, selectedIndexes, newIndex) => {
    console.log(selectedIndexes)
    this.setState({selected:selectedIndexes})
    //console.log(this.state.selected)
  };
 

  handleSubmit(){
    this.handleOpenModal()
    var selectedAIDs=[];
    this.state.selected.forEach(element => {
        selectedAIDs.push(this.state.mentees[element].AID)
    });
      
   console.log(selectedAIDs)
   Axios.post('http://localhost:3002/alignmentees', {
    AIDs: selectedAIDs,
    MID: this.props.MID,
    num: this.state.selected.length
  }).then(alert("done"))
  
  }
         
    render() {
         const max=5
      
        return (
            <div>
              <h2>Assign the following available mentees to {this.props.name}</h2>
              <h4>(Maximum number of Mentees that can be assigned is {max} currently)</h4> 
              {/* <h3>Mentor ID : {this.props.MID}</h3> */}
               <Table isStriped={false}>
  <Table.Header>
    <Table.HeaderCell content="Name" key="NAME" minWidth="small" />
    <Table.HeaderCell content="AID" key="ADDRESS" minWidth="medium" />
    <Table.HeaderCell content="Batch" key="PHONE_NUMBER" minWidth="large" />
    <Table.HeaderCell content="Skills" key="skillz" minWidth="large" />
  </Table.Header>
  <Table.MultiSelectableRows maxSelectionCount={this.state.num} onChange={this.onChange} >
    {this.state.mentees.map(detail => (
                    
                        
                      <Table.Row key="unsnrow" >
                         
                      <Table.Cell content={detail.fname} key="NAME" />
                      <Table.Cell content={detail.AID} key="aid" />
                      <Table.Cell content={detail.batch} key="batch" />
                      <Table.Cell content={detail.skills} key="skills" />
                      </Table.Row> 
                     
                      
                    
                    ))}
   
   </Table.MultiSelectableRows>
</Table>
<NotificationDialog
          variant={NotificationDialogVariants.SUCCESS}
          header ="Notification"
          isOpen={this.state.isOpen}
          title="Success"
          message="Selected Mentees have been Assigned "
          primaryAction={{
            text: 'Close',
            onClick: this.handleCloseModal,
          }}
        />
   <br/>
   <Button text="Add selected" variant="emphasis" className={cx('button')} onClick={this.handleSubmit}/>
  
            </div>
        )
    }
}
