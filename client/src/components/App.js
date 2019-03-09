import React, {Component, Fragment} from 'react';
import './App.scss';
import CharacterSelectScreen from '../screens/characterSelectScreen/CharacterSelectScreen';
import CutsceneScreen from '../screens/cutsceneScreen/CutsceneScreen';
import GameScreen from '../screens/gameScreen/GameScreen';
import MainMenuScreen from '../screens/mainMenuScreen/MainMenuScreen';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import { Provider } from 'react-redux';
import store from '../store';
import MusicPlayer from './music/MusicPlayer';
import Background from '../components/background/Background';

class App extends Component {
  state = {screen: 'SplashScreen'};

  changeScreen = (value) =>{
    this.setState({screen: value})
  }

  render(){
    return (
      <Provider store={store}>
        <Fragment>
          <MusicPlayer></MusicPlayer>
          { this.state.screen == 'SplashScreen'?(
            <SplashScreen changeScreen={this.changeScreen}></SplashScreen> 
          ):(null)} 
          {this.state.screen == 'MainMenuScreen'?(
            <MainMenuScreen changeScreen={this.changeScreen}></MainMenuScreen>
          ):(null)} 
          {this.state.screen == 'GameScreen'?(
            <GameScreen changeScreen={this.changeScreen}></GameScreen>
          ):(null)} 
          {this.state.screen == 'CutsceneScreen'?(
            <CutsceneScreen  changeScreen={this.changeScreen}></CutsceneScreen>
          ):(null)} 
          {this.state.screen == 'CharacterSelectScreen'?(
            <CharacterSelectScreen changeScreen={this.changeScreen}></CharacterSelectScreen>
          ):(null)}
          <Background></Background>
        </Fragment>
      </Provider>
    );
  };
};

export default App;