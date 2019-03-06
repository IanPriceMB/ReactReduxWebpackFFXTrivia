import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel } from '../../actions/levelActions';
import store from '../../store';
import questionData from '../../assets/data/questionData';
import {Timer} from '../../components/timer';

class GameScreen extends Component {
  constructor(props){
    super (props)

    this.state ={
      party: [],
      level: '',
      scene: '', 
      currentSet: [],
      currentQuestion: {}
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

  // Get the proper question data then load the initial question
  componentDidMount(){

  }

  render(){
    console.log()
    const answers = this.state.currentQuestion.answers.map((answer, i) => {
      <div key={i} data-value={answer.value}>{answer.answer}</div>
    })
    return (
      <Fragment>
        <div className='GameScreen' >
          <Timer></Timer>
          <div className='question'>{this.state.currentQuestion.question}</div>
          {answers}
        </div>
      </Fragment>
    )
  }
}

export default connect(null, { setCutscene, setLevel })(GameScreen);