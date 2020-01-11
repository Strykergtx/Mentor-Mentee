import React, { Component } from 'react'
import Axios from 'axios'
import IconFlag from 'terra-icon/lib/icon/IconFlag'
import Checkbox from 'terra-form-checkbox';
import Table from 'terra-table'
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
import NotificationDialog, { NotificationDialogVariants } from 'terra-notification-dialog';

const cx = classNames.bind(styles);
export class MentorFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
         mentorf:[],
         nopen:false,
         buttoname:"Select All",
         allchecked:false

        };
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
        this.ApproveSelected=this.ApproveSelected.bind(this)
        this.ApproveAxios = this.ApproveAxios.bind(this);
        this.selectAll=this.selectAll.bind(this)
        this.CheckOne=this.CheckOne.bind(this)

    }
    
    handleCloseNotification() {
      this.setState({ nopen: false });
     
    }
    ApproveSelected(){
      this.setState({ nopen: true});
    }

    ApproveAxios(){
      this.setState({nopen:false})

      ////write submit axios here
    this.state.mentorf.forEach(element => {
      Axios.post('http://localhost:3002/mentorfapprove', {
        AID:element.aid,   
        i:element.i,
        app:element.approved
    });
    });      
    }

    selectAll(){
     if(this.state.allchecked==false)
     {this.setState({buttoname:"Undo Select All"})
     this.setState({allchecked:true})

     let mentor=this.state.mentorf
       mentor.forEach(element => {
           element.checked=true
           element.approved="yes"
          
       });
       this.setState({
           mentorf:mentor
           })
       console.log(this.state.mentorf)
    }
    else
    {
      this.setState({allchecked:false})
     this.setState({buttoname:"Select All"})
     let mentor=this.state.mentorf
     mentor.forEach(element => {
         element.checked=false
         element.approved="no"
        
     });
     this.setState({
         mentorf:mentor
         })
     console.log(this.state.mentorf)
 

    }
    }

    CheckOne(e){
      this.setState({buttoname:"Select All"})
      this.setState({allchecked:false})
      if(e.currentTarget.checked)
      {
       let mentor=this.state.mentorf
       mentor.forEach(element => {
          if(element.ID==e.currentTarget.value)
          {element.checked=true
           element.approved="yes"
          }
       });
       this.setState({
           mentorf:mentor
           })
       console.log(this.state.mentorf)
 
      }

     else
     { let mentor=this.state.mentorf
       mentor.forEach(element => {
          if(element.ID==e.currentTarget.value)
          {element.checked=false
           element.approved="no"
          }
       });
       this.setState({
           mentorf:mentor
           })
         console.log(this.state.mentorf)  
     } 



    }
    componentDidMount(){
        Axios({
            method :'get',
            url: 'http://localhost:3002/getmentorfeedback',
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
              
            var list=[];
            response.data.forEach(element => {
             // console.log(element)
             
            if(element.graduated=="progress")
            var message="Feedback half way through DevCentre"
            else
            if(element.graduated=="yes")
            var message="Feedback after graduation"
            else
            var message="Not graduated"
     if(element.mentorfeedback.length<2)       
      {     if(element.mentorfeedback[0].approved=="needreview")
           {
           var id=element.AID+"-"+0
           list.push({aid:element.AID,lname:element.lname,fname:element.fname,details:element.mentorfeedback[0],mid:element.MID,message:message,i:0,approved:"no",checked:false,ID:id})
            
           }
          }
     else { 
            if(element.mentorfeedback[0].approved=="needreview")
           {
             var id=element.AID+"-"+0
             list.push({aid:element.AID,lname:element.lname,fname:element.fname,details:element.mentorfeedback[0],mid:element.MID,message:message,i:0,approved:"no",checked:false,ID:id})
       
             } 
           if(element.mentorfeedback[1].approved=="needreview")
           {
            var id=element.AID+"-"+1
          list.push({aid:element.AID,lname:element.lname,fname:element.fname,details:element.mentorfeedback[1],mid:element.MID,message:message,i:1,approved:"no",checked:false,ID:id})
           }
          }
            });//END OF FOR EACH

           // console.log(list)
            this.setState({mentorf:list})
          //  console.log(this.state.mentorf)
            
           });
    }
    render() {
if(this.state.mentorf.length>0)      
{
        return (
          <div>
            <h1>Feedback Given by Mentees to Mentors</h1>


            <h3>Approve individually or select all ,rest will all be rejected by default</h3>
            <Table isStriped={true}isPadded={true}  >
    <Table.Header>
    <Table.HeaderCell content="Name" style = {{border: '1px solid black',width:"5%"}}  key="fname" minWidth="small" />
    <Table.HeaderCell content="AID" style = {{border: '1px solid black',width:"5%"}}  key="AID" minWidth="small" />
    <Table.HeaderCell content="MID" style = {{border: '1px solid black',width:"5%"}}  key="week" minWidth="small" />
    <Table.HeaderCell content="Content" style = {{border: '1px solid black',width:"13%"}}   key="ep" minWidth="medium" />
    <Table.HeaderCell content="Type" style = {{border: '1px solid black',width:"5%"}}  key="ce" minWidth="small" />
    <Table.HeaderCell content="Approve" style = {{border: '1px solid black',width:"5%"}}  key="la" minWidth="small" />
  
   
    </Table.Header>
    <Table.Rows >
    {this.state.mentorf.map(info =>(                  
                      <Table.Row key="" style = {{border: '1px solid black'}} >
                      <Table.Cell content={info.fname+" "+info.lname}key="fname" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.aid} key="AID" style = {{border: '1px solid black'}}/>
                      <Table.Cell content={info.mid} key="week" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.details.content} key="1" style = {{border: '1px solid black'}} />
                      <Table.Cell content={info.message} key="2" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={<Checkbox id= {Math.floor((Math.random() * 1000) + 1)}  checked={info.checked} onChange={this.CheckOne} value={info.ID} style={{marginBottom:'10px',marginLeft:'20px'}} />} key="check" style = {{marginBottom:'100px',border: '1px solid black'}} />
                      </Table.Row>                
                    ))}
                
   </Table.Rows>
   </Table> 
   <Button text={this.state.buttoname} variant="emphasis" className={cx('button')} onClick={this.selectAll}/>
   <Button text="Approve Selected" variant="emphasis" className={cx('button')} onClick={this.ApproveSelected}/>
   <NotificationDialog
   variant={NotificationDialogVariants.ALERT}
   header ="Notification"
   isOpen={this.state.nopen}
   title="Approve Feedback(s)"
   message="Are you sure you want to approve the selected feedbacks,selected will be visible to mentors for viewing ,the ones not selected will be rejected "
   primaryAction={{
     text: 'Yes!',
     onClick: this.ApproveAxios
   }}
   secondaryAction={{
     text: 'No,I want to review once more',
     onClick: this.handleCloseNotification,
   }}
   />
            </div>

        )
  }
  else
  {
    return(
      <div>
      <h3>  No feedbacks currently available for review</h3>
      </div>
    )
  }
    }
}

export default MentorFeedback
