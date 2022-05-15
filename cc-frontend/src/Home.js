import './App.css';

import React, {Component} from 'react';


export class Home extends Component{
    render(){
        return (
        <div className="vertical-div" style={{alignItems: "center", textAlign: "center"}}>
            <p>Welcome to CarbonCompare, where you can measure your carbon footprint and then compare it to those of others who have used 
            our carbon calculator.  Feel free to access any of our features when you're ready.</p>
        </div>
        )
    }
}