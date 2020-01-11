import React, { Component } from 'react'
import Table from "terra-table";
import ActionHeader from "terra-action-header/lib/ActionHeader";
import Axios from 'axios'
export class Normalize extends Component {
    constructor(props) {
        super(props);
        this.state =  
          {EP:"",
          CE:"",
          LA:"",
          MK:"",
          WQ:"",
          TC:"",
          value:"",
          addoutlock:false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {

        if((event.target.name) === "EP"){
        // alert(event.target.value)
          this.setState({EP : event.target.value});
        }else if((event.target.name) === "CE"){
         // alert(event.target.value)
          this.setState({CE : event.target.value});
        }else if((event.target.name) === "LA"){
          this.setState({LA : event.target.value});
        }else if((event.target.name) === "MK"){
          this.setState({MK : event.target.value});
        }else if((event.target.name) === "WQ"){
          this.setState({WQ : event.target.value});
        }else if((event.target.name) === "TC"){
          this.setState({TC : event.target.value});
        }else{
          //alert(event.target.value)
          this.setState({value:event.target.value});
        }
    }
    handleSubmit(event) {
       // alert('Scores Normalized');

        Axios.post('http://localhost:3002/normalize', {
          AID:this.props.content.AID,
          week:this.props.content.currweek,
          EP:this.state.EP,
          CE:this.state.CE,
          LA:this.state.LA,
          MK:this.state.MK,
          WQ:this.state.WQ,
          TC:this.state.TC,
          feedback:this.state.value
        }).then(response=>{this.props.refresh()})
     
     if(this.state.addoutlock==true)   
    {  Axios.post('http://localhost:3002/addoutlier', {
          AID:this.props.content.AID, 
          MID:this.props.content.MID,
          batch:this.props.B,
          week:(this.props.content.currweek+1),
          date:this.props.content.scorecard[this.props.content.currweek].week,
          EP:this.props.content.scorecard[this.props.content.currweek].EP,
          CE:this.props.content.scorecard[this.props.content.currweek].CE,
          LA:this.props.content.scorecard[this.props.content.currweek].LA,
          MK:this.props.content.scorecard[this.props.content.currweek].MK,
          WQ:this.props.content.scorecard[this.props.content.currweek].WQ,
          TC:this.props.content.scorecard[this.props.content.currweek].TC,
          feedback:this.props.content.scorecard[this.props.content.currweek].feedback
      }).then(this.setState({addoutlock:false}))
    }
        event.preventDefault();
        
      }
    
    componentDidMount()
    {
      this.setState({addoutlock:true})
    }
    render() {
        console.log(this.props)
        return (
            <div>
        <ActionHeader
          title={
            <div>
              <h2
              >
               Current Score Assigned By Mentor for Week {this.props.content.currweek+1}
              </h2>
              <h3>Mentor ID: {this.props.content.MID}</h3>
              
              <Table isStriped={false} style={{ marginBottom: "-1%" }}>
                <Table.Rows
                  style={{ border: "2px solid #f4f4f4", marginBottom: "-1%" }}
                >
                  <Table.Row key="PERSON_1" style={{ marginTop: "-1%" }}>
                    <Table.Cell
                      content="Professionalism"
                      key="EP"
                      
                      style={{
                        textAlign: "center",
                       
                        width:"15%",    
                        fontWeight: "bold",
                        paddingBottom: "0em"
                      }}
                    />
                    <Table.Cell
                      content="Communication"
                      key="CE"
                      style={{
                        textAlign: "center",   
                        width:"15%", 
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Learing Agility"
                      key="LA"
                      style={{
                        textAlign: "center", 
                        width:"15%", 
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Makes and Keeps Commitments"
                      key="MK"
                      style={{
                        textAlign: "center", 
                        width:"15%", 
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Quality Work Products"
                      key="WQ"
                      style={{
                        textAlign: "center",
                        width:"15%",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content="Technical Competency"
                      key="TC"
                      style={{
                        textAlign: "center",
                        width:"15%",
                        fontWeight: "bold"
                      }}
                    />
                  </Table.Row>
                  <Table.Row
                    key="PERSON_0"
                    style={{
                      borderBottom: "1px solid #f4f4f4"
                    }}
                  >
                    <Table.Cell
                      
                      content={this.props.content.scorecard[this.props.content.currweek].EP}
                      key="col1"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.props.content.scorecard[this.props.content.currweek].CE}
                      key="col2"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.props.content.scorecard[this.props.content.currweek].LA}
                      key="col3"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.props.content.scorecard[this.props.content.currweek].MK}
                      key="col4"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                    <Table.Cell
                      content={this.props.content.scorecard[this.props.content.currweek].WQ}
                      key="col5"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                     <Table.Cell
                      content={this.props.content.scorecard[this.props.content.currweek].TC}
                      key="col5"
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    />
                  </Table.Row>
                </Table.Rows>
              </Table>
            </div>
          }
        />
        <h2>Normalize here </h2>
        <form onSubmit={this.handleSubmit}>
              <Table isStriped={false}>
                    <Table.Header>
                      <Table.HeaderCell content="Exhibits Professionalism" key="EP" minWidth="small" />
                      <Table.HeaderCell content="Communicates Effectively" key="CE" minWidth="small" />
                      <Table.HeaderCell content="Learning Agility" key="LA" minWidth="small" />
                      <Table.HeaderCell content="Makes and Keeps Commitments" key="MK" minWidth="small" />
                      <Table.HeaderCell content="Quality Work Products" key="QW" minWidth="small" />
                      <Table.HeaderCell content="Technical Competency" key="TC" minWidth="small" />
                    </Table.Header>
                    <Table.Rows>
                      <Table.Row key="PERSON_0">
                      <Table.Cell content={
                        <select  name="EP" id="EP" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                          <option value="start" selected disabled hidden>Choose </option>
                          <option value="0" >0</option>
                          <option value="-">-</option>
                          <option value="+">+</option>
                          <option value="++">++</option>
                        </select>
                        } key="EP" />
                        <Table.Cell content={
                        <select name="CE" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                            <option value="start" selected disabled hidden>Choose </option>
                            <option value="0" >0</option>
                            <option value="-">-</option>
                            <option value="+">+</option>
                            <option value="++">++</option>
                        </select>
                        } key="CE" />
                        <Table.Cell content={
                          <select  name="LA" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                          <option value="start" selected disabled hidden>Choose </option>
                          <option value="0" >0</option>
                          <option value="-">-</option>
                          <option value="+">+</option>
                          <option value="++">++</option>
                        </select>
                        } key="LA" />
                        <Table.Cell content={
                          <select  name="MK" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                           <option value="start" selected disabled hidden>Choose</option>
                          <option value="0" >0</option>
                          <option value="-">-</option>
                          <option value="+">+</option>
                          <option value="++">++</option>
                        </select>
                        } key="MK" />
                        <Table.Cell content={
                          <select  name="WQ" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                          <option value="start" selected disabled hidden>Choose </option>
                          <option value="0" >0</option>
                          <option value="-">-</option>
                          <option value="+">+</option>
                          <option value="++">++</option>
                        </select>
                        } key="WQ" />
                        <Table.Cell content={
                          <select  name="TC" onChange={this.handleChange} style={{border:"none", marginLeft:"30%"}}>
                          <option value="start" selected disabled hidden>Choose </option>
                          <option value="0" >0</option>
                          <option value="-">-</option>
                          <option value="+">+</option>
                          <option value="++">++</option>
                        </select>
                        } key="TC" />
                      </Table.Row>
                    </Table.Rows>
              </Table>
              <textarea value = {this.state.value} onChange={this.handleChange} placeholder="Add feedback . . ." style={{width:"100%", maxWidth:"100%",marginTop:"5px", height:"60px", borderRadius:"2px"}}/>
              
              <input type="submit" value="Submit"  style={{float:"right", marginTop:"4px", backgroundColor:"#4CAF50", border:"1px solid #9de56f",borderRadius:"2px",color:"white", cursor:"pointer", width:"100px", height:"35px"}}/>
          </form>
          </div>
        )
    }
}

export default Normalize
