import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Result from './components/Result'

class App extends Component {

  state = {

    report: null
   

  }
 
 
//   componentDidMount() {
//    fetch("http://localhost:3000/report")
//      .then(res =>res.json())
//      .then(res => this.setState({report: res.report }));
//  }
 
 getReport = () => {
  fetch("http://localhost:3000/report")
    .then(res =>res.json())
    .then(res => this.setState({report: [...res] }))
  
}

 
 
 
   render() {
   
     const report = this.state.report
  
     return (
       <div className="App">
      
         {report ? 
         <Result report={report} />
         :
         <Header getReport={this.getReport}/>
        }
          
          
           
           
         
           
           
        
       </div>
     );
   }
 }

export default App;
