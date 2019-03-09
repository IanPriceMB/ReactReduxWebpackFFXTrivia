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

  }

  componentWillMount(){
    const path = `${this.props.level}_${this.props.scene}`
    const currentSet = questionData[path];
    this.setState({currentSet, currentQuestion: currentSet[this.state.questionTracker]});
  }

  componentDidMount() {
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

  // If no more questions update the leve/scene
  // When an answer is selected evaluate it for correct/incorrect
  choiceClick = (e) => {
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

  nextSceneCheck = () => {
    const regex = /\_final$/;
    console.log(this.props.scene)
    if (!regex.test(this.props.scene)){
      try {
        Object.keys(levelData[this.props.level].cutscenes).forEach(scene => {
          if(!levelData[this.props.level].cutscenes[scene].finished){
            this.props.setCutscene(scene);
            this.props.changeScreen('CutsceneScreen');
            throw BreakException;
          }
        })
      } catch (e) {
        if (e !== BreakException) throw e;
      }

    } else if (regex.test(this.props.scene)){
      let arr = []
      Object.keys(levelData).forEach(key => {
        arr.push(key);
      })
      const clevelindex = this.getObjectKeyIndex(levelData, this.props.level)
      const nlevelindex = clevelindex+1
      const nlevel = arr[nlevelindex]
      console.log(nlevel)
      // this.props.setLevel(nlevel);
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

    if(this.state.questionTracker == this.state.currentSet.length){
      this.nextSceneCheck();
    }
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