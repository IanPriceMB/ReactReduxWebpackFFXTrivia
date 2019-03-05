import React, {Component, Fragment} from 'react';
import './App.scss';
import {CharacterSelectScreen} from '../screens/characterSelectScreen/CharacterSelectScreen';
import {CutsceneScreen} from '../screens/cutsceneScreen/CutsceneScreen';
import {GameScreen} from '../screens/gameScreen/GameScreen';
import MainMenuScreen from '../screens/mainMenuScreen/MainMenuScreen';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import pubsub from 'pubsub-js';

class App extends Component {
  state = {screen: 'landing'};

  changeScreen = (value) =>{
    this.setState({screen: value})
  }

  componentWillMount(){
    this.pubsub_event = pubsub.subscribe('new game', this.newGame)
  }

  componentWillUnmount(){
    pubSub.unsubscribe(this.pubsub_event);
  }

  newGame = (topic, data) => {
    this.changeScreen('CutsceneScreen');
    //redux state for new game
    console.log(topic, data)
  }

  render(){
    return (
      <Fragment>
        { this.state.screen == 'landing'?(
          <><SplashScreen click={this.changeScreen}></SplashScreen></>   
        ):(null)} 
        {this.state.screen == 'MainMenuScreen'?(
          <><MainMenuScreen></MainMenuScreen></>
        ):(null)} 
        {this.state.screen == 'GameScreen'?(
          <><GameScreen></GameScreen></>
        ):(null)} 
        {this.state.screen == 'CutsceneScreen'?(
          <><CutsceneScreen></CutsceneScreen></>
        ):(null)} 
        {this.state.screen == 'CharacterSelectScreen'?(
          <><CharacterSelectScreen></CharacterSelectScreen></>
        ):(null)}
      </Fragment>
    );
  };
};

export default App;