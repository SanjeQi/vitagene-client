import React, { Component, Fragment } from 'react';
import logo from './LogoMakr_7sWE81.png';
import './App.css';
import Header from './components/Header'
import VitaminStack from './components/VitaminStack'
import Intro from './components/Intro'
import YourGenome from './components/YourGenome'
import Diet from './components/Diet'
import { Parallax } from 'react-scroll-parallax'
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import {  Link, Switch } from 'react-router-dom'
// import  scrollToComponent from 'react-scroll-to-component'
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
 

class App extends Component {

  state = {

    report: null,
    vitamins: null,
    checked: false,
    page: 'splash'

   

  }

  
 
 componentDidMount() {
   this.getVitamins()


   Events.scrollEvent.register('begin', function(to, element) {
    console.log("begin", arguments);
  });

  Events.scrollEvent.register('end', function(to, element) {
    console.log("end", arguments);
  });

  scrollSpy.update();

   }

   componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  scrollToTop =  () => {
    scroll.scrollToTop();
  }
  scrollToBottom =  () => {
    scroll.scrollToBottom();
    this.toggleStackView()
  }
  scrollTo =  (x) => {
    scroll.scrollTo(x);
    this.toggleStackView()
  }
  scrollMore =  () => {
    scroll.scrollMore(100);
    
  }
  handleSetActive = (to) => {
    console.log(to);
  }

  scrollToLast =  () => {
    scroll.scrollToBottom();
    this.toggleStackView()
    
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
    // this.toggleStackView()
    this.scrollToBottom()
    
}

toggleStackView = () => {
  this.setState({ checked: !this.state.checked });
}

switchPage = (pg) => {
this.setState({page: pg})
}


 
 
 
   render() {
    
     const {vitamins,report, checked, page} = this.state
    const {getStack, getScore, getReport, scrollTo, scrollToBottom, scrollToLast} = this
     return (
       <div className="page">




         <Fragment >
         <div>
           <Header checked={checked} getReport={getReport}/>
          {report ?
            <Fragment>  
              
              <YourGenome className="element" scrollTo={scrollTo} getScore={getScore} getStack={getStack} report={report} />
          <VitaminStack name="scroll-to-element" scrollTo={scrollTo} scrollToLast={scrollToLast} getScore={getScore} getStack={getStack} checked={checked} vitamins={vitamins} report={report} />
          <Diet getStack={getStack}  checked={checked} getScore={getScore} vitamins={vitamins} report={report} />
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
