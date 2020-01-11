import React, { Component } from 'react'
import Textarea from 'terra-form-textarea/lib/Textarea';
import Field from 'terra-form-field';
import Button from 'terra-button/lib/Button';
import DatePicker from 'react-date-picker'



export default class Selfeval extends Component{
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })
 
render(){
  return(
      <div>
        <div style={{marginLeft:"67%"}}>
          <p>Select Date</p>
        <DatePicker
        calendarIcon = {null}
         onChange={this.onChange}
         value={this.state.date}/>
        </div>
        
       <Field style= {{marginLeft:"9%"}}label="Self Evaluation" htmlFor="medium">
        <Textarea
        size="medium"
        id="medium"
        />
       </Field>
      <Button text="Submit" variant="emphasis" style={{marginLeft:"74%"}}/> 
    </div>
  )
}
}