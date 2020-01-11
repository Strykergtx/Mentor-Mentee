import React, { Component } from 'react'
import IconFlag from 'terra-icon/lib/icon/IconFlag'
//import Divider from 'terra-divider';
// import ActionHeader from 'terra-action-header';
import Field from 'terra-form-field';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import ActionHeader from 'terra-action-header/lib/ActionHeader';
//import ActionFooter from 'terra-action-footer';
import DialogModal from 'terra-dialog-modal';
import DialogContent from './DialogContent';
//import { tsConstructorType } from '@babel/types';
//import Textarea from 'C:/Users/SS073166/Downloads/AdvancedDevApp/node_modules/terra-form-textarea/lib/Textarea';
//import TextareaField from 'C:/Users/SS073166/Downloads/AdvancedDevApp/node_modules/terra-form-textarea/lib/TextareaField';
import IconDocuments from 'terra-icon/lib/icon/IconDocuments';
//import IconAttachment from 'terra-icon/lib/icon/IconAttachment';
import Button from 'terra-button';
// import Field from 'terra-form-field';
//import Card from 'terra-card/lib/Card';
//import Goals from './Goals';
// import TextareaField from '../../../TextareaField'
import Axios from 'axios'
//import './hovereffect.css';

export default class GiveGoals extends Component {
    // onClicked(){
    //     alert('Goes to comment section');
    constructor(){
        super();

        this.state = {
            isOpen: false,
            area:" ",
            example:'lol'
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
        
    
    handleOpenModal(){
        this.setState({isOpen: true});

      

    }
   
    handleCloseModal(){
        this.setState({isOpen: false});
    }

    notification(){
        return alert("Hello world");
      } 
    clicked(){
        alert("lol");
    }
    render() {
        const {name, description, type, month, date, year, duesince} = this.props;
        //console.log("This is something we been doing: "+ this.props.mentorfname);
        var message = "";
        if(type === 0)
            message = "Due since "+ duesince + " days";
        else if(type === 1)
            message = "Assigned"
        else
            message = "Completed on " + date + " " + month + " "+ year
        return (
            
            <div>
            <DialogModal
                isOpen={this.state.isOpen}
                 onRequestClose={this.handleCloseModal}
                header={<ActionHeader title="Task" onClose={this.handleCloseModal} />}
                width="1000">  
                <DialogContent content = {this.props}/>
            </DialogModal>
            <div className  style = {{border: '0.2px solid', borderRadius: '8px', marginTop: '3%', backgroundColor: '#D9D9D9'}} onClick = {this.handleOpenModal}>
            
                <p style = {{textAlign:'justify'}}><IconFlag style = {{float: 'left', marginLeft: '0.5%'}}/> <b style = {{marginLeft: '1%'}}>{name}</b>
                <span style = {{float: 'right', marginRight: '0.8%'}}><b>{message} </b></span> </p>
                <hr style = {{backgroundColor: 'black'}}/>
                
                <p style = {{textAlign: 'left', marginLeft: '0.8%'}}> {description} </p>
                <p style = {{textAlign: 'right' ,marginRight: '0.8%'}}> Due on {date} {month} {year} </p>
    
            </div>
            </div>
        )
    }
}

{/* <div style={{background:'#e6e6e6', width:'25%',position:'relative',left: '74%', padding:'1%'}}> */}
