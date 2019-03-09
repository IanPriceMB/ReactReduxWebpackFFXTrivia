// This component shows the HP state of the player

import React from 'react';
import './HealthBar.scss';

export const HealthBar = props => {
  const livesRemaining = [];
  for(let i = 0; i < props.remainingLives; i++){
    livesRemaining.push(i);
  }
  const hearts = livesRemaining.map(life => {
    return <i key={life} className="fas fa-heart"></i>
  });
  return <div>Health Reamaining {hearts}</div>
};