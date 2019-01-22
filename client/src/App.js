import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/Header'
import VitaminStack from './components/VitaminStack'
import Others from './components/Others'
import YourGenome from './components/YourGenome'
import Diet from './components/Diet'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {  Switch, withRouter } from 'react-router-dom'
import {  Events, animateScroll as scroll, scrollSpy } from 'react-scroll'
 

class App extends Component {

  state = {

    report: null,
    vitamins: null,
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


  exit = () => {
    this.props.history.push('/')
    window.location.reload()
  };

  

  //DATA RENDER FUNCTIONS
  
  callApi = async (item) => {
    const response = await fetch(`/api/${item}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getVitamins = () => {
    this.callApi('vitamins')
    .then(res => this.setState({ vitamins: res.vitamins, isLoading: false},
    localStorage.setItem('vitamins', res)))
  }
 
  getReport = () => {
    if (!navigator.onLine) {
      this.setState({ report: localStorage.getItem('report') })
    }
    this.callApi('report')
    .then(res => this.setState({ report: res.report}))
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
    
    const {vitamins,report, currentPage, african, vegan, pregnant} = this.state
    const {onPage, handleChange, getStack, getScore, getReport, scrollToTop, setPage, exit, scrollToBottom, scrollToLast, pageOpen} = this
    const Container = () => {
      return ( 
        <Fragment>
          <Header handleChange={handleChange} page={currentPage} onPage={onPage}
           exit={exit} getReport={getReport} />

          <YourGenome  onPage={onPage} page={currentPage} pageOpen={pageOpen}  setPage={setPage}
          report={report}/>

          <VitaminStack african={african} vegan={vegan} pregnant={pregnant} onPage={onPage} 
          page={currentPage} pageOpen={pageOpen} scrollToLast={scrollToLast} 
         getStack={getStack} vitamins={vitamins} report={report}/>

          <Diet vegan={vegan} scrollToTop={scrollToTop} 
           getStack={getStack} page={currentPage} pageOpen={pageOpen} 
           getScore={getScore} vitamins={vitamins}/>
        </Fragment>
      )
    }

    return (
      <div className="page">
        <Router>
          <Switch>
            {!report ?
              <Route exact path='/' render={routerProps => <Header {...routerProps} page={currentPage}  
              exit={exit} getReport={getReport} handleChange={handleChange} scrollToForm={scrollToBottom} onPage={onPage} />} />
            :
              <Fragment>
                <Route exact path='/result'render={routerProps => <Container {...routerProps} />}  />
              </Fragment> 
            }
            <Route component={Others}/>
          </Switch>
          </Router>
         </div>
    )
  }
 }

export default withRouter(App);
