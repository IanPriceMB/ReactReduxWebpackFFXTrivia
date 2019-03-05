import React, {Component, Fragment} from 'react';
import './App.scss';
import {CharacterSelectScreen} from '../screens/characterSelectScreen/CharacterSelectScreen';
import CutsceneScreen from '../screens/cutsceneScreen/CutsceneScreen';
import {GameScreen} from '../screens/gameScreen/GameScreen';
import MainMenuScreen from '../screens/mainMenuScreen/MainMenuScreen';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import Pubsub from 'pubsub-js';
import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
  state = {screen: 'landing'};

  changeScreen = (value) =>{
    this.setState({screen: value})
  }

  componentWillMount(){
    this.pubsub_event = Pubsub.subscribe('new game', this.newGame);
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.pubsub_event);
  }

  newGame = (topic, data) => {
    this.changeScreen('CutsceneScreen');
  }

  render(){
    return (
      <Provider store={store}>
        <Fragment>
          { this.state.screen == 'landing'?(
            <><SplashScreen changeScreen={this.changeScreen}></SplashScreen></>   
          ):(null)} 
          {this.state.screen == 'MainMenuScreen'?(
            <><MainMenuScreen></MainMenuScreen></>
          ):(null)} 
          {this.state.screen == 'GameScreen'?(
            <><GameScreen></GameScreen></>
          ):(null)} 
          {this.state.screen == 'CutsceneScreen'?(
            <><CutsceneScreen  changeScreen={this.changeScreen}></CutsceneScreen></>
          ):(null)} 
          {this.state.screen == 'CharacterSelectScreen'?(
            <><CharacterSelectScreen></CharacterSelectScreen></>
          ):(null)}
        </Fragment>
      </Provider>
    );
  };
};

export default App;