import React from 'react'
import logo from '../LogoMakr_7sWE81.png';
import Button from '@material-ui/core/Button';

const BarGroup = ({d, barHeight}) => {


    let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = d => d * 10

  let width = widthScale(d.value)
  let yMid = barHeight * 0.5
    return (

        <g className="bar-group">
       <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{d.name}</text>
    <rect y={barPadding * 0.5} width={width} height={barHeight - barPadding} fill={barColour} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{d.value}</text>
      </g>
    )
}
 export default BarGroup