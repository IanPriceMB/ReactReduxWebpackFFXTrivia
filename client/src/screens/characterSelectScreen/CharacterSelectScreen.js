import React, {Component, Fragment} from 'react';
import './CharacterSelectScreen.scss';
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel } from '../../actions/levelActions';
import store from '../../store';
import levelData from '../../assets/data/levelData';
import {CharacterSelectMenu} from '../../components/characterSelect/CharacterSelectMenu';
import {OptionsMenu} from '../../components/optionsMenu/OptionsMenu';
import background from '../../assets/backgrounds/character_select.jpg';

class CharacterSelectScreen extends Component{
  constructor(props){
    super(props)

    this.state= {
      chosen: [],
      available: []
    }
  }

  // Get current level from state
  // Use current level to get the available characters for this section
  // Update Redux with available characters
  // Update .background with the character select screen image.
  componentWillMount(){
    const snapshot = store.getState();
    const currentLevel = snapshot.level.currentLevel;
    const scene = snapshot.scene.sceneName;

    // If it is scene_one that means it is a new level, therefore a cutscene should be played first
    // Check failed if seperate fucntion as it had to wait to load to call .this causing the state to fail
    const regex = /\_one$/;
    if (regex.test(scene) && levelData[currentLevel].cutscenes[scene].finished){
      if(Object.keys(levelData[currentLevel].cutscenes).length > 1){
        //do nothing
        const currentLevelData = levelData[currentLevel];
        const achars = currentLevelData.available_characters;
        this.props.setAvailableCharacters(achars);
        this.setState({level: currentLevel, available: achars});
        document.getElementById('background').style.backgroundImage = `url('${background}')`;
      } 
      else {
        const levels = Object.keys(levelData);
        let nextLevel;

        for (let i = 0; i < levels.length; i++){
          if(levels[i] == currentLevel){
            nextLevel = levels[i+1];
          }
        }

        this.props.setLevel(nextLevel);
        this.props.changeScreen('CutsceneScreen');
      }
    }
  }

  updateChosen = character => {
    const clicked = document.getElementById(character);
    const value = clicked.getAttribute("data-chosen");
    if(this.state.chosen.length == 3){
      document.getElementById(this.state.chosen[0]).setAttribute('data-chosen', "true");
      document.getElementById(this.state.chosen[0]).style.borderColor = 'rgb(0, 0, 202)';
      const byebye = this.state.chosen.splice(0,1);
      this.setState({chosen: [...byebye, character]});
      clicked.style.borderColor = 'aqua';
      clicked.setAttribute('data-chosen', "true");

    }
    else if(value === "false"){
      this.setState({chosen: [...this.state.chosen, character]});
      clicked.style.borderColor = 'aqua';
      clicked.setAttribute('data-chosen', "true");
    } else if (value === "true") {
      const unchosen = this.state.chosen.filter((chosenChar) => character !== chosenChar);
      this.setState({chosen: unchosen})
      clicked.style.borderColor = 'rgb(0, 0, 202)';
      clicked.setAttribute('data-chosen', "false")
    } 
  }

  // Sets the game screen and the chosen characters to Redux state
  startGame = () => {
    this.props.changeScreen('GameScreen');
    this.props.setCurrentCharacters(this.state.chosen);
  }

  render() {
    return (
      <Fragment>
        <OptionsMenu></OptionsMenu>
        <div className='characterSelectScreen'>
          <h1 className='characterSelectScreen__title'>Chose Up to 3 Characters ({this.state.chosen.length})</h1>
          <CharacterSelectMenu pickable={this.state.available} updateChosen={this.updateChosen}></CharacterSelectMenu>
          <button><h3 onClick={this.startGame}>Let's Go!</h3></button>
          <button onClick={() => console.log(this.props)}>click</button>
        </div>
      </Fragment>
    )
  }
}

CharacterSelectScreen.propTypes = {

}

const mapStateToProps = state => ({
  available: state.characters.availableCharacters,
  current: state.characters.currentCharacters
})

export default connect(mapStateToProps, { setCurrentCharacters, setAvailableCharacters, setLevel, setCutscene })(CharacterSelectScreen);