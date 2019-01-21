import React, { Component, Fragment } from 'react';
import './App.css';
import loader from './logostraight.png';
import Header from './components/Header'
import VitaminStack from './components/VitaminStack'
import Form from './components/Form'
import Others from './components/Others'
import YourGenome from './components/YourGenome'
import Diet from './components/Diet'
import { Parallax } from 'react-scroll-parallax'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {  Link, Switch, withRouter } from 'react-router-dom'
import * as Scroll from 'react-scroll';
import {  Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
 

class App extends Component {

  state = {

    report: null,
    vitamins: null,
    checked: false,
    african: false, 
    vegan: false,
    pregnant: false,
    currentPage: 'splash',
    openPages: []
  }

  
 //Initial Render
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
    this.setPage('diet')
    
  }

  // PAGE TRANSITION FUNCTIONS
  setPage = (pg) => {
    this.setState({
      currentPage: pg,
      openPages:[...this.state.openPages,pg]
    })
  
  }



  onPage = (pg) => {
    return this.state.currentPage === pg ? true : false
  }

  pageOpen = (pg) => {
      return this.state.openPages.includes(pg) ? true : false
  }

  toggleStackView = () => {
    this.setState({ checked: !this.state.checked });
  }

  exit = () => {
    this.props.history.push('/')
    window.location.reload()
    
    // localStorage.removeItem('report')
    // this.setState({ report: null,
    // page: 'splash',  checked: false })
    
    
  
     
   
  };

  

  //DATA RENDER FUNCTIONS
  
  callApi = async (item) => {
    const response = await fetch(`/api/${item}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    return body;
  };

  getVitamins = () => {
    this.callApi('vitamins')
    .then(res => this.setState({ vitamins: res.vitamins, isLoading: false},localStorage.setItem('vitamins', res)))
  }
 
  getReport = () => {
    
    if (!navigator.onLine) {
      this.setState({ report: localStorage.getItem('report') })
    }
    this.callApi('report')
    .then(res => this.setState({ report: res.report}))
    .then(this.toggleStackView())
    .then(this.setPage('genome'))
  
  }

  getStack = () => {
    const stack = []
    
    for (const i of this.state.report)  {
        if (this.getScore(i.trait) < 2 )
          { 
          switch (i.trait) {
              case "Folate":
              stack.push("Folic acid");
              break;
              default:stack.push(i.trait) }
          }
    }
    return this.state.vegan || this.state.pregnant || this.state.african ?
     this.customizeStack(stack) : stack
  }


  customizeStack = (oldStack) => {
      if (this.state.vegan) {oldStack = [...oldStack, 'Vitamin B12','Iron', 'Calcium']}
      if (this.state.african) {oldStack = [...oldStack, 'Vitamin D']}
      if (this.state.pregnant)  {
        oldStack = [...oldStack, 'Folic acid', 'Vitamin D'];
        for( var i = 0; i < oldStack.length-1; i++){ 
          if ( oldStack[i] === 'Vitamin A') {
            oldStack.splice(i, 1)
          }
        } 
       
      }
      return oldStack.filter((v, i, a) => a.indexOf(v) === i); 
  }


  getScore = name => {
  return this.state.report.find(r => r.trait === `${name}`).score
  }




  //FORM 
  handleChange = (event) => {
    const value = event.target.value === 'yes' ? true : false
    this.setState({ [event.target.name]: value });
    console.log(this.state)
   };

   
 
   render() {
    
    const {vitamins,report, connected, checked, currentPage, african, vegan, pregnant, isLoading} = this.state
    const {onPage, handleChange, getStack, getScore, getReport, scrollTo, scrollToTop, setPage, exit, scrollToBottom, scrollToLast, pageOpen} = this
    const Container = () => {
      return ( 
      <Fragment>
          <Header handleChange={handleChange} page={currentPage} onPage={onPage}
           checked={checked} exit={exit} getReport={getReport} />

          <YourGenome  onPage={onPage} page={currentPage} pageOpen={pageOpen}  setPage={setPage}
           scrollTo={scrollTo}  getScore={getScore} getStack={getStack} report={report}/>

          <VitaminStack african={african} vegan={vegan} pregnant={pregnant} onPage={onPage} 
          page={currentPage} pageOpen={pageOpen} setPage={setPage} scrollTo={scrollTo} scrollToLast={scrollToLast} 
          getScore={getScore} getStack={getStack} checked={checked} vitamins={vitamins} report={report}/>

          <Diet onPage={onPage} vegan={vegan} scrollToTop={scrollToTop} setPage={setPage}
           getStack={getStack} exit={exit} page={currentPage} pageOpen={pageOpen} checked={checked} 
           getScore={getScore} vitamins={vitamins} report={report}/>
      </Fragment>)
  
    }

    return (

    
      
        <div className="page">
        <Router>
          <Switch>
            
            {!report ?
              <Route exact path='/' render={routerProps => <Header {...routerProps} page={currentPage} checked={checked} 
              exit={exit} getReport={getReport} handleChange={handleChange} scrollToForm={scrollToBottom} onPage={onPage} />} />
              
            :
              <Fragment>
                <Route exact path='/result'render={routerProps => <Container {...routerProps} />}  />
              </Fragment> 
            }
          
            <Route component={Others} page={currentPage} report={report}/> } /> 
          </Switch>
          </Router>
         </div>
      
     
  )


   
   }
 }

export default withRouter(App);
