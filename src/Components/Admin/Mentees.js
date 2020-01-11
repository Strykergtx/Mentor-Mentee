import React, { Component } from 'react';
import SearchFieldExampleTemplate from 'terra-search-field/lib/terra-dev-site/doc/example/SearchFieldExampleTemplate';
import Divider from 'terra-divider';
import Axios from 'axios';
import Tabs from 'terra-tabs/lib/Tabs';
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import Assigned from './AssignedMentees.js'
import Unm from './UNM.js'
export default class Mentees extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            menteedetails:[],
            batches :[],
            selectedb:"null",
          
        };
        this.examplerender=this.examplerender.bind(this) 
          this.handleChange=this.handleChange.bind(this) 
   
      }

      handleChange(event){
   
        // alert(event.target.value)
         this.setState({selectedb:event.target.value})
         //console.log(this.state.selectedb)
        
        // this.loadData(event.target.value);
        }
      

    componentDidMount(){
      
      

          Axios({
            method :'get',
            url: 'http://localhost:3002/getdistinctbatches',
            config: {headers : {'Content-Type' : 'application/json'}}
          }).then( response => {
             
             
              for(var i = 0; i<response.data.length; i++){
                this.setState({batches:[...this.state.batches,response.data[i]]  });
              }
             console.log(this.state.batches)
             console.log(response)
            // console.log(this.state.selectedb)
           });
          }

          examplerender(){
   
            const AM = (
              <Tabs.Pane label="Assigned Mentees" key="Tab01">
                <TabContentTemplate><Assigned  batch={this.state.selectedb}/> </TabContentTemplate>
              </Tabs.Pane>
            );
             
            const UM= (
              <Tabs.Pane label="Unassigned Mentees"  key="Tab02">
                <TabContentTemplate><Unm batch={this.state.selectedb}/></TabContentTemplate>
              </Tabs.Pane>
            );
        
           if(this.state.selectedb!="null") 
            { 
              return(
              <div>
               <Tabs activekey="Tab01"  >
                     {AM}
                     {UM} 
                           
                </Tabs>
              </div>
            );
            }
            else {
            return(<div>
            <h3>  Please Choose a batch </h3>
            </div>)
            }
          }
          
  

    render() {
        return (
          <div style={{overflow: 'auto'}}>
          <br />
          <p style  = {{textAlign:'justify'}} ><h1>Select Batch</h1></p> <p style = {{textAlign:'right', marginTop:'-8%'}}> <SearchFieldExampleTemplate
        placeholder="Search Here"
        
        searchDelay = '100000000000'
        /></p>
        <br/>
        <br/>
        <Divider />
        <br/>      

        
        <select name="batches" style={{padding:"5px",width:'15%'}} onChange={this.handleChange}  >
        <option value="start" selected disabled hidden>Choose here</option>
        {this.state.batches.map((e,key) => {
        return <option key={key} value={e}>{e}</option>;
        })}
        </select>
        {this.examplerender()}

               
              
              </div>
              
            )
        }
    }
    
    
