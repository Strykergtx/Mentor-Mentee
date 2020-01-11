import React,{Component} from 'react'
import Button from 'terra-button';
import IconDocuments from 'terra-icon/lib/icon/IconDocuments';
import Field from 'terra-form-field';
import Textarea from 'terra-form-textarea/lib/Textarea';
import Commentsection from './Commentsection';

import Axios from 'axios'

export default class DialogContent extends Component{
  constructor(props) {
    super(props);
    this.state = {value: '',
                  comments:[] 
  
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    Axios({
      method :'get',
      url: 'http://localhost:3002/getcomments',
      config: {headers : {'Content-Type' : 'application/json'}}
    }).then( response => {
           

       for(var i = 0; i<response.data.length; i++){
       this.setState({comments:[...this.state.comments,response.data[i]]  });
        
         }
          console.log(this.state.comments)
    });

 }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    Axios.post('http://localhost:3002/comments', {
      AID: 'SS073166',
      content: this.state.value,
      aid: 'SS073166'
    })
    .then(function (request) {
      console.log(request);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
    
  }
  render(){
  const {name, description, type, month, date, year, duesince, completed, mentorlname, mentorfname, comment} = this.props.content;
  const list=this.props.list
  console.log(list)
  return (
    <div>
        <Button text="Complete" variant="emphasis"style={{float:'right', marginTop:'-2px', padding:'4px', backgroundColor:'#2cbf47'}}/>
                         <p style={{fontSize:'18px'}}>Goal > {name}</p>
                         <hr/>
                <div style={{padding:'5px'}}>
                        <div style={{marginLeft:'75%', marginTop:'2%'}}>
                                <div style={{background:'#e6e6e6', width:'100%', padding:'10px'}}>
                                    <p><strong>Current status: </strong>Due Since {duesince} days</p> 
                                    <p><strong>Created by: </strong>{mentorlname}, {mentorfname}</p> 
                                    <p><strong>Last updated: </strong>11:20AM 28/08/2019</p> 
                                    <p><strong>Start Date: </strong>23/08/2019</p> 
                                    <p><strong>End Date: </strong>30/08/2019</p> 
                                </div>
                        </div>
                           
                        <div style={{marginTop:'-230px'}}>
                            <h4>Description</h4>
                            <p style={{maxWidth: '71%', textAlign: 'justify'}}>{description} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanrsd. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <br/>
                            
                           
                            <form style={{paddingTop:'0px'}}>
                            <h4>Attachment</h4>
                            <IconDocuments style={{paddingLeft:'2%'}} height='4em' width='4em' /> <br/>
                                 <input type="file" id='file' />
                            </form>
                            
                        </div>
                        <br/> <br/> <br/>
                <div>
                      {/* comment starts */}
                      <h2>Comments</h2>
                      <hr/>
                      {this.state.comments.map(com => (
                        <Commentsection dt={com.postdate} aid={com.associateID} content={com.addpost}/>
                      ))}
                      {/* comment ends */}
                      <br/>

                </div>
                </div>
                <hr/>
                <div style={{paddingTop:"5px"}}>
                <Field htmlFor="small" style={{position:'relative', marginLeft:'2%', width:'86%'}}>
                         <Textarea
                        size="small"
                        placeholder="Add Comment . . ."
                         id="small"   
                       value={this.state.value} 
                       onChange={this.handleChange} 
                         />
                    </Field>
                    <div>
                    
                    <Button text="Submit" variant="emphasis"onClick={this.handleSubmit} style={{float:'right', marginTop:'-68px', marginRight:'10px', padding:'10px', width:'10%'}}/>
                    </div>
                </div>
                   
    </div>
  )
  }
}
