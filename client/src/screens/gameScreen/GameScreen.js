import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel } from '../../actions/levelActions';
import questionData from '../../assets/data/questionData';
import Timer from '../../components/timer/Timer';
import levelData from '../../assets/data/levelData';
import { HealthBar } from '../../components/healthBar/HealthBar';

class GameScreen extends Component {
  constructor(props){
    super (props)

    this.state ={
      currentSet: [],
      currentQuestion: {},
      questionTracker: 0,
      lives: 3
    }

    this.choiceClick = this.choiceClick.bind(this);
  }

  // Get a snapshot of the Redux state and set it equal to component state
  componentWillMount(){
    const path = `${this.props.level}_${this.props.scene}`
    const currentSet = questionData[path];
    this.setState({currentSet, currentQuestion: currentSet[this.state.questionTracker]});
  }

  getObjectKeyIndex = (obj, keyToFind) => {
    var i = 0, key;
    for (key in obj) {
        if (key == keyToFind) {
            return i;
        }
        i++;
    }
    return null;
  }


  // When an answer is selected evaluate it for correct/incorrect
  // Track the level score
  // If no more questions update the leve/scene
  // Change to the cutscene screen and play cutscene
  choiceClick = (e) => {
    // Next scene update Redux
    if(this.state.questionTracker == this.state.currentSet.length){
      this.nextScenecheck();
    }
    
    // If not at the end of questions update player health and render next question
    const value = e.target.getAttribute('data-value');
    this.updateQuestionTracker();

    if (value == 'true') {
      this.nextQuestion();

    } else if (value == 'false') {
      this.nextQuestion();
      this.lifeLost();
    }
  }

  nextScenecheck = () => {
    const regex = /\_final$/;
    if (!regex.test(this.props.scene)){
      Object.keys(levelData[this.props.level].cutscenes).forEach(scene => {
        if(!levelData[this.props.level].cutscenes[scene].finished){
          this.props.setCutscene(scene);
          this.props.changeScreen('CutsceneScreen');
        }
      })
    } else if (regex.test(this.props.scene)){
      let arr = []
      Object.keys(levelData).forEach(key => {
        arr.push(key);
      })
      const clevelindex = this.getObjectKeyIndex(levelData, this.props.level)
      const nlevelindex = clevelindex+1
      const nlevel = arr[nlevelindex]
      this.props.setLevel(nlevel);
      this.props.setCutscene('scene_one');
      this.props.changeScreen('CutsceneScreen');
    }
  }

  lifeLost = () => {
    const currentLives = this.state.lives;
    const newTotal = currentLives - 1;
    this.setState({lives: newTotal})
  };

  updateQuestionTracker = () => {
    const next = this.state.questionTracker + 1;
    this.setState({questionTracker: next});
  };

  nextQuestion = () => {
    this.setState({currentQuestion: this.state.currentSet[this.state.questionTracker]});
  };

  render(){
    const answers = this.state.currentQuestion.answers.map((answer, i) => {
      return <div 
        key={i} 
        data-value={answer.value} 
        onClick={(e) => this.choiceClick(e)} 
        className='answer'>
        {answer.answer}
      </div>
    });
    return (
      <Fragment>
        {/* <button onClick={(e) => this.choiceClick(e)}>click me</button> */}
        <div className='GameScreen' >
          <Timer 
            lifeLost={this.lifeLost} 
            party={this.props.party} 
            nextQuestion={this.nextQuestion}
            updateQuestionTracker={this.updateQuestionTracker}
            questionTracker={this.state.questionTracker}
            currentSet={this.state.currentSet}
          ></Timer>
          <HealthBar remainingLives={this.state.lives}></HealthBar>
          <div className='question'>{this.state.currentQuestion.question}</div>
          {answers}
        </div>
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({
  available: state.characters.availableCharacters,
  current: state.characters.currentCharacters,
  level: state.level.currentLevel,
  scene: state.scene.sceneName
});

export default connect(mapStateToProps, { setCutscene, setLevel })(GameScreen);