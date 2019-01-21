import loader from '../logostraight.png';
import React, { Component, Fragment } from 'react';

import Zoom from '@material-ui/core/Zoom';
class Others extends Component {



render() {


    return (


     <div className="loading-screen-container">
     {this.props.location.pathname === '/result' ?
     
     
          <Zoom  in={true}   style={{ transitionDelay:  '200ms' }}>
         
         <div className="loading-screen">
     <h2> Loading...</h2>
     <img className="load" src={loader} />
     </div>
  
     </Zoom> 
    :

    <div className="loading-screen">
    <h2>404 - not found</h2>
    {/* {setTimeout () => window.location.reload(), 500} */}
    </div>
    }
</div>
    )
}





 }
 
 export default  Others