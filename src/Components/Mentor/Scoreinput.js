import React, { Component } from 'react'
import Table from 'terra-table';
import Axios from 'axios'
import DialogModal from 'terra-dialog-modal';
import ActionHeader from 'terra-action-header/lib/ActionHeader';
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
import NotificationDialog, { NotificationDialogVariants } from 'terra-notification-dialog';
import { exportDefaultSpecifier } from '@babel/types';

const cx = classNames.bind(styles);

export class Scoreinput extends Component {
  constructor(props) {
    super(props);
    this.state =  
    {
      EP:"0",
      CE:"0",
      LA:"0",
      MK:"0",
      WQ:"0",
      TC:"0",
      value:"Enter feedback here",
      axios:false,
      dmopen:false,
      nopen:false, 
      negarr:[],
      nfEP:"NA",
      nfCE:"NA",
      nfLA:"NA",
      nfMK:"NA",
      nfWQ:"NA",
      nfTC:"NA",
      givescoreavail:true,
      days:0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleOpenDM = this.handleOpenDM.bind(this);
    this.handleCloseDM = this.handleCloseDM.bind(this)
    this.submitNegative=this.submitNegative.bind(this)
    this.axiosPost=this.axiosPost.bind(this)

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleOpenNotification=this.handleOpenNotification.bind(this)
  }
  
  handleOpenDM(x) {
 // console.log(this.state.negarr)
   if(x.length>0) 
    this.setState({ dmopen: true });
    else
    { this.axiosPost() 
      this.setState({nopen:true})
      }
  //this.setState({dmopen:true})
  }


  handleCloseDM(){
    this.setState({dmopen:false})
  }
  
  handleOpenNotification(){
    this.setState({nopen:true})
    
 }
   
 handleCloseNotification(){
    this.setState({nopen:false})
    this.setState({dmopen:false})
    this.setState({givescoreavail:false})
    this.setState({days:6})
    this.props.refreshparent()
 }

  componentDidMount()
  {
  var len=this.props.scorecard.length
  if(len>0)
   {
  var currweek=len-1
  var lastsubmitdate=new Date(this.props.scorecard[currweek].week) 
  var today = new Date();

  var diffTime = Math.abs(today.getTime() - lastsubmitdate.getTime());
  var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if(diffDays>=7)
  this.setState({givescoreavail:true})
  else
  {this.setState({givescoreavail:false})
    var diff=7-diffDays
    this.setState({days:diff})
   }
   }
  
  
    this.setState({axios:true})
  }
  
  submitNegative(){
    // console.log(this.state.nfEP)
    // console.log(this.state.nfCE)
    var flag=0
    this.state.negarr.forEach(element => {
     if(this.state[element.name]=="NA")
     flag=-1
    });

    if(flag==-1)
    alert("Fill are the required fields first")
    else
   {  alert("Done all checks out")
      this.axiosPost()
      this.handleOpenNotification()
      
   }
  
  }
 
  axiosPost(){
      console.log("Axios post works") 
       if(this.state.axios==true)
    {Axios.post('http://localhost:3002/scores', {
      AID:this.props.aid,
      EP:this.state.EP,
      CE:this.state.CE,
      LA:this.state.LA,
      MK:this.state.MK,
      WQ:this.state.WQ,
      TC:this.state.TC,
      nfEP:this.state.nfEP,
      nfCE:this.state.nfCE,
      nfLA:this.state.nfLA,
      nfMK:this.state.nfMK,
      nfWQ:this.state.nfWQ,
      nfTC:this.state.nfTC,
      feedback:this.state.value
    }).then(this.setState({axios:false}))

  
  }

  }




  handleChange(event) {
     
      if((event.target.name) === "EP"){ 
        this.setState({EP : event.target.value});
      }else if((event.target.name) === "CE"){
        this.setState({CE : event.target.value});
      }else if((event.target.name) === "LA"){
        this.setState({LA : event.target.value});
      }else if((event.target.name) === "MK"){
        this.setState({MK : event.target.value});
      }else if((event.target.name) === "WQ"){
        this.setState({WQ : event.target.value});
      }else if((event.target.name) === "TC"){
        this.setState({TC : event.target.value});
      }
///// negative  feedback values
      else if((event.target.name) === "nfEP"){
        this.setState({nfEP : event.target.value});
        console.log(this.state.nfEP)
      }
      else if((event.target.name) === "nfCE"){
        this.setState({nfCE : event.target.value});
        console.log(this.state.nfCE)
      }
      else if((event.target.name) === "nfLA"){
        this.setState({nfLA: event.target.value});
      }
      else if((event.target.name) === "nfMK"){
        this.setState({nfMK : event.target.value});
      }
      else if((event.target.name) === "nfWQ"){
        this.setState({nfWQ : event.target.value});
      }
      else if((event.target.name) === "nfTC"){
        this.setState({nfTC : event.target.value});
      }

      else{
        this.setState({value:event.target.value});
      }
  }
 
  handleSubmit(event) {
var list=[];
if(this.state.EP=="-")
list.push({name:"nfEP",content:"Reason for negative in EP"})
if(this.state.CE=="-")
list.push({name:"nfCE",content:"Reason for negative in CE"})
if(this.state.LA=="-")
list.push({name:"nfLA",content:"Reason for negative in LA"})
if(this.state.MK=="-")
list.push({name:"nfMK",content:"Reason for negative in MK"})
if(this.state.WQ=="-")
list.push({name:"nfWQ",content:"Reason for negative in WQ"})
if(this.state.TC=="-")
list.push({name:"nfTC",content:"Reason for negative in TC"})
this.setState({negarr:list})
 
    alert('handleSubmit works..opening negative feedback screen');
    event.preventDefault();
    this.handleOpenDM(list)
  }

  render() {
   if(this.state.givescoreavail==true) 
     { return (
        <div style={{padding:"0px 22px 37px 22px"}}>
          <h3 style={{fontSize:"20px", textAlign:"left"}}>Add Scores for week {this.props.scorecard.length+1}</h3>
          <form onSubmit={this.handleSubmit}>
                <Table isStriped={false}>
                      <Table.Header>
                        <Table.HeaderCell content="Exhibits Professionalism" key="EP" minWidth="small" />
                        <Table.HeaderCell content="Communicates Effectively" key="CE" minWidth="small" />
                        <Table.HeaderCell content="Learning Agility" key="LA" minWidth="small" />
                        <Table.HeaderCell content="Makes and Keeps Commitments" key="MK" minWidth="small" />
                        <Table.HeaderCell content="Quality Work Products" key="QW" minWidth="small" />
                        <Table.HeaderCell content="Technical Competency" key="TC" minWidth="small" />
                      </Table.Header>
                      <Table.Rows>
                        <Table.Row key="PERSON_0">
                        <Table.Cell content={
                          <select value={this.state.EP} name="EP" id="EP" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                            <option value="0" >0</option>
                            <option value="-">-</option>
                            <option value="+">+</option>
                            <option value="++">++</option>
                          </select>
                          } key="EP" />
                          <Table.Cell content={
                          <select value={this.state.CE} name="CE" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                              <option value="0" >0</option>
                              <option value="-">-</option>
                              <option value="+">+</option>
                              <option value="++">++</option>
                          </select>
                          } key="CE" />
                          <Table.Cell content={
                            <select value={this.state.LA} name="LA" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                            <option value="0" >0</option>
                            <option value="-">-</option>
                            <option value="+">+</option>
                            <option value="++">++</option>
                          </select>
                          } key="LA" />
                          <Table.Cell content={
                            <select value={this.state.MK} name="MK" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                            <option value="0" >0</option>
                            <option value="-">-</option>
                            <option value="+">+</option>
                            <option value="++">++</option>
                          </select>
                          } key="MK" />
                          <Table.Cell content={
                            <select value={this.state.WQ} name="WQ" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                            <option value="0" >0</option>
                            <option value="-">-</option>
                            <option value="+">+</option>
                            <option value="++">++</option>
                          </select>
                          } key="WQ" />
                          <Table.Cell content={
                            <select value={this.state.TC} name="TC" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                            <option value="0" >0</option>
                            <option value="-">-</option>
                            <option value="+">+</option>
                            <option value="++">++</option>
                          </select>
                          } key="TC" />
                        </Table.Row>
                      </Table.Rows>
                </Table>
                <textarea value = {this.state.value} onChange={this.handleChange} placeholder="Add feedback . . ." style={{width:"100%", maxWidth:"100%",marginTop:"5px", height:"60px", borderRadius:"2px"}}/>
                
                <input type="submit" value="Submit"  style={{float:"right", marginTop:"4px", backgroundColor:"#4CAF50", border:"1px solid #9de56f",borderRadius:"2px",color:"white", cursor:"pointer", width:"100px", height:"35px"}}/>
            </form>
            <DialogModal
                isOpen={this.state.dmopen}
                onRequestClose={this.handleCloseDM}
                header={<ActionHeader title="Normalize" onClose={this.handleCloseDM} />}
                width="1000"
                >  
                {/* <NegF arr={this.state.negarr}/> */}
              <h2>We observed some negative scores ,please specify why</h2>
             {this.state.negarr.map(info =>(
               <div>     
             <h4>{info.content}</h4>         <textarea name={info.name}  onChange={this.handleChange} placeholder="Add feedback . . ." style={{width:"100%", maxWidth:"100%",marginTop:"5px", height:"60px", borderRadius:"2px"}}/>
             </div> 
                    ))}
                <Button text="Confirm feedback and Submit" variant="emphasis" className={cx('button')} onClick={this.submitNegative}/>
             

            </DialogModal>   
            <NotificationDialog
          variant={NotificationDialogVariants.SUCCESS}
          header ="Notification"
          isOpen={this.state.nopen}
          title="Success"
          message="Scores are submitted now"
          primaryAction={{
            text: 'Okay',
            onClick: this.handleCloseNotification
          }}
          />  
        </div>
      );
      }
        else
        {
          return(<div>
            <h2> You need to wait {this.state.days} day(s) more to give the next score! Please be patient </h2>
          </div>)
        }
  }
}

export default Scoreinput


