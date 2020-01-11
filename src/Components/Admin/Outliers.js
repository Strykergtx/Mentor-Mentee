import React, { Component } from 'react'
import Table from 'terra-table'
import Button from 'terra-button/lib/Button';
import classNames from 'classnames/bind';
import styles from './ButtonDocCommon.module.scss';
import DialogContent from './Normalize'
import DialogModal from 'terra-dialog-modal';
import ActionHeader from 'terra-action-header/lib/ActionHeader';
import Axios from 'axios'
import MappleToolTip from 'reactjs-mappletooltip';
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



export class Outliers extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            out:[],
            dmopen:false,
            menteeandscores:[],
            currentselection:{},
            batch: this.props.batch  
                
        };

        this.handleOpenDM = this.handleOpenDM.bind(this);
        this.closeDMrefresh = this.closeDMrefresh.bind(this)
        this.NormalCloseDM=this.NormalCloseDM.bind(this)
        this.load=this.load.bind(this)
      }
     

      handleOpenDM(props) {
        this.setState({ dmopen: true });
        console.log(props)     
       this.setState({currentselection:props})  
      
      }
      NormalCloseDM(){
        this.setState({dmopen:false})
      }
      
      closeDMrefresh() {
        this.setState({ dmopen: false });
        this.load(this.props.batch)
      }

   
     load(batch){
      this.setState({batch:batch})
      console.log("load working")
      this.setState({buttoname:"Select All"})
      this.setState({allchecked:false})
      this.setState({menteeandscores:[]})
      Axios({
        method :'get',
        url: 'http://localhost:3002/getoutlierorder/'+batch,
        config: {headers : {'Content-Type' : 'application/json'}}
      }).then( response => {
         
  
          response.data.forEach(element => {
            //set currweek
            var i =element.scorecard.length;
            i=i-1;   
            element.currweek=i
     
         if(element.scorecard[i].approved=="true")
          {
            element.outlier=false  //if its approved its already normalised no need to do calculations

          }
         else if(element.scorecard[i].approved=="markedforreview")
         {
           element.outlier=true
         } 
          else
          { 
            
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
         console.log("plus"+pc)
         console.log("minus"+mc)
         console.log("plusplus"+ppc)
         console.log("total+/++"+tpc)
         console.log("weekarr"+i)
         
            if((weekarr[i].pc>=pc)&&(weekarr[i].ppc>=ppc)&&(weekarr[i].mc>=mc)&&(weekarr[i].pmax>=tpc)&&(tpc>=weekarr[i].pmin))
            { 
             element.outlier=false
             } 
             else
             element.outlier=true
            }
         console.log(element.fname)   
         console.log(element.outlier)
         });//end of foreach 
          
        
         for(var i = 0; i<response.data.length; i++){
          this.setState({menteeandscores:[...this.state.menteeandscores,response.data[i]]  });
        }
       

        // console.log(this.state.menteeandscores)

         var filter = this.state.menteeandscores.filter((detail) => {
          return detail.outlier==true;
        })
       this.setState({out:filter})
    
      });

    }
     ///store current table in state
    componentDidMount(){
     
      this.load(this.state.batch)
      
    }

   
      

    render() {
      if(this.props.batch!=this.state.batch)
      { 
        
         //console.log("yolo")
        this.load(this.props.batch)
      }
     


   if(this.state.out.length!=0)   
  { 
        return (
            <div>
                  <h1>Scores Need Review for Batch : {this.props.batch}</h1>
    <Table isPadded={true} >
    <Table.Header>
    <Table.HeaderCell content="Name" style = {{border: '1px solid black',width:'5%'}}  key="fname"  />
    <Table.HeaderCell content="AID" style = {{border: '1px solid black',width:'5%'}}  key="AID" />
    <Table.HeaderCell content="Week" style = {{border: '1px solid black',width:'5%',align:'center'}}  key="week"  />
    <Table.HeaderCell content="Professionalism" style = {{border: '1px solid black',width:'5%'}}   key="ep"  />
    <Table.HeaderCell content="Communication" style = {{border: '1px solid black',width:'5%'}}  key="ce" />
    <Table.HeaderCell content="Learning Agility" style = {{border: '1px solid black',width:'5%'}}  key="la"  />
    <Table.HeaderCell content="Makes and keeps Commitments" style = {{border: '1px solid black',width:'5%'}} key="mk"/>
    <Table.HeaderCell content="Quality of Work" style = {{border: '1px solid black',width:'6%'}} key="wq"/>
    <Table.HeaderCell content="Technical Competency"  style = {{border: '1px solid black',width:'5%'}}key="tc"  />
    <Table.HeaderCell content="feedback"  style = {{border: '1px solid black',width:'15%'}}key="fd" />
    <Table.HeaderCell content="Normalize and Approve"  style = {{border: '1px solid black',width:'5%'}}key="normalize"  />
    </Table.Header>
    <Table.Rows >
    {this.state.out.map(info =>(
                    
                      
                      <Table.Row key="row" style = {{border: '1px solid black'}} >
                      <Table.Cell content={info.fname} key="fname" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.AID} key="AID" style = {{border: '1px solid black'}}/>
                      <Table.Cell content={(info.currweek+1)} key="week" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].EP} key="1" style = {{border: '1px solid black'}} />
                      <Table.Cell content={info.scorecard[info.currweek].CE} key="2" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].LA} key="3" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].MK} key="4" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].WQ} key="5" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].TC} key="6" style = {{border: '1px solid black'}}/> 
                      <Table.Cell content={info.scorecard[info.currweek].feedback} key="7" style = {{border: '1px solid black'}} />
                      <Table.Cell content={<Button text="Normalise" variant="emphasis" className={cx('button')} onClick={()=>this.handleOpenDM(info)}/>} key="button" style = {{border: '1px solid black'}} />
                      </Table.Row> 
                     
                      
                         
                    ))}
                
   </Table.Rows>
   </Table> 
       <DialogModal
                isOpen={this.state.dmopen}
                onRequestClose={this.NormalCloseDM}
                header={<ActionHeader title="Normalize" onClose={this.NormalCloseDM} />}
                width="1000"
                >  
                <DialogContent content={this.state.currentselection} refresh={this.closeDMrefresh} B={this.props.batch}/>
            </DialogModal>

            
       
       
       
            </div>
        )
  }
  else{
  return(
    <div>
      <br/>
      <h3>No Outliers Right Now </h3>
    </div>
  )
  }
    }
}

export default Outliers
