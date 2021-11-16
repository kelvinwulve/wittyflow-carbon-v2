import React  from "react"; 
import  "./static/customstyles.css"
export default class Wrapper extends React.Component{
    render(){
        return(

            <div className="witty-wrapper card">
                <div className="header-container">
                    <div className="header-title">
                        {this.props.header}
                    </div>
                </div>
                <div style={{marginTop:20}}>
                {this.props.children}
                </div>
               
            </div>
        )
    }
}