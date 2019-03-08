import React, {useEffect, useState} from 'react';

export const Timer = (props) => {
  const [time, setTime] = useState(5);
  // needs characters and life loss function

  useEffect(()=> {
    runTimer();
  },[time])

  function runTimer() {
    if (time <= 0) {
      props.lifeLost();
      return;
    } 
    setTimeout(function(){
      setTime(time-1)
    }, 1000);
  };

  return <div>{time}</div>
}