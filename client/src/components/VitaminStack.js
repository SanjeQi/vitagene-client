import React from 'react'

import { Parallax } from 'react-scroll-parallax'
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
var requireContext = require('require-context');

class VitaminStack extends React.Component  {
    
    state = {
        selectedVitamin: null,
        boxOpen: false

    }

    componentDidMount(){
        if (this.props.onPage('vitamins')) {
        document.getElementById("vitamins").scrollIntoView({behavior: "smooth", block: "start"})
        }
    }

    vitaminAmazonLink = () => {
      let link =  'http://www.amazon.co.uk/gp/aws/cart/add.html?AssociateTag=lolao-21'
        let counter = 1

   
        for (const vitamin of this.props.getStack()){
            link = link + `&ASIN.${counter}=${this.getVitaminInfo(vitamin).code}&Quantity.${counter}=1`
            ++counter
        }
        return link
    }

    getTrait = name => {
        return this.props.report.find(r => r.trait === `${name}`)
    }


    getVitaminInfo = name => {
        return this.props.vitamins.find(r => r.name === `${name}`)
    }

    avoidStack = () => {
        const badStack  = []
        for (const i of this.props.report)  {
            if (this.props.getScore(i.trait) === 4 ) {
                badStack.push(i.trait)
            }
        }
        return badStack
    }

    goToBasket = () => { const url = this.vitaminAmazonLink();  window.open(url, "_blank") }

    importAll = (r) => {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        console.log(images);
        return images;
    }
      
      expandInfo = (vitamin) => {
        this.setState({
            selectedVitamin: vitamin,
            boxOpen: true,
        })
      }
      
     closeBox = () => {
        this.setState({
          selectedVitamin: null,
          boxOpen: false,
        })
    }


    characteristics = () => {
        const list = []
        if (this.props.vegan) {
            list.push('vegan')
        }
        if (this.props.pregnant) {
            list.push('pregnant or trying')
        }
        if (this.props.african) {
            list.push('of African descent')
        }
        switch (list.length) {
            case 1:
                return list[0]
            case 2:
                return list[0] + ' and ' + list[1]
            case 3:
                return list[0] + ', ' + list[1] + ' and ' + list[2]
            
        }
            
    }

    extraSupps = () => {
        let supps = []
        if (this.props.african) {supps = [...supps, 'Vitamin D']}
        if (this.props.vegan) {supps = [...supps, 'Vitamin B12','Iron', 'Calcium']}
        if (this.props.pregnant) {supps = [...supps, 'Folic acid', 'Vitamin D']}
        return supps.filter((v, i, a) => a.indexOf(v) === i)
    }
    


    render () {
        this.vitaminAmazonLink()
        const {onPage, pageOpen, page, getStack, getScore} = this.props
        const {getVitaminInfo} = this
        const {boxOpen, selectedVitamin} = this.state
       
        let num = 1000
        const checked = pageOpen('vitamins')
        const images = this.importAll(require.context('../images', true, /^\.\/.*\.(jpg|png|gif)$/))

        const smallCard = {
            // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            background: 'rgba(0, 0, 0, 0.38)',
            boxShadow: 'none'
            
        };

        const bigCard = {
            background: 'rgba(71, 177, 172, 0.3)',
            boxShadow: 'none',
            width: '100%'
        };

        const link = {
            color: 'white',
            fontSize: '9px'
        }
        
        const buy = {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            boxShadow: 'none'
        }

        return (

             <div className="result-vitamin">
               
                <h2 id="vitamins">Your Vitamin Stack</h2>
                {this.props.vegan || this.props.pregnant || this.props.african ? 
                   <div>
                        <p>Based on your genotype, these are your suggested daily supplements.</p>
                        <p>Because you are {this.characteristics()}, we have added the following to your vitamin stack, regardless of your results:</p>
                        <ul>
                        {this.extraSupps().map( supp =>
                            <li>{supp}</li>)}
                        </ul>
                        {this.props.pregnant ?
                            <p>As you are pregnant/trying, we have also removed Vitamin A from your stack, regardless of your results. It is suggested that pregnant women avoid supplementing with Vitamin A as this can be damaging to the baby.</p> 
                        :
                        null}
                    </div>
                :
                    <div><p>Based on your genotype, these are your suggested daily supplements.</p></div>
                }
                <Button style={buy} variant="contained" color="primary" onClick={this.goToBasket}>Purchase vitamin stack</Button>
                    
                <div className="flex-container">
                    {getStack().map(vitamin => 
                        
                        <Slide  direction="down" in={checked}  style={{ transformOrigin: '0 0 0' }}
                            {...{ timeout: num+=300 } } mountOnEnter >
                          
                            <Card style={smallCard} className="flex-child">
                                <h3>{vitamin}</h3>
                                {/* <img className="vitstructure" src={images[`${getVitaminInfo(vitamin).image}`]} alt={`chemical structure of ${getVitaminInfo(vitamin).name}`} /> */}
                                <h1>{getVitaminInfo(vitamin).symbol}</h1>
                                <CardActions>
                                    {boxOpen && selectedVitamin === vitamin ?
                                        <Button className="link-btn" style={link} onClick={this.closeBox}  size="small">Close</Button>
                                        :
                                        <Button className="link-btn" style={link} onClick={()=> this.expandInfo(vitamin) }  size="small">Learn More</Button>
                                    }
                                </CardActions>
                            </Card>   
                        </Slide>
                            ,        
                    )}
                    </div>
                    {boxOpen ? 
                    <Zoom in={boxOpen} >
                    <Card style={bigCard} className="vitamin-info">
                        
                            <h4>{selectedVitamin}</h4>
                            <h5>RDA</h5>
                            <p>{getVitaminInfo(selectedVitamin).rda}</p>   
                            <h5>Benefits</h5>          
                            <p>{getVitaminInfo(selectedVitamin).benefits}</p>
                            <h5>Deficiency issues</h5>
                            <ul>{getVitaminInfo(selectedVitamin).deficiency.split(',').map(deficiency =>
                                <li>+ {deficiency}</li>)} 
                            </ul>
                        
                        <CardActions>
                            <Button style={link} onClick={this.closeBox} size="small">Close</Button>
                        </CardActions>
                    </Card>
                            
                       
                        </Zoom>
                    :
                        null
                    }
                    <br />
                    <br />
                    <br />
                     <div id="section07" className="demo">
                        <p onClick={this.props.scrollToLast} ><span></span><span></span><span></span>Click to scroll</p>
                    </div>

                </div>
           
        )
    }
}
 export default VitaminStack