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
    if (!navigator.onLine) {
      this.setState({ vitamins: localStorage.getItem('vitamins') })
    }
    this.getVitamins()

    
 

    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();

   }

   // SCROLL FUNCTIONS

   

   componentWillUnmount() {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
  }

  scrollToTop =  () => {
    scroll.scrollToTop();
    this.setPage('end')
  }
  scrollToBottom =  () => {
    scroll.scrollToBottom()
    this.setPage('genome');
    
  }
  scrollTo =  (x) => {
    scroll.scrollTo(x);
    this.setPage('vitaminstack')
  }
  scrollMore =  () => {
    scroll.scrollMore(100);
    
  }
  handleSetActive = (to) => {
    console.log(to);
  }

  scrollToLast =  () => {
    scroll.scrollToBottom();
    this.setPage('food')
    
  }

  // PAGE TRANSITION FUNCTIONS
  setPage = (pg) => {
    this.setState({page:pg}  )
    
  }

  onPage = (pg) => {
    return this.state.page === pg ? true : false
  }
 
  toggleStackView = () => {
    this.setState({ checked: !this.state.checked });
  }

  exit = () => {
    this.setState({ report: null,
    page: 'splash' });
  }

  

  //DATA RENDER FUNCTIONS
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
      return stack
    }

  getScore = name => {
    return this.state.report.find(r => r.trait === `${name}`).score
  }


  getVitamins = () => {
    fetch("http://localhost:3000/api/v1/vitamins")
    .then(res =>res.json())
    .then(res => this.setState({vitamins: [...res] }, localStorage.setItem('vitamins', res)))
    
  }
 
  getReport = () => {
    if (!navigator.onLine) {
      this.setState({ report: localStorage.getItem('report') })
    }
    fetch("http://localhost:3001/report")
      .then(res =>res.json())
      .then( res => this.setState({report: [...res] },   this.scrollToBottom()))
    
      this.toggleStackView()
      this.scrollToBottom()
  }




 
   render() {
    
    const {vitamins,report, checked, page} = this.state
    const {onPage, getStack, getScore, getReport, scrollTo, scrollToTop, exit, scrollToBottom, scrollToLast} = this

    return (
       <div className="page">
        <Fragment>
          <div>
            <Header page={page} checked={checked} exit={exit} getReport={getReport}/>
            {report ?
              <Fragment>  
                <YourGenome onPage={onPage} page={page}  scrollTo={scrollTo}  getScore={getScore} getStack={getStack} report={report} />
                <Element name="vitamin" className="element">
                  <VitaminStack  onPage={onPage} page={page}  scrollTo={scrollTo} scrollToLast={scrollToLast} getScore={getScore} getStack={getStack} checked={checked} vitamins={vitamins} report={report} />
                </Element>
               <Diet onPage={onPage} scrollToTop={scrollToTop} getStack={getStack} exit={exit} page={page} checked={checked} getScore={getScore} vitamins={vitamins} report={report} />
              </Fragment>
            :
              <Fragment></Fragment>
            }
          </div>
        </Fragment>
     </div>
     );
   }
 }

export default App;
