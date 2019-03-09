import React, {Component} from 'react';

class Timer extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      time: null,
      intervalID: null
    }
  }

  componentDidMount(){
    this.runTimer();
    var x = document.getElementsByClassName('answer');
    for (let i = 0; i < x.length; i++){
      x[i].addEventListener('click', () => {
        this.stop();
        this.runTimer();
      });
    };
  };

  runTimer = () => {
    this.setState({time: 5});
    this.setState({intervalID: setInterval(this.tick, 1000)})
  };

  stop = () => {
    clearInterval(this.state.intervalID);
  };

  tick = () => {
    this.setState({state: this.state.time--});
    if (this.state.time <= 0) {
      this.stop();
      this.props.lifeLost();
      this.props.updateQuestionTracker();
      this.props.sceneChangeChecker();
      this.props.nextQuestion();
      if(this.props.questionTracker !== this.props.currentSet.length){
        this.runTimer();
      }
    } 
  };

  render(){
    return <div>{this.state.time}</div>
  }

}

export default Timer;