// This component shows the HP state of the player

// Importing everything we need to make this a pretty react component
import React from 'react';
import './HealthBar.scss';


const HealthBar = props => {
  
  const livesRemaining = [];
  for(let i = 0; i < props.remainingLives; i++){
    livesRemaining.push(i);
  }

  const hearts = livesRemaining.map(life => {
    return <i key={life} className="fas fa-heart"></i>
  });

  return <div>Health Reamaining {hearts}</div>
};


// Export the Health Bar
export default HealthBar;