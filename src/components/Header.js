import React,  { Component } from 'react';
import logo from '../logostraight.png';
import Button from '@material-ui/core/Button';
import { Parallax } from 'react-scroll-parallax'

class Header extends Component {

  
  introCopy = () => (
    
   
  
        <div className="root">
         <span className={`vitagene-h1`}>
            {'Vitagene'.split('').map((letter, i) => (
                <Parallax
                    key={`copy-${i}`}
                    className="letter"
                    offsetXMax={100 * (i - 3)}
                    
                >
                    {letter}
                </Parallax>
            ))}
        </span>
        </div>
     
    
  )
  render() {
    const {checked, getReport} = this.props
    return (


      

      <div className="splash"> 
 {!checked ?
         <div className="splash">
           <img src={logo} className="App-logo" alt="logo" />
          {this.introCopy()}
            <p>
              Choosing the right set of vitamins for your daily supplementation can be difficult. With Vitagene you can discover the perfect combination of vitamins and minerals based on your genetic phenotypes.
              Click the button below to connect with your genome via 23andMe.
            </p>
       
          <Button variant="contained" onClick={getReport} >
        Connect with genome
        </Button>
      </div>
      : 
      <div className="splash-report">
      <img src={logo} className="App-logo" alt="logo" />
     {this.introCopy()}
       
        </div>}



 </div>
    )
}
}
 export default Header