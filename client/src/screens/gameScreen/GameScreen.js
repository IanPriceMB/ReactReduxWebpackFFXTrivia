import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel } from '../../actions/levelActions';
import store from '../../store';
import questionData from '../../assets/data/questionData';
import {Timer} from '../../components/timer/Timer';

class GameScreen extends Component {
  constructor(props){
    super (props)

    this.state ={
      party: [],
      level: '',
      scene: '', 
      currentSet: [],
      currentQuestion: {},
      questionTracker: 0,
      levelScore: 0
    }
  }

  // Get a snapshot of the Redux state and set it equal to component state
  componentWillMount(){
    const snapshot = store.getState();
    const party = snapshot.characters.currentCharacters;
    const level = snapshot.level.currentLevel;
    const scene = snapshot.scene.sceneName;

    this.setState({party, level, scene});

    const path = `${level}_${scene}`
    const currentSet = questionData[path];
    this.setState({currentSet: currentSet});
    this.setState({currentQuestion: currentSet[0]})
  }

  // When an answer is selected evaluate it for correct/incorrect
  // Track the level score
  // If no more questions update the leve/scene
  // Change to the cutscene screen and play cutscene
  choiceClick = (e) => {
    const value = e.target.getAttribute('data-value');
    const next = this.state.questionTracker + 1;
    this.setState({questionTracker: next});

    if(this.state.questionTracker == this.state.currentSet.length){
      //next scene or level reducer
      console.log('here')
      // If level updates to a new level show a score screen
  
      // On click of score screen button change to the cutscene screen
    }

    if (value == 'true') {
      const score = this.state.levelScore + 1;

      this.setState({currentQuestion: this.state.currentSet[this.state.questionTracker]});
      this.setState({levelScore: score});
    } else if (value == 'false') {
      this.setState({currentQuestion: this.state.currentSet[this.state.questionTracker]});
    }
  }



  render(){
    const answers = this.state.currentQuestion.answers.map((answer, i) => {
      return <div key={i} data-value={answer.value} onClick={(e) => this.choiceClick(e)}>{answer.answer}</div>
    });
    return (
      <Fragment>
        <div className='GameScreen' >
          <Timer></Timer>
          <div className='question'>{this.state.currentQuestion.question}</div>
          {answers}
          <button onClick={() => console.log(this.state)}>click</button>
        </div>
      </Fragment>
    )
  }
}

export default connect(null, { setCutscene, setLevel })(GameScreen);