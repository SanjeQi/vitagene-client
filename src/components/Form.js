import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Form extends Component {

  state = {
      ethnicity: '',
     
      vegan: false

  }
 
 
 
 
   render() {

     return (
       <div className="Form">
      
         
           <Header />
           <Form />
           {/* <Result report={report} /> */}
           
         
           
           
        
       </div>
     );
   }
 }

export default Form;
