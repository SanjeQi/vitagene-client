import React,  { Component } from 'react';
import logo from '../logostraight.png';
import Button from '@material-ui/core/Button';
import { Parallax } from 'react-scroll-parallax'
import Form from './Form'
class Header extends Component {

  

  state = {
    african: false, 
    vegan: false,
    pregnant: false,
    form: false
  }
 
  formToggle = () => {
    this.setState({form: !this.state.form})
  }

  handleChange = (event) => {
  this.props.handleChange(event)
  if (event.target.name === 'pregnant') 
     {this.handleSubmit()}
  }

  handleSubmit = () => {
    this.props.getReport();
    this.props.history.push('/result')
  }

  introCopy = () => (
    <div className="head">
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

    const {formToggle} = this
    const {checked, getReport, page, exit} = this.props
    const {african, vegan, pregnant, form} = this.state
    const style = {
       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 2px 2px rgba(255, 105, 135, .3)',
      }

    return (
      <div className="splash"> 
        {page === 'splash' ?
            <div className="splash" name="splash">
              <img src={logo} id="header-logo" className="App-logo" alt="logo" />
              {this.introCopy()}
              <p>
                Choosing the right set of vitamins for your daily supplementation can be difficult. With Vitagene you can discover the perfect combination of vitamins and minerals based on your genetic phenotype.
              
              </p>
              {!form ?
                <Button style={style} variant="contained" onClick={formToggle}>Get started</Button>
              :
                <Form getReport={getReport} vegan={vegan} african={african} pregnant={pregnant} handleChange={this.handleChange} />
              }
            </div>
      
        : 
      
         (page !== 'end' ? 
            <div className="splash-report">
              <img src={logo} className="App-logo" alt="logo"/>
              {this.introCopy()}
            </div>
         :
          <div className="splash-report">
              <img src={logo} className="App-logo" alt="logo"  name="end" />
              {this.introCopy()}
              <br/>
              <Button style={style} variant="contained" onClick={() => {exit()}}>
                Exit?
              </Button>
            </div>)

          }
        </div>
      )
  }
}

 export default Header