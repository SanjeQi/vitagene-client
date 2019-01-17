import React, { Component } from 'react';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



class Form extends Component {

  state = {
    african: false, 
    vegan: false,
    pregnant: false,
  }
 
  handleChange = (event) => {
    this.setState({ value: event.target.value });

  }

  handleSubmit = () => {

  }

 
 
   render() {

     return (
       <div className="Form">
      
      <Slider>
  

        <div>
        <FormControl component="fieldset" >
          <FormLabel component="legend">Are you..</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        </div>

         <div >
        <FormControl component="fieldset" >
          <FormLabel component="legend">Are you pregnant or trying?</FormLabel>
          <RadioGroup
            aria-label="Pregnant"
            name="Pregnant"
            
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="No" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        </div>


          <div >
        <FormControl component="fieldset" >
          <FormLabel component="legend">Are you pregnant or trying?</FormLabel>
          <RadioGroup
            aria-label="pregnant"
            name="pregnant"
            
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="No" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        </div>


          <div>
        <FormControl component="fieldset" >
          <FormLabel component="legend">Are you vegan?</FormLabel>
          <RadioGroup
            aria-label="vegan"
            name="vegan"
          
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="No" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        </div>

           <div >
        <FormControl component="fieldset" >
          <FormLabel component="legend">Are you of African Descent?</FormLabel>
          <RadioGroup
            aria-label="african"
            name="african"
            
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="No" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        </div>


      </Slider>
         
         
       </div>
     );
   }
 }

export default Form;
