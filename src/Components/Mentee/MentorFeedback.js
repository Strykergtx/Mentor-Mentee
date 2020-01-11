import React, { Component } from 'react'
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
import NotificationDialog, { NotificationDialogVariants } from 'terra-notification-dialog';
import Axios from 'axios'

const cx = classNames.bind(styles);
export class MentorFeedback extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            type:'null',
            aid:'RR073390' ,
            message:'',
            content:'' ,
            nopen:false ,
            axios:false
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.load=this.load.bind(this)
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
        this.handleOpenNotification=this.handleOpenNotification.bind(this)
      }
     handleOpenNotification(){
        this.setState({nopen:true})

     }
       
     handleCloseNotification(){
        this.setState({nopen:false})
       // console.log(this.state.type)
        this.load()
        
     }


      handleChange(event) {
          this.setState({content:event.target.value});
         // console.log(this.state.content)

    }
       handleSubmit(){

      
      
       console.log(this.state.content)
       console.log(this.state.type)
       if(this.state.axios==true)   
       {  Axios.post('http://localhost:3002/fxmentorfeedback', {   
                      aid:this.state.aid,
                      text:this.state.content
          }).then(this.setState({axios:false})
          
          )     
        } 
        this.handleOpenNotification()
    }


    componentDidMount()
    {
        
     this.load()
    }
    load(){
        Axios({
            method :'get',
            url: 'http://localhost:3002/checkfeedbackavail/'+this.state.aid,
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
              console.log(response)
             if(response.data.mentorfeedback.length==0)
             {
             
             if(response.data.scorecard.length>=3)
             {
                 this.setState({message:"Give your first feedback to your Mentor ,occurs at halfway through DevCentre"})
                 this.setState({type:'new'})
                 this.setState({axios:true})
             }
             else
             {this.setState({message:"Feedback is not available right now for you ,only after 3rd week it will be available"})
              this.setState({type:'na'})
            }
             }
             else if(response.data.mentorfeedback.length==1)
             { 
               if(response.data.graduated=="yes")  
                { this.setState({message:"Congratulations on graduating ,please fill the feedback for your Mentor"})
                 this.setState({type:'final'})
                 this.setState({axios:true})
             }
             else
             {
                this.setState({message:"Wait for graduation to submit feedback"})
                 this.setState({type:'na'})
             }
             }
             else
             {
               this.setState({message:"All feedback is already submitted"})
               this.setState({type:'na'})
             }
           });  

    }
    render() {
     if(this.state.type!='na')
       { return (
            <div>
                <h1>Give Feedback to your Mentor Here</h1>
                
                <h3> {this.state.message}</h3>
                <br/>
                <br/>
                <textarea value = {this.state.content} onChange={this.handleChange} placeholder="Write your feedback here" style={{width:"100%", maxWidth:"100%",marginTop:"5px", height:"60px", borderRadius:"2px"}}/>
                <Button text="Submit Feedback" variant="emphasis" className={cx('button')} onClick={this.handleSubmit}/>
                <NotificationDialog
          variant={NotificationDialogVariants.SUCCESS}
          header ="Notification"
          isOpen={this.state.nopen}
          title="Success"
          message="Feedback is Submitted"
          primaryAction={{
            text: 'Okay',
            onClick: this.handleCloseNotification
          }}
          />  
            </div>
        )
       }
     else
     {
       return(
           <div>
               <h1>Give feedback to your Mentor here</h1>
           <h3> {this.state.message}  </h3> 
           </div>
       )  
     }  
    }
}

export default MentorFeedback
