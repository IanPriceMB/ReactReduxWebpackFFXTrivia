import React from 'react';

export const Timer = (props) => {

  // needs characters and life loss function
  console.log(props)

  let time;
  let intervalID;
  let remainingTime;

  function runTimer() {
    time = 20;

    render();

    clearInterval(intervalID);
    intervalID = setInterval(tick, 1000);
  };

  function stop(){
    clearInterval(intervalID);
  };

  function tick(){
    time--;

    remainingTime = time;
    if (time <= 0) {
      stop();
      // Lose a life
    } 
  };

  return <div>{remainingTime}</div>
}