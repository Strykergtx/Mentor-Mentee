import React from 'react';
import PropTypes from 'prop-types';
import IconNotification from 'terra-icon/lib/icon/IconNotification'
import IconPerson from 'terra-icon/lib/icon/IconPerson'
import Tabs from 'terra-tabs/lib/Tabs';
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import TabContent from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import Profile from './Profile.js'
import logo from './cernerlogo.jpg'
import Goals from './Goalstabs.js';
import Performance from './Performance.js'
import Selfe from'./Selfeval.js'
import Mentorf from './MentorFeedback.js'

const propTypes = {
  tabFill: PropTypes.bool,
};

const Maintabs = (props) => {
  

  const profileTab = (
  <Tabs.Pane   style = {{marginLeft:'4.5%',backgroundColor:"#0092e0",border:'black',color:'white'}} label="Profile"  key="profileTab">
  <TabContentTemplate> <Profile/> </TabContentTemplate>
  </Tabs.Pane>
  );
  const goalsTab = (
    <Tabs.Pane style={{backgroundColor:"#0092e0",border:'black',color:'white'}}label="Goals"  key="LabelTab">
      <TabContent> <Goals/> </TabContent>
    </Tabs.Pane>
  );

  const performancesTab = (
    <Tabs.Pane style={{backgroundColor:"#0092e0",border:'black',color:'white'}}label="Performances"  key="perfTab">
      <TabContentTemplate > <Performance/> </TabContentTemplate>
    </Tabs.Pane>
  );
  
  const mentorfeed= (
    <Tabs.Pane style={{backgroundColor:"#0092e0",border:'black',color:'white'}}label="Mentor Feedback"  key="mfTab">
      <TabContentTemplate > <Mentorf/> </TabContentTemplate>
    </Tabs.Pane>
  );

  const selfeval = (
    <Tabs.Pane style={{backgroundColor:"#0092e0",border:'black',color:'white'}}label="Self"  key="sfTab">
    <TabContentTemplate> <Selfe/></TabContentTemplate>
  </Tabs.Pane>
  );
    
const notifTab = (
    <Tabs.Pane style = {{backgroundColor:"#0092e0",color:'white',border:'black' }} label="Notifcation" icon={<IconNotification /> } isIconOnly key="Notification">
      <TabContent label="Notification" />
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
          <TabContentTemplate label="Custom display" />
        </Tabs.Pane>
        
      );
    
  return (
    <div style={{backgroundColor:'#DCDCDC',marginTop: '0%',}}>
 
   <Tabs style={{backgroundColor:"#0092e0"}} defaultActiveKey="mfTab">  
      <img style={{float:"left",pointerEvents:"none",width:'10%'}} src={logo} alt="Logo" height='50px' width='120px'  />
      <span style={{pointerEvents:"none",textAlign:"top", marginLeft:'33%' ,color: "white" }}><p style={{fontSize:'15px'}}> <strong>Welcome&nbsp;Mentee&nbsp;!!</strong> </p> </span>
      
          {profileTab}
          {goalsTab}
          {performancesTab}
          {selfeval}
          {mentorfeed}
          {notifTab}
          {logout} 
      </Tabs>
      
    </div>

    
  );
};

Maintabs.propTypes = propTypes;
export default Maintabs;