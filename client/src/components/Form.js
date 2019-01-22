import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick";
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';

class Form extends Component {

  
   render() {

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
      question: 'vegan?',
      label: 'vegan'
    },
    { question: 'of African descent?',
      label: 'african'
    },
    { question: 'pregnant or trying?',
      label: 'pregnant'
    }]

    const link = {
      color: 'orange',
      boxShadow: 'none',
      textTransform: 'none',
      display: 'inline block',
      padding: 0,
      margin: 0
    }

    return (
      <Zoom in={true} style={{ transitionDelay: '200ms'}}>
        <div className="form">
          <p>A few optional questions to further personalize your results..
            <br />
            <br />
            <Button style={link} color="primary" onClick={handleSubmit}>skip</Button>
          </p>
          <h2>Are you...</h2>
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {content.map(question =>
              <div className="slider">
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
       </Zoom>
     );
   }
 }

export default Form;
