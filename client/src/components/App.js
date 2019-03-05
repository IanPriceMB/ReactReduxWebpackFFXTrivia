import React, {Component} from 'react';
import './App.scss';
// import {CharacterSelectMenu} from './characterSelect/CharacterSelectMenu';
// import {CharacterPanel} from './characterSelect/CharacterPanel/CharacterPanel';
// import {MainMenu} from './mainMenu/MainMenu';
// import {OptionsMenu} from './optionsMenu/OptionsMenu';
// import {PartyOverlay} from './partyOverlay/PartyOverlay';
// import {QuestionMenu} from './questionMenu/QuestionMenu'
// import {Timer} from './timer/Timer';
import {CharacterSelectScreen} from '../screens/characterSelectScreen/CharacterSelectScreen';
import {CutsceneScreen} from '../screens/cutsceneScreen/CutsceneScreen';
import {GameScreen} from '../screens/gameScreen/GameScreen';
import {MainMenuScreen} from '../screens/mainMenuScreen/MainMenuScreen';
import SplashScreen from '../screens/splashScreen/SplashScreen';


class App extends Component {
  state = {screen: ''};
  render(){
    return (
      <div>
        { this.state.screen == 'landing'?(
          <><SplashScreen></SplashScreen></>   
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
      </div>
    );
  };
};

export default App;