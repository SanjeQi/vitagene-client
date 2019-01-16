import React from 'react'
import logo from '../LogoMakr_7sWE81.png';
import Button from '@material-ui/core/Button';

const Intro = ({getReport}) => {

    return (

<div className="splash">
     

          <p>
              Choosing the right set of vitamins for your daily supplementation can be difficult. With Vitagene you can discover the perfect combination of vitamins and minerals based on your genetic phenotypes.
              Click the button below to connect with your genome via 23andMe.
          </p>
       
          <Button variant="contained" onClick={getReport} >
        Connect with genome
      </Button>
</div>
    )
}
 export default Intro