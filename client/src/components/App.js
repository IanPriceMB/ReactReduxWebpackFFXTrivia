import React, {useState, Fragment} from 'react';
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

const App = () => {
  const [screen, setScreen] = useState('SplashScreen');
  
  const changeScreen = value =>{
    setScreen(value)
  }

  console.log(screen)
  return (
    <Provider store={store}>
      <Fragment>
        <MusicPlayer></MusicPlayer>
        <Background></Background>
        {
          screen == 'SplashScreen' ? (
            <SplashScreen changeScreen={changeScreen}></SplashScreen> 
          ): screen == 'MainMenuScreen' ? (
            <MainMenuScreen changeScreen={changeScreen}></MainMenuScreen>
          ):screen == 'CutsceneScreen' ? (
            <CutsceneScreen  changeScreen={changeScreen}></CutsceneScreen>
          ):screen == 'CharacterSelectScreen' ? (
            <CharacterSelectScreen changeScreen={changeScreen}></CharacterSelectScreen>
          ):screen == 'GameScreen' ? (
            <GameScreen changeScreen={changeScreen}></GameScreen>
          ):
          (
            null
          )
        } 
      </Fragment>
    </Provider>
  );
};

export default App;