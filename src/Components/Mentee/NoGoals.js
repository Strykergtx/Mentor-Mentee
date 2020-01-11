import React, { Component } from 'react'
import Button from 'terra-button/lib/Button';
import ActionHeader from 'terra-action-header';
import ActionFooter from 'terra-action-footer';
import DialogModal from 'terra-dialog-modal'
import Textarea from 'terra-form-textarea/lib/Textarea';


const buttonStyle = { margin: '5px' };


export default class NoGoals extends Component {
    constructor() {
        super();
    
        this.state = {
          isOpen: false,
        };
    
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }
    
      handleOpenModal() {
        this.setState({ isOpen: true });
      }
    
      handleCloseModal() {
        this.setState({ isOpen: false });
      }
    requestGoals = () =>{
      //send notification
        alert("Sucessfully requested");
        this.handleCloseModal();
    }
    render() {
        
        return (
            <div>
      <DialogModal
          ariaLabel="Default Dialog Modal"
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          header={<ActionHeader title="Request Goals" onClose={this.handleCloseModal} />}
          footer={<ActionFooter start="Make sure your request is relevant to the current project!" />}
        >
          <h3> Enter any additional comments you want to add before requesting</h3>
          <Textarea
            isAutoResizable
            size="small"
            defaultValue=""
            d="resizable"
        />
     <Button text="Submit" variant="emphasis" style={buttonStyle} onClick={this.requestGoals}/>
        </DialogModal>
       
      
                <h1 style = {{textAlign:'center', marginTop: '5%', color: '#989898'}}> No goals have been added</h1>
                
           
        <Button text="Request new goals" variant="emphasis" style={buttonStyle} onClick={this.handleOpenModal}/>
        
        
            </div>

        )
    }
}