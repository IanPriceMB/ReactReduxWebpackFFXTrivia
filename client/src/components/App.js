// Connect all the game screens together

// Importing everything we need to make this a pretty react component
import React, {useState, Fragment} from 'react';
import './App.scss';


// For connection to Redux 
import store from '../store';
import { Provider } from 'react-redux';


// All the screens and components we need
import CharacterSelectScreen from '../screens/characterSelectScreen/CharacterSelectScreen';
import CutsceneScreen from '../screens/cutsceneScreen/CutsceneScreen';
import GameScreen from '../screens/gameScreen/GameScreen';
import MainMenuScreen from '../screens/mainMenuScreen/MainMenuScreen';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import MusicPlayer from './music/MusicPlayer';
import Background from '../components/background/Background';
import OptionsMenu from '../components/optionsMenu/OptionsMenu';


const App = () => {
  // Hook state for screen management
  const [screen, setScreen] = useState('SplashScreen');
  
  const changeScreen = value =>{
    setScreen(value)
  }

  return (
    <Provider store={store}>
      <Fragment>
        <MusicPlayer></MusicPlayer>
        <Background></Background>
        <OptionsMenu></OptionsMenu>
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


// Export our app
export default App;