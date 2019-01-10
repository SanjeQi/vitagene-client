import React from 'react'
import logo from '../logo.svg';
import Button from '@material-ui/core/Button';

const Header = ({getReport}) => {

    return (

<div className="splash">
     
<img src={logo} className="App-logo" alt="logo" />
          <h1>
            Vitagene
          </h1>
          <p>
              Choosing the right set of vitamins for your daily supplementation can be difficult. With Vitagene you can discover the perfect combination of vitamins based on your genetic phenotypes.
              Click the button below to connect with your genome via 23andMe.
          </p>
       
          <Button variant="contained" onClick={getReport} >
        Connect with genome
      </Button>
</div>
    )
}
 export default Header