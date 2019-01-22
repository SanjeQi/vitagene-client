import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react'
import Slide from '@material-ui/core/Slide';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;


class YourGenome extends Component {

    getResultInfo = vitamin => {
        switch (vitamin.score) {
            case 0:
            return 'Lower blood serum level'
            
            case 1:
            return  'Slightly lower serum level'
          
            case 2:
            return 'Intermediate'
        
            case 3:
            return 'Slightly higher serum level'
           
            case 4:
            return 'Higher blood serum level'   
            
            default:
            return 'n/a'
        }
    }


    populateChart = () => {
        let array = []
        this.props.report.map(vitamin =>
            array.push({y: vitamin.score+1, label: vitamin.trait})
        )
        return array
    }
    

    componentDidMount(){
        if (this.props.onPage('genome')) {
            setTimeout(() => document.getElementById("genome").scrollIntoView({behavior: "smooth", block: "start"}), 300)
        }
    }

    addSymbols(e){
        let suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        let suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

    


    render () {
        const {onPage,setPage, pageOpen} = this.props
        const {addSymbols, populateChart} = this
        
        const options = {
            animationEnabled: onPage('genome'),
            animationDuration: 2000,
            backgroundColor: "rgba(255,0,0,0)",
            colorSet:  "colorSet2",
            theme: "light2",
            title:{
                fontColor: "black",
                fontFamily: "raleway",
            },
            axisX: {
                
                reversed: true,
                fontFamily: "raleway",
                labelFontFamily: "raleway",
                labelFontColor: "white",
            
                
            },
            axisY: {
                title: "Typical blood serum concentration for your genotype (0-4)",
                labelFormatter: addSymbols,
                labelFontFamily: "raleway",
                labelFontColor: "white",
                titleFontFamily: "raleway",
                titleFontColor: "white",
                titleFontSize: 14
            },
            data: [{
                type: "bar",
                dataPoints: [...populateChart()]
            }]
        }



        return (
      
        <div className="result-pheno">
            <h2 id="genome" name="genome">Your Phenotype Results</h2> 
            <p>These are the results of your natural blood serum concentration of each tested micronutrient based on your genotype.
                 Each nutrient is assigned a score that corresponds to the following: </p>
            <ul>
                <li>1 - Lower blood serum level</li> 
                <li>2 - Slightly lower serum level</li> 
                <li>3 - Intermediate</li> 
                <li>4 - Slightly higher serum level</li> 
                <li>5 - Higher blood serum level</li> 
            </ul>
            <div  className="info-container"> 
                <Slide direction="down" in={pageOpen('genome')}  style={{ transformOrigin: '0 0 0' }}> 
                    <CanvasJSChart options ={options}/>
                </Slide>
            </div>
            
            <div id="section07" className="demo">
                <p onClick={() => {setPage('vitamins')}}><span></span><span></span><span></span>Click to scroll</p>
            </div>  
        </div>
        )}
        
}


 export default YourGenome
