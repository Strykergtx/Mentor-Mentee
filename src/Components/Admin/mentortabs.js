import React, { Component } from 'react'
import PropTypes from 'prop-types';
/* eslint-disable import/no-unresolved, import/extensions */
import Tabs from 'terra-tabs/lib/Tabs';
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import TabContent from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import SearchFieldExampleTemplate from 'terra-search-field/lib/terra-dev-site/doc/example/SearchFieldExampleTemplate';
import Divider from 'terra-divider';
//import Goals from './Goals.js'
//import Completed from './Completed.js';
/* eslint-enable import/no-unresolved, import/extensions */
//import IconGoals from 'terra-icon/lib/icon/IconAnalytics'
//import IconCompleted from 'terra-icon/lib/icon/IconSuccess'
import ML from './AssignedMentors'
import UL from './UnassignedMentors'
const propTypes = {
  tabFill: PropTypes.bool,
};
const assignedTab = (
  <Tabs.Pane label="Assigned"    key="assn">
    <TabContentTemplate label="Assigned"> <ML/></TabContentTemplate>
  </Tabs.Pane>
);
const unassignedTab = (
  <Tabs.Pane label="Unassigned"   key="uassn">
    <TabContent label="Unassigned"> <UL/> </TabContent>
  </Tabs.Pane>
);


export default class Goalstabs extends Component { 
  constructor(props) {
    super(props);
    

  }
    
  
  
  render() {
  return(
    <div style={{ padding: '10px' , marginTop: '1%'}}>
        <br />
            <p style  = {{textAlign:'justify'}} ><h1>Mentors List</h1></p> <p style = {{textAlign:'right', marginTop:'-8%'}}> <SearchFieldExampleTemplate
          placeholder="Search Here"
          
          searchDelay = '100000000000'
          /></p>
          <br/>
          <br/>
          <Divider />
          <br/>
      <Tabs defaultActiveKey="assn" >
        {assignedTab}
        {unassignedTab}
      </Tabs>
    </div>
  )}
};

Goalstabs.propTypes = propTypes;
