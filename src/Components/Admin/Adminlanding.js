import React, { Component } from 'react'
import Tabs from 'terra-tabs/lib/Tabs';
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import TabContent from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import Home from "./Count.js";
import Archived from './Archived.js'
import Mentees from './Mentees.js'
import MentorF from './MentorFeedback.js'
import Score from './ScoreLanding'
import Mentortabs from './mentortabs';
import Batch from "./Batch.js";
import logo from './cernerlogo.jpg'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Axios from 'axios'
import Notif from './NotifHub'

export default class AdminLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
       count:'0',
       active:'Home'
    };
    this.handleOnChange=this.handleOnChange.bind(this)
    this.fetchnotif=this.fetchnotif.bind(this)
    //this.clearnotif=this.clearnotif.bind(this)
  }
  handleOnChange(event, selectedKey) {
    this.setState({active:selectedKey})
   // if(selectedKey=="Notification")
    // clearInterval(this.interval);

  }
  componentDidMount(){

   this.fetchnotif()
   this.interval = setInterval(() => {
    this.fetchnotif();
  }, 5000);

  }

  fetchnotif(){
    Axios({
      method :'get',
      url: 'http://localhost:3002/shownotifsccount',
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
        console.log(response.data);
        this.setState({count:response.data.count})
     });
 // console.log("yolo")
  }






 render(){
  const HomeTab = (
    <Tabs.Pane label="Home" style={{marginLeft:'28.5%',backgroundColor:"#0092e0",border:'black',color:'white'}}key="Home">
      <TabContent> <Home/><Batch/> </TabContent>
    </Tabs.Pane>
  );

  const MentorsTab = (
    <Tabs.Pane label="Mentors" style={{backgroundColor:"#0092e0",border:'black',color:'white'}} key="Mentor">
      <TabContentTemplate> <Mentortabs/> </TabContentTemplate>
    </Tabs.Pane>
  );
  const MenteesTab = (
  <Tabs.Pane label="Mentees" style={{backgroundColor:"#0092e0",border:'black',color:'white'}} key="Mentee">
  <TabContentTemplate> <Mentees/></TabContentTemplate>
</Tabs.Pane>
  );
  
  const ScoresTab = (
    <Tabs.Pane label="Scores" style={{backgroundColor:"#0092e0",border:'black',color:'white'}}  key="Scores">
    <TabContentTemplate> <Score/></TabContentTemplate>
  </Tabs.Pane>
  );
  
  const MentorFeed= (
    <Tabs.Pane label="Mentor Feedback" style={{backgroundColor:"#0092e0",border:'black',color:'white'}} key="Feedback">
    <TabContentTemplate> <MentorF/></TabContentTemplate>
  </Tabs.Pane>
  );
  
  const ArchivedTab = (
      <Tabs.Pane label="Archived" style={{backgroundColor:"#0092e0",border:'black',color:'white'}} key="Archived">
      <TabContentTemplate> <Archived/></TabContentTemplate>
    </Tabs.Pane>
   );
   
const notifTab = (
<Tabs.Pane style={{backgroundColor:"#0092e0",border:'black',color:'white'}}
    label={ <Badge  badgeContent={this.state.count} color="secondary"><NotificationsIcon /></Badge>}
    key="Notification">
    <TabContentTemplate> <Notif needsapprovalcount={this.state.count} /></TabContentTemplate>
    </Tabs.Pane>
  );

const usernameTab = (
    <Tabs.Pane style={{backgroundColor:"#0092e0",border:'black',color:'white'}} label="My Profile" key="Username" >
    <TabContentTemplate label="Username" />
  </Tabs.Pane>
  );

  const logout = (
<Tabs.Pane style={{backgroundColor:"#0092e0",border:'black',color:'white'}}
      customDisplay={(
        <div >
       <a style={{padding:"6px 10px 5px 15px", color:"white", textDecoration:"none",marginTop:'2px'}} href="/logout">Log out</a>
        </div>
      )}
      label="Logout"
      key="Logout"
    >
    </Tabs.Pane>
    
  );
  return (
    <div style={{backgroundColor:'#DCDCDC',marginTop: '0%',}}>
 
    <Tabs style={{backgroundColor:"#0092e0"}} activeKey={this.state.active} onChange={this.handleOnChange}>  
       <img style={{float:"left",pointerEvents:"none",width:'10%'}} src={logo} alt="Logo" height='50px' width='120px'  />
       {/* <span style={{backgroundColor:"#0092e0",pointerEvents:"none",textAlign:"top", marginLeft:'15%' ,color: "white" }}><p style={{fontSize:'15px'}}> <strong>Welcome&nbsp;Admin&nbsp;!!</strong> </p> </span> */}

        {HomeTab}
        {MentorsTab}
        {MenteesTab}
        {ScoresTab}
        {MentorFeed}
        {ArchivedTab}
        {notifTab}
        {usernameTab}
        {logout}
        
      </Tabs>
     
    </div>
  );
 }

}