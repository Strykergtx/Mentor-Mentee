import React, { Component } from 'react'
import Flippy, { FrontSide, BackSide } from 'react-flippy';


export class NotifHub extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          sc_count:this.props.needsapprovalcount,
          fb_count:3
        };
     
      }
componentDidMount()
{

}   
    render() {
    
        return (
            <div>
  {/* <Card.Group>
    <Card>
      <Card.Content>
        <Card.Header content={this.state.sc_count} />
        <Card.Meta content="Action Required" />
        <Card.Description content='Scorecards need approval/normalization' />
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header content={this.state.fb_count} />
        <Card.Meta content="Action Required" />
        <Card.Description content='Feedbacks need Approval' />
      </Card.Content>
    </Card> */}
    <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="horizontal" // horizontal or vertical
    ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
    // if you pass isFlipped prop component will be controlled component.
    // and other props, which will go to div
    style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
  >
    <FrontSide
      style={{
        fontSize:'50px',
        fontWeight:'700',
        backgroundColor: '#FA9E9F',
      }}
    >
     {this.state.sc_count}
    </FrontSide>
    <BackSide
      style={{ fontSize:'15px',
      fontWeight:'700',backgroundColor: '#FA9E9F'}}>
     Scorecards need approval/normalization
     <br/>
     <br/>
     Action Required 
    </BackSide>
  </Flippy>

  {/* </Card.Group> */}
            </div>
        )
    }
}

export default NotifHub
