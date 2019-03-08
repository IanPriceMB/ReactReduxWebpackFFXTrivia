import React from 'react';
import './HealthBar.scss'

export const HealthBar = props => {
  console.log(props)

  return <div>Health Reamaining {props.remainingLives}</div>
}