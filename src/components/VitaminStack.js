import React from 'react'
import logo from '../logo.svg';
import { Parallax } from 'react-scroll-parallax'
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';



class VitaminStack extends React.Component  {


    vitaminAmazonLink = () => {
      let link =  'http://www.amazon.co.uk/gp/aws/cart/add.html?AssociateTag=lolao-21'
    let counter = 1

   
    for (const vitamin of this.props.getStack()){
       link = link + `&ASIN.${counter}=${this.getVitaminInfo(vitamin).code}&Quantity.${counter}=1`
        
       ++counter}
       return link
    }

    getTrait = name => {
        return this.props.report.find(r => r.trait === `${name}`)
    }


    // getScore = name => {
    // return this.props.report.find(r => r.trait === `${name}`).score
    // }

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

    goToBasket = () =>{ const url = this.vitaminAmazonLink();  window.open(url, "_blank") }

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
    //     return stack
    //     console.log(stack)
    // }




    render () {
        this.vitaminAmazonLink()
        const {checked, getStack, getScore} = this.props
        const {getVitaminInfo} = this
        let num = 1000
        return (

            <Parallax offsetYMax={25} offsetYMin={-35}>
                <div className="result">
                    <h2>Your Vitamin Stack</h2>
                    <Button variant="contained" color="primary" onClick={this.goToBasket}>Purchase vitamin stack</Button>
                    

                    <div className="flex=container">
                        {getStack().map(vitamin => 
                        
                            
                    
                            <Slide  direction="down" in={checked}  style={{ transformOrigin: '0 0 0' }}
                                {...(checked ? { timeout: num } : {})} mountOnEnter unmountOnExit>
                                <div className="flex-child"> 
                                    <h3>{vitamin}</h3>
                                    <p>RDA: {getVitaminInfo(vitamin).rda}</p>
                                    {/* <ul>{getVitaminInfo(vitamin).sources.split(',').map( source =>
                                        <li>{source}</li>)}
                                        </ul>
                                    
                                    <p>{getVitaminInfo(vitamin).benefits}</p>
                                    <ul>{getVitaminInfo(vitamin).deficiency.split(',').map(deficiency =>
                                        <li>{deficiency}</li>)} */}
                                    {/* </ul> */}
                                </div>
                            </Slide>
                            ,
                            num = num + 100
                    )}
                    </div>
                </div>
            </Parallax>
        )
    }
}
 export default VitaminStack