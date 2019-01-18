import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";


class Form extends Component {

  
   render() {

    const buttonStyle = {
    
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 2px 2px rgba(255, 105, 135, .3)',
    
  
    }

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };

    const {handleChange, handleSubmit} = this.props

    const content =  [{
      question: 'Are you vegan?',
      label: 'vegan'
    },
    { question: 'Are you of African descent?',
      label: 'african'
    },
    { question: 'Are you pregnant or trying?',
      label: 'pregnant'
    }]

     return (

       <div className="form">
        <p>A few questions to further personalize your results..

          <br />
          <a onClick={handleSubmit}>skip</a>
        </p>
      
        <Slider ref={slider => (this.slider = slider)} {...settings}>

          {content.map(question =>

            <div>
              <FormControl component="fieldset">
                <FormLabel component="legend">{question.question}</FormLabel>

                <RadioGroup
                aria-label={question.label}
                name={question.label}
                onChange={(event) => {handleChange(event);
                  this.slider.slickNext()}}>

                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            </div>


            )}

          </Slider> 
       </div>
     );
   }
 }

export default Form;
