import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel, gameLoss } from '../../actions/levelActions';
import questionData from '../../assets/data/questionData';
import Timer from '../../components/timer/Timer';
import levelData from '../../assets/data/levelData';
import { HealthBar } from '../../components/healthBar/HealthBar';
import pubsub from 'pubsub-js';

class GameScreen extends Component {
  constructor(props){
    super (props);

    this.state ={
      currentSet: [],
      currentQuestion: {},
      answerSet: [],
      questionTracker: 0,
      lives: 5,
      auron: false
    };

    this.sceneChangeChecker = this.sceneChangeChecker.bind(this);
  };

  componentWillMount(){
    const path = `${this.props.level}_${this.props.scene}`;
    const currentSet = questionData[path];
    this.setState({currentSet, currentQuestion: currentSet[this.state.questionTracker]});

    pubsub.publish('setBackground', 'data');
    
  };

  componentDidMount() {
    this.auronCheck();
    this.assignListeners();
  };

  // If auron then do auron stuff
  auronCheck = () => {
    if(this.props.current.includes('Auron')){
      const set = this.state.currentQuestion.answers;
      let arr = [];
      for(let i = 0; i < set.length; i++){
        if(arr.length < set.length-1 && !set[i].value){
          arr = [...arr, set[i]];
        } else if (arr.length == set.length-1 && !set[i].value){
          // Do nothing
        } else if (arr.length < set.length-1 && set[i].value){
          arr = [...arr, set[i]];
        } else if (arr.length == set.length-1 && set[i].value){
          arr = [...arr, set[i]];
          arr.splice(0,1);
        }; 
      };
      this.setState({answerSet: arr})
    } else {
      this.setState({answerSet: this.state.currentQuestion.answers})
    };
  };

  // Assign click listeners to the answer divs
  assignListeners = () => {
    var x = document.getElementsByClassName('answer');
    console.log(x)
    // for (let i = 0; i < x.length; i++){
    //   console.log(x[i])
    //   x[i].addEventListener('click', (e) => {
    //     this.choiceClick(e);
    //   });
    // };
  }

  // If no more questions update the leve/scene
  // When an answer is selected evaluate it for correct/incorrect
  choiceClick = (e) => {
    const value = e.target.getAttribute('data-value');
    if (value == 'false') {
      this.lifeLost();
      if(this.state.lives == 0){
        this.gameLost();
      };
    };
    this.updateQuestionTracker();
    this.sceneChangeChecker();
    this.nextQuestion();
  };

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
    const next = this.state.questionTracker;
    this.setState({currentQuestion: this.state.currentSet[next]});
    this.auronCheck();
  };

  sceneChangeChecker = () => {
    if(this.state.questionTracker == this.state.currentSet.length){
      this.nextScene();
    };
  };

  nextScene = () => {
    try {
      Object.keys(levelData[this.props.level].cutscenes).forEach(scene => {
        if(!levelData[this.props.level].cutscenes[scene].finished){
          this.props.setCutscene(scene);
          this.props.changeScreen('CutsceneScreen');
          throw 'BreakException';
        };
      });
    } catch (e) {
      if (e !== 'BreakException') throw e;
    };
  };

  gameLost = () => {
    this.props.gameLoss(true);
    this.props.changeScreen('CutsceneScreen');
  };

  render(){
      const answers = this.state.answerSet.map((answer, i) => {
        return <div 
        key={i} 
        data-value={answer.value} 
        className='answer'>
        {answer.answer}
      </div>
      });
    return (
      <Fragment>
        <div className='GameScreen' >
          <Timer 
            lifeLost={this.lifeLost} 
            party={this.props.current} 
            nextQuestion={this.nextQuestion}
            updateQuestionTracker={this.updateQuestionTracker}
            sceneChangeChecker={this.sceneChangeChecker}
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

export default connect(mapStateToProps, { setCutscene, setLevel, gameLoss })(GameScreen);