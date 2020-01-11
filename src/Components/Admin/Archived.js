import React from 'react';
import Button from 'terra-button';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import ActionHeader from 'terra-action-header';
import DialogModal from 'terra-dialog-modal';
import List, { Item } from 'terra-list/lib/index';
import Text from 'terra-text';
import Axios from 'axios';
import Checkbox from 'terra-form-checkbox';
var arr=[{label:'yo'},{label:"mama"},{label:"so"},{label:"fat"}];

class EditViewLayoutApplication extends React.Component{

    constructor(){
        super();
        this.state = {
            isOpen: false,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.checkboxclick=this.checkboxclick.bind(this)
        this.elementclick=this.elementclick.bind(this)
    }
    componentDidMount = () => { 
        Axios({
          method :'get',
          url: 'http://localhost:3002/scrumd/SG078343',
          config: {headers : {'Content-Type' : 'application/json'}}
        }).then( response => {
        //   for(var i = 0; i<response.data.length; i++){
        //   this.setState({batches:[...this.state.batches,response.data[i]]  });
        //   }
          console.log(response)
        });
    
      }
    checkboxclick(e){
        //e.preventDefault();
       if(e.target.key==="checkbox")
      alert("checkbox clicked");
      
    }
    elementclick(e,metaData){ 
        if(metaData==="background") 
        alert("element clicked");
        
    }

    handleCloseModal(){
        this.setState({ isOpen: false});
    }

    handleOpenModal(){
        this.setState({ isOpen: true});
    }

    render(){
        return(
            <div>
                
                
               <List paddingStyle="standard"role={'listbox'}>
              {arr.map(str=>(   
               <Item key="123" metaData={"background"} isSelectable={true} onSelect={this.elementclick}>
               {/* <Text>Hello</Text> */}
               <Checkbox key="check"id= {Math.floor((Math.random() * 1000) + 1)} value={"checkbox"} label="lolwa"onChange={this.checkboxclick}/>
               </Item>
              ))
              }
               </List>
            
            </div>
        );
    }
}

export default EditViewLayoutApplication;

