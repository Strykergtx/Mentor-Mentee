import React from 'react'

export default function Commentsection(props) {
    return (
        <div>
            <div style = {{borderStyle:"hidden", borderRadius: '5px', marginTop: '2%', backgroundColor:"#f5f5f5", padding:"2px"}}>
            
                    <p style = {{textAlign:'justify'}}> <b style = {{marginLeft: '1%'}}>{props.aid}</b>
                    <span style = {{float: 'right', marginRight: '0.8%'}}>{props.dt}</span> 
                    </p>
                    <hr style = {{backgroundColor: '#fcfcfc'}}/>
                    
                    <p style = {{textAlign: 'left', marginLeft: '0.8%'}}>{props.content}</p>
                    

            </div>
        </div>
    )
}