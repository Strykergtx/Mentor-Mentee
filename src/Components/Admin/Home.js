import React, { Component } from 'react'
import Axios from 'axios';
//var nogoals = false;// if no goals, request goals.
//var date1;
//var date2;
////var month1;
//var month2;
//var weekcount;
//var mentorfname, mentorlname, menteename;
const aid = "SS073166"

export default class Home extends Component {
    constructor(props) {
        super(props);
    
       
    this.state = {
        details:[]
      };
      }
    
      componentDidMount=()=> { //only called once! unlike  componentWillMount
      
          //Oncomponentmount, send a request to backend to get the goals from the database!!
          //update the goals array state.
          //var {changeState} = this.props
          Axios({
            method :'get',
            url: 'http://localhost:3002/getScores/'+aid,
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
              console.log(response);
            for(var i = 0; i<response.data.length; i++){
            this.setState({details:[...this.state.details,response.data[i]]  });
            }
          });
        }

    render() {

        
        return (
            
              <div>
            
                
            
                
                
              </div>
        )
    }
}

    
