import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel } from '../../actions/levelActions';
import store from '../../store';
import questionData from '../../assets/data/questionData';
import Timer from '../../components/timer/Timer';
import levelData from '../../assets/data/levelData';
import {HealthBar} from '../../components/healthBar/HealthBar';

class GameScreen extends Component {
  constructor(props){
    super (props)

    this.state ={
      party: [],
      level: '',
      scene: '', 
      currentSet: [],
      currentQuestion: {},
      questionTracker: 5,
      lives: 3
    }

    this.choiceClick = this.choiceClick.bind(this);
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
    // const value = e.target.getAttribute('data-value');
    // this.updateQuestionTracker();

    // Object.keys(levelData).find(this.state.level)
    Object.keys(levelData).forEach((level)=>{
      if(level == this.state.level){
        Object.keys(levelData[level].cutscenes).forEach(scene => {
          if(!levelData[level].cutscenes[scene].finished){
            console.log(levelData[level].cutscenes[scene].finished)
            this.props.setCutscene(scene);
            this.props.changeScreen('CutsceneScreen');
          }
        })
      }
    })

    // for(let i = 0; i < levelData.length; i++){
    //   if (level == levelData[i]){
    //     this.props.setLevel(levelData[i+1]);
    //     this.props.setCutscene('scene_one');
    //   }
    // }
    // this.props.changeScreen('CutsceneScreen');
    // if(this.state.questionTracker >= this.state.currentSet.length){
      //next scene or level reducer
      // If level updates to a new level show a score screen
  
      // On click of score screen button change to the cutscene screen
    }
    // if (value == 'true') {
    //   this.nextQuestion();
    // } else if (value == 'false') {
    //   this.nextQuestion();
    //   this.lifeLost();
    // }
  }

  lifeLost = () => {
    const currentLives = this.state.lives;
    const newTotal = currentLives - 1;
    this.setState({lives: newTotal})
  }

  updateQuestionTracker = () => {
    const next = this.state.questionTracker + 1;
    this.setState({questionTracker: next});
  }

  nextQuestion = () => {
    this.setState({currentQuestion: this.state.currentSet[this.state.questionTracker]});
  }

  render(){
    const answers = this.state.currentQuestion.answers.map((answer, i) => {
      return <div key={i} data-value={answer.value} onClick={(e) => this.choiceClick(e)} className='answer'>{answer.answer}</div>
    });
    return (
      <Fragment>
        <button onClick={(e) => this.choiceClick(e)}>click me</button>
        {/* <div className='GameScreen' >
          <Timer 
            lifeLost={this.lifeLost} 
            party={this.state.party} 
            nextQuestion={this.nextQuestion}
            updateQuestionTracker={this.updateQuestionTracker}
            questionTracker={this.state.questionTracker}
            currentSet={this.state.currentSet}
          ></Timer>
          <HealthBar remainingLives={this.state.lives}></HealthBar>
          <div className='question'>{this.state.currentQuestion.question}</div>
          {answers}
        </div> */}
      </Fragment>
    )
  }
}

export default connect(null, { setCutscene, setLevel })(GameScreen);