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
  }

  runTimer = () => {
    this.state.time = 5;

    clearInterval(this.state.intervalID);
    this.setState({intervalID: setInterval(this.tick, 1000)})
  };

  stop = () => {
    clearInterval(this.state.intervalID);
  };

  tick = () => {
    this.setState({state: this.state.time--});
    if (this.state.time <= 0) {
      this.props.lifeLost();
      this.props.updateQuestionTracker();
      this.props.nextQuestion();
      this.stop();
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