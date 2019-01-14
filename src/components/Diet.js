import React, { Component } from 'react';

import { WordCloud } from "word-cloud-react";

import { Parallax } from 'react-scroll-parallax'
import Slide from '@material-ui/core/Slide';

class Diet extends Component {

    // getStack = () => {
    //     const stack = []
    //     for (const i of this.props.report)  {
    //         if (this.getScore(i.trait) < 2 )
    //     { 
    //         switch (i.trait) {
    //             case "Folate":
    //             stack.push("Folic Acid");
    //             default:stack.push(i.trait) }
    //         }
    //     }
    //     console.log(stack)
    //     return stack
        
    // }
    // getScore = name => {
    //     return this.props.report.find(r => r.trait === `${name}`).score
    //     }

    generateFoodMap  = () => {
        let array = []
        this.props.getStack().map(vitamin => 
            this.props.vitamins.map(vit => {
                if (vitamin === vit.name) {
                    vit.sources.split(',').map(source => {
                        if (array.find(val => val.word === source)) {
                            let x = array.findIndex(val => val.word === source) 
                            array[x] = {word: source, value: array[x].value + 1}
                        }
                    
                        else { 
                            array.push({word: source, value: 2})
                        }
                    })
               
                 }
            })
        )
        console.log(array)
        return array 
       
    }
 
   render() {

    const {checked} = this.props
    let num = 1000

     return (
       <div className="result-food">
       <div className="result-food-container">
            <h2>Recommended Foods</h2>
           {!checked ?  <div className="word-cloud">
                <WordCloud 
                        width={"auto"} 
                        maxFont={60} 
                        minFont={16} 
                        logFunc={(x)=> Math.log2(x) * 30} 
                        data={this.generateFoodMap()} 
                        clickEvent={(x)=>console.log(x.word)} 
                        color={['#71803F', '#F8AC1D','#598EC0','#E2543E','#1A3051','#F46F73','#8A87BB','#56CFCD','#297373','#FF8552','#F2E863','#C2F8CB','#3A6EA5','#FF6700','#C0C0C0','#4E4381','#523CBD',]}/>
            </div>
            :
            <div></div>
        }
        </div>
       </div>
     );
   }
 }

export default  Diet;
