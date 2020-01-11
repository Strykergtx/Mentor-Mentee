import React, { Component } from 'react'
import ActionHeader from 'terra-action-header/lib/ActionHeader';
import NoGoals from './NoGoals.js'
import Divider from 'terra-divider';
import IconFlag from 'terra-icon/lib/icon/IconFlag'
import GiveGoals from './GiveGoals.js';
import { reject } from 'q';
import { loadPartialConfig } from '@babel/core';
import  loader from './loading.gif'
import Axios from 'axios';
//for now keep a global
var nogoals = false;// if no goals, request goals.
var date1;
var date2;
var month1;
var month2;
var weekcount;
var mentorfname, mentorlname, menteename;
const aid = "SS073166"
var menteenamelast
export default class Goals extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          pendinggoals: [],
          currentweekgoals: [],
          pendingcount : 0,
          activecount : 0,
          initializing : 0,
          week : 0,
          date1: ''
        };
      }
      // waittoCheck= () => {
      //   return(1)
      
      // }
        
      componentDidMount = () => { //only called once! unlike  componentWillMount
        
        //Oncomponentmount, send a request to backend to get the goals from the database!!
        //update the goals array state.
//         var {changeState} = this.props
//         Axios({
//           method :'get',
//           url: 'http://localhost:3002/getweekdate/'+ aid,
//           config: {headers : {'Content-Type' : 'application/json'}}
//         }).then( response => {
//           console.log(response);
//           date1  = response.data.result[2];
//           date2 = response.data.result[3];
//           month1 = response.data.result[0];
//           month2 = response.data.result[1];
//           weekcount = response.data.count;
//           mentorfname = response.data.mentorfname;
//           mentorlname = response.data.mentorlname;
//           menteename = response.data.username;
//           menteenamelast =response.data.usernamelast;
//           this.setState({date1: response.data[0]}) //just to rerender~
        
//           Axios({
//             method :'get',
//             url: 'http://localhost:3002/getallgoals/' + aid,
//             config: {headers : {'Content-Type' : 'application/json'}}
//           }).then( response => {
//             console.log("this is srikar's code" + response.data[0])
//             var today = new Date();
//             console.log(response);
//             for(var i = 0; i<response.data.length; i++){
//               var duedate = new Date(response.data[i].duedate);
//               if((!response.data[i].completed) && duedate<today){
               
//                 this.setState({ pendinggoals: [...this.state.pendinggoals, response.data[i]] });

//                 const diffTime = Math.abs(today.getTime() - duedate.getTime());
//                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//                 response.data[i].duesince = diffDays;
                
                
//               }
//               else if(duedate>today && (!response.data[i].completed) )
//               {console.log("yellow")
//                 this.setState({ currentweekgoals: [...this.state.currentweekgoals, response.data[i]] });
//                }
//  ///this is console testing

// console.log(today) 
// console.log(duedate)

// ///////


//             }
//             ///
//             console.log(this.state.currentweekgoals.length);
//             console.log(this.state.pendinggoals.length)
//            ///
//             this.setState(({pendingcount: this.state.pendinggoals.length}))
//             if(this.state.currentweekgoals.length == 0)
//               nogoals = true;
//             this.setState({activecount:0}); 
//             //make sure it rerenders
//            // this.setState({initializing : 0});
//           });
          
        
//     });
    


}
      
    render() {
    //   if(this.state.initializing)
    //     return (<img src={loader} alt="loading..." />)
    //   else{
    //     return (
    //         <div>

              
    //     <br />
    //     <ActionHeader
    //   title={ <div><p style = {{textAlign: 'center'}}> <b >{menteename} {menteenamelast}, welcome to week {weekcount}</b>  &nbsp; &nbsp; &nbsp; &nbsp;  {date1} {month1} 2019  to {date2} {month2} 2019 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    //   Mentor: <i><b>{mentorlname}, {mentorfname}</b> </i></p>
    //   </div> }
    // />  
    
    //     {nogoals? <div><NoGoals/>
    //                 <br/>
    //                 <h2 style = {{textAlign:'left'}}> Pending ({this.state.pendingcount})</h2>
    //                 <Divider />
                    
    //                 {this.state.pendinggoals.map(goal => (
                      
    //                   <GiveGoals
    //                     name = {goal.goalstitle}
    //                     description = {goal.goalsdescription}
    //                     month = {goal.monthname}
    //                     date = {goal.date_with_suffix}
    //                     year = {goal.year}
    //                     duesince = {goal.duesince}
    //                     completed = {goal.completed}
    //                     type = {0} // for pending
    //                     mentorlname = {mentorlname}
    //                     mentorfname = {mentorfname}
    //                   />
                      
    //                 ))} 
                    
    //             </div>
         
    //      : <div>
    //        <h2 style = {{textAlign:'left'}}> Active ({this.state.currentweekgoals.length})</h2>
    //        {this.state.currentweekgoals.map(goal => (
                      
    //                   <GiveGoals
    //                     name = {goal.goalstitle}
    //                     description = {goal.goalsdescription}
    //                     duedate = {goal.duedate}
    //                     month = {goal.monthname}
    //                     date = {goal.date_with_suffix}
    //                     year = {goal.year}
    //                     type = {1}
    //                   />
                      
    //                 ))}
    //                 <h2 style = {{textAlign:'left'}}> Pending ({this.state.pendingcount})</h2>
    //                 <Divider />
                    
    //                 {this.state.pendinggoals.map(goal => (
                      
    //                   <GiveGoals
    //                     name = {goal.goalstitle}
    //                     description = {goal.goalsdescription}
    //                     duedate = {goal.duedate}
    //                     month = {goal.monthname}
    //                     date = {goal.date_with_suffix}
    //                     year = {goal.year}
    //                     duesince = {goal.duesince}
    //                     type = {0} //0 for assigned
                        
    //                   />
                      
    //                 ))}
                    
    //               </div>}
                  
    //         </div>
    //     )
    // }
    return(

      <div><h1>Goals</h1></div>
    )
  }
}

