import React from 'react';
import PropTypes from 'prop-types';
import IconNotification from 'terra-icon/lib/icon/IconNotification'
/* eslint-disable import/no-unresolved, import/extensions */
import Tabs from 'terra-tabs/lib/Tabs';
import TabContent from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import Goals from './goals.js';
import {Link, } from "react-router-dom";
import Menteecard from './Menteecard.js';
import Feedback from './Feedback.js'
import logo from './cernerlogo.jpg'
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
/* eslint-enable import/no-unresolved, import/extensions */
const AID = "UU022335" 

const propTypes = {
  tabFill: PropTypes.bool,
};
const Maintabs = (props) => {
  const Mymentees = (
    <Tabs.Pane style = {{marginLeft:'23.5%',backgroundColor:"#0092e0",border:'black',color:'white'}}label="My Mentees" key="menteeTab" >
      <TabContent> <Goals AID={AID}/> <Menteecard MID={AID}/></TabContent>
    </Tabs.Pane>
  );
  const myfeed = (
    <Tabs.Pane style = {{backgroundColor:"#0092e0",border:'black',color:'white'}}label="My Feedback" key="feedTab" >
      <TabContent> <Feedback/> </TabContent>
    </Tabs.Pane>
  );
const notifTab = (
    <Tabs.Pane style = {{backgroundColor:"#0092e0",border:'black',color:'white'}} label="Notifcation" icon={<IconNotification />} isIconOnly key="Notification">
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
 <Tabs style={{backgroundColor:"#0092e0"}} defaultActiveKey="menteeTab">  
    <img style={{float:"left",pointerEvents:"none",width:'10%'}} src={logo} alt="Logo" height='50px' width='120px'  />
    <span style={{pointerEvents:"none",textAlign:"top", marginLeft:'33%' ,color: "white" }}><p style={{fontSize:'15px'}}> <strong>Welcome&nbsp;Mentor&nbsp;!!</strong> </p> </span>
        {Mymentees}
        {myfeed}
        {notifTab}
        {logout}
      </Tabs>
    </div>
  );
};

Maintabs.propTypes = propTypes;
export default Maintabs;