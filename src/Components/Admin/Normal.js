import React, { Component } from 'react'
import Table from 'terra-table'
import Checkbox from 'terra-form-checkbox';
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
import NotificationDialog, { NotificationDialogVariants } from 'terra-notification-dialog';
import Axios from 'axios'
import { isForXStatement } from '@babel/types';
import { func } from 'prop-types';



const cx = classNames.bind(styles);
var weekarr=[];
weekarr[0]=({w:1,pc:2,ppc:2,mc:1,pmax:2,pmin:0});
weekarr[1]=({w:2,pc:3,ppc:3,mc:2,pmax:3,pmin:1});
weekarr[2]=({w:3,pc:4,ppc:4,mc:2,pmax:4,pmin:2});
weekarr[3]=({w:4,pc:6,ppc:6,mc:3,pmax:6,pmin:3});
weekarr[4]=({w:5,pc:6,ppc:6,mc:3,pmax:6,pmin:4});
weekarr[5]=({w:6,pc:6,ppc:6,mc:4,pmax:6,pmin:6});
weekarr[6]=({w:6,pc:6,ppc:6,mc:5,pmax:6,pmin:6});
weekarr[7]=({w:6,pc:6,ppc:6,mc:6,pmax:6,pmin:6});



export class Normal extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            allchecked:false,
            n1open:false ,
            buttoname:"Select All",
            selectedAnswers:[],
            normal:[],
            menteeandscores:[],
            batch:this.props.batch,
           // redirect:false
            n2open:false,
            isbuttonavail:false,
            nsuccess:false
       
          
                
        };
        this.selectAll=this.selectAll.bind(this)
        this.CheckOne=this.CheckOne.bind(this)

        this.handleCloseNotification = this.handleCloseNotification.bind(this);
        this.ApproveAxios = this.ApproveAxios.bind(this);
        this.handleOpenNotification=this.handleOpenNotification.bind(this)


        this.handleOpenNotification2=this.handleOpenNotification2.bind(this)
        this.handleCloseNotification2=this.handleCloseNotification2.bind(this)
        this.MoveToOutlierAxios = this.MoveToOutlierAxios.bind(this);

        this.load=this.load.bind(this)
        
        this.closeSuccess=this.closeSuccess.bind(this)
        this.openSuccess=this.openSuccess.bind(this)
      
      }
      
      handleCloseNotification() {
        this.setState({ n1open: false });
       
      }
      
      handleCloseNotification2() {
        this.setState({ n2open: false });
       
      }
      
      handleOpenNotification(){
        this.setState({n1open:true});
        console.log(this.state.selectedAnswers)
       }
      handleOpenNotification2(){
        this.setState({n2open:true});
      }
      
      openSuccess(){

        this.setState({nsuccess:true})
      }

      closeSuccess(){
        this.setState({nsuccess:false})
        this.load(this.state.batch)
      }

      MoveToOutlierAxios(){
        this.setState({n2open:false})
        console.log(this.state.selectedAnswers)
        var list=[]  
         this.state.selectedAnswers.forEach(element => {
          list.push({aid:element.AID,weekno:element.currweek})
        })
        
          Axios.post('http://localhost:3002/setasoutlier', {   
            selected:list,
            
          }).then(this.openSuccess())
           
      }

      ApproveAxios() {
        this.setState({ n1open: false });
        
        console.log(this.state.selectedAnswers)
      var list=[]  
       this.state.selectedAnswers.forEach(element => {
        list.push({aid:element.AID,weekno:element.currweek})
      })
      
        Axios.post('http://localhost:3002/setapproved', {   
          selected:list,
          
        }).then(this.openSuccess())
  
      } 


      buttonDisabled(){
        if(this.state.selectedAnswers.length>0)
        return false
        else
        return true
      }


      CheckOne(e) {
       this.setState({buttoname:"Select All"})
       this.setState({allchecked:false})
       if(e.currentTarget.checked)
       {
        let normalcopy=this.state.normal
        normalcopy.forEach(element => {
           if(element.AID==e.currentTarget.value)
          {this.state.selectedAnswers.push(element);
           element.checked=true
          } 
        });
        this.setState({
            normal:normalcopy
            })
        //console.log(this.state.normal)
        
        
       console.log(this.state.selectedAnswers)
       }

      else
      { let normalcopy=this.state.normal
        normalcopy.forEach(element => {
           if(element.AID==e.currentTarget.value)
           {element.checked=false
            this.state.selectedAnswers.splice(this.state.selectedAnswers.indexOf(element), 1);
           }
        });
        this.setState({
            normal:normalcopy
            })
            
           console.log(this.state.selectedAnswers)  
      } 
    }


    selectAll(){   ///start selectall
      if(this.state.allchecked==false)  
      { 
        
        let normalcopy=this.state.normal
        this.setState({allchecked:true});   
        this.setState({buttoname:"Undo Select All"})
        normalcopy.forEach(element => {
          if(!element.checkbox) 
            {
           if(element.checked!=true)   
            {element.checked=true
            this.state.selectedAnswers.push(element)
            }
            }
        });
        this.setState({
            normal:normalcopy,
            allchecked:true
            }) 
            console.log(this.state.selectedAnswers)
             
      }
      
      else
      {   let normalcopy=this.state.normal
        this.setState({allchecked:false});
        this.setState({buttoname:"Select All"})
        normalcopy.forEach(element => {
            element.checked=false
            this.state.selectedAnswers.splice(this.state.selectedAnswers.indexOf(element), 1);
            });
            
        this.setState({
            normal:normalcopy
            
            })
           console.log(this.state.selectedAnswers)
      }

            }    //end selectall

    load(batch){
      console.log("load called")
      //this.setState({batch:this.props.batch})
      this.setState({buttoname:"Select All"})
      this.setState({selectedAnswers:[]})
      this.setState({allchecked:false})
      this.setState({menteeandscores:[]})
      Axios({
        method :'get',
        url: 'http://localhost:3002/getoutlierorder/'+batch,
        config: {headers : {'Content-Type' : 'application/json'}}
      }).then( response => {
         
        console.log(response)
          response.data.forEach(element => {
            //set currweek
            var i =element.scorecard.length;
            i=i-1;   
            element.currweek=i
          
         if(element.scorecard[i].approved!="markedforreview")   
         {    ////set checked   
             
             element.checked=false
             ///
            if(element.scorecard[i].approved=="false")
            {element.app="no"
            element.checkbox=false
          }
            else
           { element.app="yes"
             element.checkbox=true
            }
            //iterate over scorecard
            var pc=0;
            var mc=0;
            var ppc=0;
            var tpc=0;
            for (const [key, value] of Object.entries(element.scorecard[i])) {
                   
                if(value=='+')
                {pc++;
                tpc++;
                }
                else if(value=='++')
                {ppc++;
                 tpc++; 
                }
                else if(value=='-')
                mc++;
              }
  
           if((weekarr[i].pc>=pc)&&(weekarr[i].ppc>=ppc)&&(weekarr[i].mc>=mc)&&(weekarr[i].pmax>=tpc)&&(tpc>=weekarr[i].pmin))
               element.outlier="false"
               else
               element.outlier="true"
            }
         });//end of foreach 
          
         response.data.sort((a, b) => (a.app=="yes")? 1 : -1)

         for(var i = 0; i<response.data.length; i++){
          this.setState({menteeandscores:[...this.state.menteeandscores,response.data[i]]  });
        }
        
         
         var filter = this.state.menteeandscores.filter((detail) => {
          return (detail.outlier == "false"||detail.app=="yes");
        })
       this.setState({normal:filter})
         console.log(this.state.normal)
      });

    }

     ///store current table in state
    componentDidMount(){
     
      this.load(this.state.batch)
      
    }

    render() {

      //rerender on change of top batch dropdown
      if(this.props.batch!=this.state.batch)
      {  
       this.setState({batch:this.props.batch})
        //console.log("yolo")
        this.load(this.props.batch)
      }

      if(this.state.normal.length!=0)   
      { 
        return (
            <div>
                  <h1>Scores Directly Approvable for Batch : {this.props.batch}</h1>
    <Table isStriped={true}isPadded={true}  >
    <Table.Header>
    <Table.HeaderCell content="Name" style = {{border: '1px solid black',width:"5%"}}  key="fname" minWidth="small" />
    <Table.HeaderCell content="AID" style = {{border: '1px solid black',width:"5%"}}  key="AID" minWidth="small" />
    <Table.HeaderCell content="Week" style = {{border: '1px solid black',width:"5%"}}  key="week" minWidth="small" />
    <Table.HeaderCell content="Professionalism" style = {{border: '1px solid black',width:"3%"}}   key="ep" minWidth="medium" />
    <Table.HeaderCell content="Communication" style = {{border: '1px solid black',width:"5%"}}  key="ce" minWidth="small" />
    <Table.HeaderCell content="Learning Agility" style = {{border: '1px solid black',width:"5%"}}  key="la" minWidth="small" />
    <Table.HeaderCell content="Makes and keeps Commitments" style = {{border: '1px solid black',width:"5%"}} key="mk" minWidth="small" />
    <Table.HeaderCell content="Quality of Work" style = {{border: '1px solid black',width:"5%"}} key="wq" minWidth="small" />
    <Table.HeaderCell content="Technical Competency"  style = {{border: '1px solid black',width:"5%"}}key="tc" minWidth="small" />
    <Table.HeaderCell content="feedback"  style = {{border: '1px solid black',width:"15%"}}key="fd" minWidth="large" />
    <Table.HeaderCell content="Approved"  style = {{border: '1px solid black',width:"5%"}}key="app" minWidth="small" />
    <Table.HeaderCell content="Select Mentee"  style = {{border: '1px solid black',width:"9%"}}key="an" minWidth="medium" />

    </Table.Header>
    <Table.Rows >
    {this.state.normal.map(info =>(
                    
                      
                      <Table.Row key="" style = {{border: '1px solid black'}} >
                      <Table.Cell content={info.fname} key="fname" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.AID} key="AID" style = {{border: '1px solid black'}}/>
                      <Table.Cell content={(info.currweek+1)} key="week" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].EP} key="1" style = {{border: '1px solid black'}}/>
                      <Table.Cell content={info.scorecard[info.currweek].CE} key="2" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].LA} key="3" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].MK} key="4" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].WQ} key="5" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].TC} key="6" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].feedback} key="7" style = {{border: '1px solid black'}} />
                      <Table.Cell content={info.app} key="app" style = {{border: '1px solid black'}} />
                      <Table.Cell content={<Checkbox id= {Math.floor((Math.random() * 1000) + 1)} disabled={info.checkbox} checked={info.checked} onChange={this.CheckOne} value={info.AID} style={{marginBottom:'10px',marginLeft:'20px'}} />} key="check" style = {{marginBottom:'100px',border: '1px solid black'}} />
                      </Table.Row> 
                     
                      
                         
                    ))}
                
   </Table.Rows>
   </Table> 
   <br/>
   <Button text={this.state.buttoname} variant="emphasis" className={cx('button')} onClick={this.selectAll}/>
   <Button text="Approve Selected" isDisabled={this.buttonDisabled()}variant="emphasis" className={cx('button')} onClick={this.handleOpenNotification}/>
   <Button text="Move selected to Outliers" isDisabled={this.buttonDisabled()} variant="emphasis" className={cx('button')} onClick={this.handleOpenNotification2}/>
   <NotificationDialog
          variant={NotificationDialogVariants.ALERT}
          header ="Notification"
          isOpen={this.state.n1open}
          title="Approve Scorecard(s)"
          message="Are you sure you want to approve the selected scorecards ?"
          primaryAction={{
            text: 'Yes!',
            onClick: this.ApproveAxios
          }}
          secondaryAction={{
            text: 'No,I want to review once more',
            onClick: this.handleCloseNotification,
          }}
          />
    <NotificationDialog
          variant={NotificationDialogVariants.ALERT}
          header ="Notification"
          isOpen={this.state.n2open}
          title="Move to Outliers"
          message="Are you sure you want to move selected scorecards to outliers ?"
          primaryAction={{
            text: 'Yes!',
            onClick: this.MoveToOutlierAxios
          }}
          secondaryAction={{
            text: 'No,I want to review once more',
            onClick: this.handleCloseNotification2,
          }}
          />  
          <NotificationDialog
          variant={NotificationDialogVariants.SUCCESS}
          header ="Notification"
          isOpen={this.state.nsuccess}
          title="Action Completed"
          message="Done"
          primaryAction={{
            text: 'Okay',
            onClick: this.closeSuccess
          }}
    
          />  




            </div>
        )
       
      }
      else if(this.state.normal.length==0){
      return(
        <div>
          <br/>
         <h3>Looks like this section is empty</h3> 
        </div>
      )
      }
    }
}

export default Normal
