

import Axios from 'axios';
import React, { Component } from 'react'
import Table from 'terra-table/lib/Table';
import Button from 'terra-button';
import styles from './ButtonDocCommon.module.scss';
import classNames from 'classnames/bind';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import ActionHeader from 'terra-action-header/lib/ActionHeader';
//import ActionFooter from 'terra-action-footer';
import DialogModal from 'terra-dialog-modal';
import Mapple from 'reactjs-mappletooltip'
import MenteeList from './MenteesUnderMentors.js';
const cx = classNames.bind(styles);

export default class Mentors extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mentordetails:[],
            //activementees:[],
            selectedmid:'',
            selectedacm:''
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.closeandrefresh =this.closeandrefresh.bind(this)
        this.showMessage=this.showMessage.bind(this);
        this.load=this.load.bind(this)
      }

     showMessage(props){
    
     }
      



    handleOpenModal(props){
      this.setState({isOpen: true});
      console.log(props)
    this.setState({selectedmid:props.AID})
    this.setState({selectedacm:props.acm})   
  }
 
  handleCloseModal(){
      this.setState({isOpen: false});

  }
    
  closeandrefresh(){
    this.setState({isOpen:false})
   // 
   this.setState({mentordetails:[]})
    this.load()

  }

  load(){
   
    Axios({
      method :'get',
      url: 'http://localhost:3002/assignedmentors',
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
        //console.log(response.data);
       
        for(var i = 0; i<response.data.length; i++){
          this.setState({mentordetails:[...this.state.mentordetails,response.data[i]]  });
        
          }
          console.log("assigned mentors")
        console.log(this.state.mentordetails);  
       // console.log(this.state.mentordetails[0])   
    });
  }
  componentDidMount(){
     this.load()
    
    }

    render() {
      const CustomCell = props => (
        <div>
        {props.text} <Button text="Edit Mentees" variant="action"icon={<IconEdit />} onClick={()=>this.handleOpenModal(props.val)} value='' isCompact className={cx('button') } />
        </div>
      );
        return (
            <div>
            
          <Table>
                    <Table.Header style={tableHeader}>
                            <Table.HeaderCell style={tableCell} content="Associate ID" key="AID" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="Name" key="name" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="Skills" key="skillz" minWidth="medium" />
                            <Table.HeaderCell style={tableCell} content="E-mail" key="e-mail" minWidth="medium" />
                            {/* <Table.HeaderCell style={tableCell} content="Name" key="Name" minWidth="medium" /> */}
                            <Table.HeaderCell style={tableCell} content="Active Mentees" key="acm" minWidth="medium" />
                    </Table.Header>
                     {this.state.mentordetails.map(detail => (
                      <Table.Row style={{borderBottom:'1px solid grey'}}>
                      <Table.Cell content={<Mapple showMappleIf={(detail.AID=="UU033116")?true:false} >{detail.AID}<div>{detail.AID}</div></Mapple>}  key="aid" />
                      <Table.Cell content={detail.fname} key="fname" />
                      <Table.Cell content={detail.skills} key="skills" />
                      <Table.Cell content={detail.email} key="E-mail" />
                       <Table.Cell content={<CustomCell text={detail.acm} val={detail} subtext="Edit" /> }  key="editbutton" />            
                             
                      </Table.Row>   
                    ))}
                   
                </Table> 
                <DialogModal
                isOpen={this.state.isOpen}
                onRequestClose={this.handleCloseModal}
                header={<ActionHeader title="Edit Mentees" onClose={this.handleCloseModal} />}
                width="640">  
                <MenteeList mid= {this.state.selectedmid} acm={this.state.selectedacm} refresh={this.closeandrefresh}/>
                </DialogModal>  
          
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