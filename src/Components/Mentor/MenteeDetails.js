import React, { Component } from "react";
import Layout from 'terra-layout';
import Axios from 'axios';
import ActionHeader from "terra-action-header/lib/ActionHeader";
import Table from "terra-table";
import Avatar from 'terra-avatar/lib/index';
import History from "./TableHeader";
import GiveScore from "./Scoreinput"
import Tabs from 'terra-tabs/lib/Tabs';
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import ShowNorm from './ShowNorm'
export default class Givedetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details:[],
      EP:'',
      CE:'',
      LA:'',
      MK:'',
      WQ:'',
      TC:'',
      approved:'NA',
      active:"History"
     
    };
  this.load=this.load.bind(this)
  this.refresh=this.refresh.bind(this)
  this.handleOnChange=this.handleOnChange.bind(this)
  }
componentDidMount(){ 
  
    this.load()
  }

refresh()
{

  this.load()
 
}
handleOnChange(event, selectedKey) {
  this.setState({active:selectedKey})
  }


   load()
   {
       this.setState({active:"History"})
    var aid=this.props.match.params.menteeaid;
    Axios({
      method :'get',
      url: 'http://localhost:3002/getmentee/'+ aid,
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
      console.log(response);
     var i=0
       response.data.scorecard.forEach(ele => { 
        ele.weekno=++i;
       });
      console.log(response.data.scorecard)
      this.setState({details:response.data});
      console.log(this.state.details)
      //header will show the last record of score that exists in database , approved or not submitted by mentor
      if(response.data.scorecard.length==0)
      {
      this.setState({EP:"NA",CE:"NA",LA:"NA",MK:"NA",WQ:"NA",TC:"NA"})
      }
      else
      { var i=response.data.scorecard.length
        i=i-1
      this.setState({
      EP:response.data.scorecard[i].EP,
      CE:response.data.scorecard[i].CE,
      LA:response.data.scorecard[i].LA,
      MK:response.data.scorecard[i].MK,
      WQ:response.data.scorecard[i].WQ,
      TC:response.data.scorecard[i].TC,
      })
        if(response.data.scorecard[i].approved=="true")
        this.setState({approved:"Done"})
        else
        this.setState({approved:"Pending"})
      }
    });
   }
  
    render() {
       // console.log(this.state.details)
            const history = (
              <Tabs.Pane label="History" key="History" >
                <TabContentTemplate>
                    <History aid= {this.props.match.params.menteeaid}/>
                </TabContentTemplate>
              </Tabs.Pane>
            );
            const givescore = (
              <Tabs.Pane label="Give Scores" key="Givescore">
                <TabContentTemplate>
             <GiveScore scorecard={this.state.details.scorecard} aid={this.state.details.AID} refreshparent={this.refresh}/>
                </TabContentTemplate>
              </Tabs.Pane>
            );

            const shownorm = (
              <Tabs.Pane label="Normalized History" key="history">
                <TabContentTemplate>
             <ShowNorm aid={this.state.details.AID}/>
                </TabContentTemplate>
              </Tabs.Pane>
            );
        const CustomCell = props => (
            <div>
              <h3>{props.text}</h3>
              {props.subtext ? <h4 style={{ color: '#656565' }}>{props.subtext}</h4> : null}
            </div>
          );
        return (
          <div> 
          <br />
                
        <ActionHeader 
          title={
            <div>
              <Table isStriped={false}>
                <Table.Rows>
                  <Table.Row
                    key="PERSON_0"
                    style={{
                    }}
                  >
                    <Table.Cell
                      content={
                      <Table isStriped={false} >
                      <Table.Rows >
                      <Table.Row style={{border:"0px"}}>
                      <Table.Cell content={<Avatar alt="image displays" image={"https://www.w3schools.com/howto/img_avatar.png"} color="neutral" size="2em" />} rowspan="4" style={{textAlign:"center",border:"0"}}>
                      </Table.Cell>
                        <Table.Cell content={this.state.details.fname+" "+this.state.details.lname} style={{border:"0"}}></Table.Cell>
                        </Table.Row>
                        <Table.Row style={{border:"0"}}>
                        <Table.Cell content={this.state.details.batch} style={{border:"0"}}></Table.Cell>
                        </Table.Row>
                        <Table.Row style={{border:"0"}}>
                        <Table.Cell content={this.state.details.email} style={{border:"0"}}></Table.Cell>
                        </Table.Row>
                        
                        <Table.Row style={{border:"0"}}>
                        <Table.Cell content={"Scorecard Approval : "+this.state.approved} style={{border:"0"}}></Table.Cell>
                        </Table.Row>
                        </Table.Rows>
                    </Table> }
                      key="col1"
                      style={{width:"30px"}}
                    />
                        <Table.Cell
                          content={<CustomCell text={this.state.EP} subtext="EP" />}
                          key="col2"
                          style={{
                            fontSize:"16px",
                            textAlign: "center",
                            fontWeight:"bold"
                          }}
                        />
                        <Table.Cell
                          content={<CustomCell text={this.state.CE} subtext="CE" />}
                          key="col3"
                          style={{
                            fontSize:"16px",
                            textAlign: "center",
                            fontWeight:"bold"
                          }}
                        />
                        <Table.Cell
                          content={<CustomCell text={this.state.LA} subtext="LA" />}
                          key="col4"
                          style={{
                            fontSize:"16px",
                            textAlign: "center",
                            fontWeight:"bold"
                          }}
                        />
                        <Table.Cell
                          content={<CustomCell text={this.state.MK} subtext="MK" />}
                          key="col4"
                          style={{
                            fontSize:"16px",
                            textAlign: "center",
                            fontWeight:"bold"
                          }}
                        />
                        <Table.Cell
                          content={<CustomCell text={this.state.WQ} subtext="WQ" />}
                          key="col4"
                          style={{
                            fontSize:"16px",
                            textAlign: "center",
                            fontWeight:"bold"
                          }}
                        />
                        <Table.Cell
                          content={<CustomCell text={this.state.TC} subtext="TC" />}
                          key="col4"
                          style={{
                            fontSize:"16px",
                            textAlign: "center",
                            fontWeight:"bold"
                          }}
                        />
                  </Table.Row>
                </Table.Rows>
              </Table>
            </div>
          }
        />
        <hr/>
        <Tabs activeKey={this.state.active} onChange={this.handleOnChange} style={{padding:"10px"}}>
        {history}
        {givescore}
        {shownorm}
      </Tabs>
          </div>
        );
      }
    }