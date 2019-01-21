import React, { Component } from 'react';
import logo from '../logo.svg';
import { Parallax } from 'react-scroll-parallax';
import CanvasJSReact from '../canvasjs.react'
import Button from '@material-ui/core/Button'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
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
            array.push({y: vitamin.score+1, label: vitamin.trait})
        )
        return array
    }
    

    componentDidMount(){
        if (this.props.onPage('genome')) {
            document.getElementById("genome").scrollIntoView({behavior: "smooth", block: "start"})
        }
    }
    addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

    windowSize = () => {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        return width > 768 ? 2200 : 1650
    }
    


    render () {
        const {report, onPage,setPage, pageOpen} = this.props
        const checked = pageOpen('genome')
        const num = this.windowSize()

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
                labelFormatter: this.addSymbols,
                labelFontFamily: "raleway",
                labelFontColor: "white",
                titleFontFamily: "raleway",
                titleFontColor: "white",
                titleFontSize: 14
            },
            data: [{
                type: "bar",
                dataPoints: [...this.populateChart()]
        }]
    }



    const style = {
        

            borderRadius: 3,
            border: '1px solid white',
            color: 'white',
            height: 48,
            padding: '0 30px',
            
    };

  


    return (
      
        <div className="result-pheno">
        {console.log('here')}
       
            <h2 id="genome" name="genome">Your phenotype Results</h2> 
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
            <Slide  direction="down" in={checked}  style={{ transformOrigin: '0 0 0' }}
                                     > 
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
