import React, { Component } from 'react'
import PropTypes from 'prop-types';
/* eslint-disable import/no-unresolved, import/extensions */
import Tabs from 'terra-tabs/lib/Tabs';
import TabContentTemplate from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import TabContent from 'terra-tabs/lib/terra-dev-site/doc/example/TabContentTemplate';
import Goals from './Goals.js'
import Completed from './Completed.js';
/* eslint-enable import/no-unresolved, import/extensions */
import IconGoals from 'terra-icon/lib/icon/IconAnalytics'
import IconCompleted from 'terra-icon/lib/icon/IconSuccess'
const propTypes = {
  tabFill: PropTypes.bool,
};
const completedTab = (
  <Tabs.Pane label="Completed"  icon={<IconCompleted />}  key="Completed">
    <TabContentTemplate label="Completed"> <Completed
    /></TabContentTemplate>
  </Tabs.Pane>
);
const goalsTab = (
  <Tabs.Pane label="In Progress"  icon={<IconGoals />} key="LabelTab">
    <TabContent label="Goals"> <Goals
    /> </TabContent>
  </Tabs.Pane>
);


export default class Goalstabs extends Component { 
  constructor(props) {
    super(props);
    

  }
    
  
  
  render() {
  return(
    <div style={{ padding: '10px' , marginTop: '1%'}}>
      <Tabs defaultActiveKey="LabelTab" >
        {goalsTab}
        {completedTab}
      </Tabs>
    </div>
  )}
};

Goalstabs.propTypes = propTypes;
