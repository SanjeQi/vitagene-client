import React, { Component } from 'react';
import { WordCloud } from "word-cloud-react";


class Diet extends Component {

    componentDidMount(){
        if (this.props.onPage('diet')) {
        document.getElementById("diet").scrollIntoView({behavior: "smooth", block: "start"})
        }
    }

    generateFoodMap  = () => {
        let array = []
        this.props.getStack().map(vitamin => 
            this.props.vitamins.map(vit => {
                if (vitamin === vit.name) {
                    vit.sources.split(', ').map(source => {
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
        return this.props.vegan ?
            array.filter(food => 
                !['salmon', 'yogurt', 'dairy products', 'beef', 'liver', 'milk', 'cheese', 
                'sardines','meat', 'seafood', 'poultry', 'fish', 'beef liver', 'mackerel','clams','eggs', 'fortified milk', 'tuna','egg yolks'].includes(food.word))
        : 
            array 
    }

    windowSize = () => {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        return width > 768 ? 30 : 25
    }
 
   render() {
        const num = this.windowSize()
        const {pageOpen, setPage} = this.props
       
        return (
            <div className="result-food">
                <div className="result-food-container">
                    <h2 id="diet">Recommended Foods</h2>
                    <p>We suggest you incorporate these foods in your diet to ensure you get the required intake of vitamins in your stack. </p>
                    {pageOpen('diet') ?  
                        <div className="word-cloud">
                            <WordCloud className="words"
                                width={"auto"} 
                                maxFont={60} 
                                minFont={16} 
                                logFunc={(x)=> Math.log2(x) * num} 
                                data={this.generateFoodMap()} 
                                color={['#71803F', '#F8AC1D','#598EC0','#E2543E','#1A3051','#F46F73',
                                '#8A87BB','#56CFCD','#297373','#FF8552','#F2E863','#C2F8CB','#FF6700',
                                '#C0C0C0','#523CBD',]}/>
                        </div>
                    :
                        null
                    }
                </div>
                <div id="section08" className="demo">
                    <p onClick={() => {setPage('end')}} ><span></span><span></span><span></span>Back to top</p>
                </div>
            </div>
        );
   }
 }

export default Diet;
