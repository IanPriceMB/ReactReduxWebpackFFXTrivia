import React, {useEffect, useState} from 'react';

export const Timer = (props) => {
  const [time, setTime] = useState(5);
  // needs characters and life loss function next question function

  useEffect(()=> {
    runTimer();
  },[time])

  function runTimer() {
    if (time == -1) {
      props.lifeLost();
      props.updateQuestionTracker();
      props.nextQuestion();
      setTime(5);
      return;
    } 
    setTimeout(function(){
      setTime(time-1)
    }, 1000);
  };

  return <div>{time}</div>
}