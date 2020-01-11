import React, { Component } from 'react'
import Table from 'terra-table/lib/Table';
import Axios from 'axios'
import Button from 'terra-button';
import styles from './ButtonDocCommon.module.scss';
import classNames from 'classnames/bind';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import UM from './UnassignedMentees.js'
import ActionHeader from 'terra-action-header/lib/ActionHeader';
import ActionFooter from 'terra-action-footer';
import DialogModal from 'terra-dialog-modal';
const cx = classNames.bind(styles);



export class MentorTableBody extends Component {
    
    constructor(){
        super();

        this.state = {
            isOpen: false,
                
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


    render() {
        const CustomCell = props => (
            <div>
            {props.text} <Button text="Add Mentees" variant="action"icon={<IconEdit />} onClick={this.handleOpenModal} isCompact className={cx('button')} />
            </div>
          );
        
      
        return (
            <React.Fragment>
                <Table.Row style={{borderBottom:'1px solid grey'}}>
                    <Table.Cell content={this.props.mentoraid} key="aid" />
                    <Table.Cell content={this.props.name} key="aid" />
                    <Table.Cell content={this.props.skills} key="aid" />
                    <Table.Cell content={this.props.emailid} key="E-mail" />
                    {/* <Table.Cell content={this.props.count}  key="acm" />   
                                 */}
                                
                     <Table.Cell content={<CustomCell text={this.props.count} subtext="Edit" /> }  key="editbutton" />            
                           
                </Table.Row>
                <DialogModal
                isOpen={this.state.isOpen}
                onRequestClose={this.handleCloseModal}
                header={<ActionHeader title="Add Mentees" onClose={this.handleCloseModal} />}
                width="640">  
                <UM name= {this.props.name} MID={this.props.mentoraid} modalfx={this.handleCloseModal}/>
                </DialogModal>  
            </React.Fragment>
                    
        )    
    }
}

export default MentorTableBody
