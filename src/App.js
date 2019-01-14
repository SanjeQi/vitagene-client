import React, { Component, Fragment } from 'react';
import logo from './LogoMakr_7sWE81.png';
import './App.css';
import Header from './components/Header'
import VitaminStack from './components/VitaminStack'
import Intro from './components/Intro'
import YourGenome from './components/YourGenome'
import Diet from './components/Diet'
import { Parallax } from 'react-scroll-parallax'
// import  scrollToComponent from 'react-scroll-to-component'

class App extends Component {

  state = {

    report: null,
    vitamins: null,
    checked: false,

   

  }

  
 
 componentDidMount() {
   this.getVitamins()
   }



   getStack = () => {
    const stack = []
    for (const i of this.state.report)  {
        if (this.getScore(i.trait) < 2 )
    { 
        switch (i.trait) {
            case "Folate":
            stack.push("Folic Acid");
            default:stack.push(i.trait) }
        }
    }
    console.log(stack)
    return stack
    
}
getScore = name => {
    return this.state.report.find(r => r.trait === `${name}`).score
    }


  getVitamins = () => {
    fetch("http://localhost:3000/api/v1/vitamins")
    .then(res =>res.json())
    .then(res => this.setState({vitamins: [...res] }))
 }
 
 getReport = () => {
  fetch("http://localhost:3001/report")
    .then(res =>res.json())
    .then( res => this.setState({report: [...res] }))
    this.toggleStackView()
}

toggleStackView = () => {
  this.setState({ checked: !this.state.checked });
}


 
 
 
   render() {
    
     const {vitamins,report, checked} = this.state
    const {getStack, getScore, getReport} = this
     return (
       <div className="App">
         <Fragment >
         <div>
           <Header checked={checked} getReport={this.getReport}/>
          {report ?
            <Fragment>
          <VitaminStack  getScore={getScore} getStack={getStack} checked={checked} vitamins={vitamins} report={report} />
          <YourGenome  getScore={getScore} getStack={getStack} report={report} />
          <Diet getStack={getStack} getScore={getScore} vitamins={vitamins} report={report} />
          </Fragment>
          :
             <Fragment></Fragment>
          }</div>
        </Fragment>
        
        
         
        
        
        </div>
    
     );
   }
 }

export default App;
