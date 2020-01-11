import React, { Component } from 'react'
import Divider from 'terra-divider';
import GiveGoals from './GiveGoals.js';
import SearchFieldExampleTemplate from 'terra-search-field/lib/terra-dev-site/doc/example/SearchFieldExampleTemplate';
//for now keep a global
import Axios from 'axios';
import  loader from './loading.gif'


export default class Completed extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          completedgoals : [],
          completedgoalscount : 0,
          initializing : 1
        };
      }
      componentDidMount = () => {
        Axios({
          method :'get',
          url: 'http://localhost:3002/getallgoals/'+ 'SS073166',
          config: {headers : {'Content-Type' : 'application/json'}}
        }).then( response => {
          console.log(response)
          var today = new Date();
          for(var i = 0; i<response.data.length; i++){
            if(response.data[i].completed) {
              this.setState({completedgoals: [...this.state.completedgoals, response.data[i]] });
            }
          }
        
        
        //Oncomponentmount, send a request to backend to get the goals from the database!!
        //update the goals array state.
        this.setState({completedgoalscount: this.state.completedgoals.length})
        this.setState({initializing : 0});
    })
      }
  
    getgoal = (searchtext) => {
        alert("You searched for " + searchtext);
        //send a get request to get the goal searched for and return it
    }
    
    
    render() {
        return (
            <div>
        <br />
        <p style  = {{textAlign:'justify'}} ><h1>{this.state.completedgoalscount} goals have been completed</h1></p> <p style = {{textAlign:'right', marginTop:'-6%'}}> <SearchFieldExampleTemplate
    placeholder="Search Here"
    onSearch = {this.getgoal}
    searchDelay = '100000000000'
  /></p>
  
        
        {this.state.initializing? <img src={loader} alt="loading..." />
         : <div>
           {this.state.completedgoals.map(goal => (
                      
                      <GiveGoals
                      name = {goal.goalstitle}
                      description = {goal.goalsdescription}
                      month = {goal.monthname}
                      date = {goal.date_with_suffix}
                      year = {goal.year}
                      duesince = {goal.duesince}
                        type = {2} // type for completed
                      />
                      
                    ))}
                    <br/>
                    
                   
                  </div>}
            </div>
        )
    }
}
