// A timer for putting extra pressure on the player

// Importing everything we need to make this a pretty react component
import React, { Component } from 'react';

// Connect for Redux state
import { connect } from 'react-redux';


class Timer extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      time: null,
      intervalID: null,
      plusTime: 0,
      minusTime: 0,
      chance: false
    };
  };

  // Enable any applicable character effects
  componentWillMount() {
    if(this.props.party.includes('Tidus')){
      this.setState({plusTime: this.state.plusTime + 5})
    };
    if(this.props.party.includes('Auron')){
      this.setState({minusTime: this.state.minusTime + 5})
    };
    if(this.props.party.includes('Rikku')){
      var d = Math.random();
      if (d <= .1){
        this.setState({chance: true})
      };
    };
  };

  // Assign click listeners to the answer divs
  async componentDidMount(){
    this.runTimer();
    var x = await document.getElementsByClassName('answer');
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
    };
    this.setState({intervalID: setInterval(this.tick, 1000)});
  };

  stop = () => {
    clearInterval(this.state.intervalID);
  };

  tick = () => {
    this.setState({state: this.state.time--});
    if (this.state.time <= 0) {
      this.stop();
      this.props.lifeLost();
      this.props.updateGame();
      this.runTimer();
    };
  };

  render(){
    return <div>{this.state.time}</div>
  };
};

const mapStateToProps = state => ({
  party: state.characters.currentCharacters,
})


// Export the timer connected to Redux state
export default connect(mapStateToProps, null)(Timer);
