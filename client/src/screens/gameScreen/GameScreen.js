// This file controls all the gameplay logic including: 
// answer questions, the timer, which question to display
// and losing

// Importing everything we need to make this a pretty react component
import React, { Component, Fragment } from 'react';
import './GameScreen.scss';
import PropTypes from 'prop-types';


// For setting the background for the level
import pubsub from 'pubsub-js';


// For connecting to Redux State
import { connect } from 'react-redux';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel, gameLoss } from '../../actions/levelActions';


// The data is placed else where for ease of reference
import questionData from '../../assets/data/questionData';
import levelData from '../../assets/data/levelData';


// All the components needed to create the screen
import HealthBar from '../../components/healthBar/HealthBar';
import Timer from '../../components/timer/Timer';
import Container from '../../components/container/Container';
import PartyOverlay from '../../components/partyOverlay/PartyOverlay';


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

  // Before the component mounts we need to get the proper question data
  // Also set the background image
  componentWillMount(){
    console.log(this.props)
    const path = `${this.props.level}_${this.props.scene}`;
    const currentSet = questionData[path];
    this.setState({currentSet, currentQuestion: currentSet[this.state.questionTracker]});

    pubsub.publish('setBackground', 'data');
  };

  //here we check what characters are in the party and assing click listeners to the answers
  componentDidMount() {
    this.auronCheck();
    this.assignListeners();
  };

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

  assignListeners = async() => {
    const x = await document.getElementsByClassName('answer');
    for(let i in x){
      x[i].addEventListener('click', (e) => {
        this.evaluateChoice(e);
      });
    }
  }

  // Evaluate the players answer
  evaluateChoice = (e) => {
    const value = e.target.getAttribute('data-value');
    if (value == 'false') {
      this.lifeLost();
    };
    this.updateGame();
  };

  lifeLost = () => {
    const currentLives = this.state.lives;
    const newTotal = currentLives - 1;
    this.setState({lives: newTotal});
    if(newTotal == 0){
      this.gameLost();
    };
  };

  gameLost = () => {
    this.props.gameLoss(true);
    this.props.changeScreen('CutsceneScreen');
  };

  updateGame = () => {
    this.updateQuestionTracker();
    this.sceneChangeChecker();
    this.nextQuestion();
  }
 
  updateQuestionTracker = () => {
    const next = this.state.questionTracker + 1;
    this.setState({questionTracker: next});
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

  nextQuestion = () => {
    const next = this.state.questionTracker;
    this.setState({currentQuestion: this.state.currentSet[next]});
    this.auronCheck();
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
        <Container>
        <Timer 
            lifeLost={this.lifeLost} 
            updateGame={this.updateGame}
            party={this.props.current}
          ></Timer>
          <HealthBar remainingLives={this.state.lives}></HealthBar>
          <h3 className='question'>{this.state.currentQuestion.question}</h3>
          {answers}
        </Container>
        <PartyOverlay level={this.props.level} party={this.props.current}></PartyOverlay>
      </Fragment>
    );
  };
};


// Declareing which proptypes should be present 
GameScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired,
  setLevel: PropTypes.func.isRequired,
  setCutscene: PropTypes.func.isRequired,
  gameLoss: PropTypes.func.isRequired,
  available: PropTypes.array.isRequired,
  current: PropTypes.array.isRequired,
  level: PropTypes.string.isRequired, 
  scene: PropTypes.string.isRequired, 
};



// Declare the expected proptypes for this screen to run
const mapStateToProps = state => ({
  available: state.characters.availableCharacters,
  current: state.characters.currentCharacters,
  level: state.level.currentLevel,
  scene: state.scene.sceneName
});


// Export the game screen connected to Redux State
export default connect(mapStateToProps, { setCutscene, setLevel, gameLoss })(GameScreen);