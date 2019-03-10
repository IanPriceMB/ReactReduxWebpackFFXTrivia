import React, {Component} from 'react';
import characterData from '../../assets/data/characterData'

class Timer extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      time: null,
      intervalID: null,
      plusTime: 0,
      minusTime: 0,
      chance: false
    }
  }

  componentWillMount() {
    for (let i = 0; i < this.props.party.length; i++){
      if(this.props.party[i] == 'Tidus'){
        this.setState({plusTime: this.state.plusTime + 5})
      }
      if(this.props.party[i] == 'Auron'){
        this.setState({minusTime: this.state.minusTime + 5})
      }
      if(this.props.party[i] == 'Rikku'){
        var d = Math.random();
        if (d <= .1){
          this.setState({chance: true})
        }
      }
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
    if(this.state.chance){
      this.setState({time: 10});
    } else {
      this.setState({time: (5 + this.state.plusTime - this.state.minusTime)});
    }
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
      if(this.props.questionTracker !== this.props.currentSet.length){
        this.runTimer();
      }
      this.props.sceneChangeChecker();
      this.props.nextQuestion();
    } 
  };

  render(){
    return <div>{this.state.time}</div>
  }

}

export default Timer;