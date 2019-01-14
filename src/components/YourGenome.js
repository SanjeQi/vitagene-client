import React, { Component } from 'react';
import BarGroup from './BarGroup';
import logo from '../logo.svg';
import { Parallax } from 'react-scroll-parallax';
import CanvasJSReact from '../canvasjs.react'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class YourGenome extends Component {

getResultInfo = vitamin => {
    switch (vitamin.score) {
        case 0:
         return 'Lower blood serum level'
        break;
        case 1:
        return  'Slightly lower serum level'
        break;
        case 2:
        return 'Intermediate'
        break;
        case 3:
         return 'Slightly higher serum level'
        break;
        case 4:
         return 'Higher blood serum level'
        break;
    }

}


populateChart = () => {
let array = []
this.props.report.map(vitamin =>
array.push({y: vitamin.score, label: vitamin.trait})
)

return array
}
 

addSymbols(e){
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if(order > suffixes.length - 1)
        order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}
 


render () {
    const {report} = this.props


const options = {
    animationEnabled: true,
    backgroundColor: "rgba(255,0,0,0)",
    colorSet:  "colorSet2",
    theme: "light2",
    title:{
   
        fontFamily: "raleway",
    },
    axisX: {
        
        reversed: true,
        fontFamily: "raleway"
        
    },
    axisY: {
        title: "Blood Serum Concentration",
        labelFormatter: this.addSymbols,
        fontFamily: "raleway"
    },
    data: [{
        type: "bar",
        dataPoints: [...this.populateChart()]
    }]
}

return (

<div className="result">
    <h2>Your phenotype Results</h2>
     
     <div  className="info-container"> 

          <CanvasJSChart options ={options}/>
     </div>






    
</div>


)}
}
 export default YourGenome
