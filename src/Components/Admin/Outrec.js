import React, { Component } from 'react'
import Axios from 'axios'
import Table from 'terra-table'
export class Outrec extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            out:[],
            batch:this.props.batch 
                
        };
        this.load=this.load.bind(this)
    }

   load(batch){
    this.setState({batch:batch})
       this.setState({out:[]})
    Axios({
        method :'get',
        url: 'http://localhost:3002/getallout/'+batch,
        config: {headers : {'Content-Type' : 'application/json'}}
      }).then( response => {
         
         console.log(response)
         for(var i = 0; i<response.data.length; i++){
            this.setState({out:[...this.state.out,response.data[i]]  });
          }
       });
    }

    componentDidMount(){
      this.load(this.state.batch)
      }

    render() {
        if(this.props.batch!=this.state.batch)
        { 
          
           //console.log("yolo")
          this.load(this.props.batch)
        }
    if(this.state.out.length>0)   
      { return (
            <div>
                <Table isPadded={true} >
    <Table.Header>
    <Table.HeaderCell content="AID" style = {{border: '1px solid black',width:'5%'}}  key="AID"  />
    <Table.HeaderCell content="MID" style = {{border: '1px solid black',width:'5%'}}  key="MID" />
    <Table.HeaderCell content="Week" style = {{border: '1px solid black',width:'5%',align:'center'}}  key="week"  />
    <Table.HeaderCell content="Professionalism" style = {{border: '1px solid black',width:'5%'}}   key="ep"  />
    <Table.HeaderCell content="Communication" style = {{border: '1px solid black',width:'5%'}}  key="ce" />
    <Table.HeaderCell content="Learning Agility" style = {{border: '1px solid black',width:'5%'}}  key="la"  />
    <Table.HeaderCell content="Makes and keeps Commitments" style = {{border: '1px solid black',width:'5%'}} key="mk"/>
    <Table.HeaderCell content="Quality of Work" style = {{border: '1px solid black',width:'6%'}} key="wq"/>
    <Table.HeaderCell content="Technical Competency"  style = {{border: '1px solid black',width:'5%'}}key="tc"  />
    <Table.HeaderCell content="feedback"  style = {{border: '1px solid black',width:'15%'}}key="fd" />
    </Table.Header>
    <Table.Rows >
    {this.state.out.map(info =>(
                    
                      
                      <Table.Row key="row" style = {{border: '1px solid black'}} >
                      <Table.Cell content={info.AID} key="fname" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.MID} key="AID" style = {{border: '1px solid black'}}/>
                      <Table.Cell content={info.week} key="week" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.EP} key="1" style = {{border: '1px solid black'}} />
                      <Table.Cell content={info.CE} key="2" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.LA} key="3" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.MK} key="4" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.WQ} key="5" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.TC} key="6" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.feedback} key="7" style = {{border: '1px solid black'}} />
                      </Table.Row> 
                     
                      
                         
                    ))}
                
   </Table.Rows>
   </Table> 
            </div>
        )
    }
    else
    {

      return(

        <div>
          <br/>
          <h3>Looks like there is no Historical Record</h3>
        </div>
      )
    }
    }
}

export default Outrec
