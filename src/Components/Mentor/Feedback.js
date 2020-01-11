import React, { Component } from 'react'
import Axios from 'axios'
import IconFlag from 'terra-icon/lib/icon/IconFlag'
export class Feedback extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            flist:[],
            MID:'UU022335'
        };

    }

    componentDidMount(){
        Axios({
            method :'get',
            url: 'http://localhost:3002/getmyfeedback/'+this.state.MID,
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
              console.log(response)
              var list=[];
              response.data.forEach(element => {
               // console.log(element)

            //   if(element.graduated=="progress")
            //   var message="Feedback half way through DevCentre"
            //   else
            //   if(element.graduated=="yes")
            //   var message="Feedback after graduation"
            //   else
            //   var message="Not graduated"

          if(element.mentorfeedback.length<2)       
           {    
            //  if(element.mentorfeedback[0].approved=="yes")
            //  {
             
            //  list.push({aid:element.AID,lname:element.lname,fname:element.fname,details:element.mentorfeedback[0],message:"Feedback half way through DevCentre"})
              
            //  }
            }
       else { 
            //   if(element.mentorfeedback[0].approved=="yes")
            //  {
           
            //    list.push({aid:element.AID,lname:element.lname,fname:element.fname,details:element.mentorfeedback[0],message:"Feedback half way through DevCentre"})
         
            //    } 
             if(element.mentorfeedback[1].approved=="yes")
             {
             
            list.push({aid:element.AID,lname:element.lname,fname:element.fname,details:element.mentorfeedback[1],message:"Feedback after graduation"})
             }
            }
              });//END OF FOR EACH
  
      
              this.setState({flist:list})
            console.log(this.state.flist)
              


           });  
    }
    render() {
      if(this.state.flist.length>0)
        {return (
            <div>
          {this.state.flist.map(info =>(                  
                          <div className  style = {{border: '0.2px solid', borderRadius: '8px', marginTop: '3%', backgroundColor: '#D9D9D9'}} onClick = {this.handleOpenModal}>
            
                          <p style = {{textAlign:'justify'}}><IconFlag style = {{float: 'left', marginLeft: '0.5%'}}/> <b style = {{marginLeft: '1%'}}>{info.fname} {info.lname} posted</b>
                          <span style = {{float: 'right', marginRight: '0.8%'}}><b> AID:{info.aid}</b></span> </p>
                          <hr style = {{backgroundColor: 'black'}}/>
                          
                          <p style = {{textAlign: 'left', marginLeft: '0.8%'}}> {info.details.content} </p>
                          <p style = {{textAlign: 'right' ,marginRight: '0.8%'}}> {info.message}</p>
              
                      </div>   
                    ))}
            </div>
        

        )
          }
          else
          {
            return(<div>No feedback exists currently</div>)
          }

    }
}

export default Feedback
