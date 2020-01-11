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



export default class Goalsnew extends Component {
    
  componentDidMount(){

    Axios({
        method :'get',
        url: 'http://localhost:3002/getgoaldetails',
        config: {headers : {'Content-Type' : 'application/json'}}
      }).then( response => {
          console.log(response);
         
          console.log(response.data.duedate);
        
          
      });





  }  





    render() {
        return (
            <div>
                
            </div>
        )
    }
}
