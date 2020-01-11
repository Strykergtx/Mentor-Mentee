import React, { Component } from 'react'
import Divider from 'terra-divider'
import Normal from './Normal.js'
import Outliers from './Outliers.js'
import OutRec from './Outrec.js'
import Tabs from 'terra-tabs/lib/Tabs';
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import Axios from 'axios'





export default class ScoreLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
        batches :[],
        selectedb:"null",
      
        
    };
    this.handleChange=this.handleChange.bind(this)  
    //this.loadData=this.loadData.bind(this)  
    this.examplerender=this.examplerender.bind(this) 
   
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

  // loadData = async (selectedb) => {

     
  //   //console.log(selectedb)
   
  // }


  examplerender(){
   
    const Nm = (
      <Tabs.Pane label="Normal Scores" key="Tab01">
        <TabContentTemplate><Normal  batch={this.state.selectedb} func={this.changeTab}/> </TabContentTemplate>
      </Tabs.Pane>
    );
     
    const Out= (
      <Tabs.Pane label="Outliers"  key="Tab02">
        <TabContentTemplate><Outliers batch={this.state.selectedb} func={this.changeTab}/></TabContentTemplate>
      </Tabs.Pane>
    );

    const Rec= (
      <Tabs.Pane label="Outlier History"  key="Tab03">
        <TabContentTemplate><OutRec batch={this.state.selectedb}/></TabContentTemplate>
      </Tabs.Pane>
    );
   if(this.state.selectedb!="null") 
    { 
      return(
      <div>
       <Tabs activekey="Tab01"  >
             {Nm}
             {Out} 
             {Rec}       
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



  handleChange(event){
   
  // alert(event.target.value)
   this.setState({selectedb:event.target.value})
   //console.log(this.state.selectedb)
  
  // this.loadData(event.target.value);
  }



    render() {
      
       
    
        
        return (
            
                 <div style={{ padding: '5px' , marginTop: '-2%'}}>
               <br />
                <p style  = {{textAlign:'justify'}} ><h1>Outliers based on Scorecard</h1>
              <h3>Filtered Batch wise and on current week of each mentee</h3>
                <Divider />  
               </p> 
               <br/>
              <h3  style={{ padding: '5px' , marginTop: '-2%',textAlign:"left"}}>Select Batch for Evaluation</h3>
        
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
