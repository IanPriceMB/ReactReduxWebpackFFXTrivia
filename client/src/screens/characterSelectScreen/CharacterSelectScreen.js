import React, {Component, Fragment} from 'react';
import './CharacterSelectScreen.scss';
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import store from '../../store';
import levelData from '../../assets/data/levelData';
import {CharacterSelectMenu} from '../../components/characterSelect/CharacterSelectMenu';
import {OptionsMenu} from '../../components/optionsMenu/OptionsMenu';
import { setLevel } from '../../actions/levelActions'
import { setCutscene } from '../../actions/cutsceneActions'
import background from '../../assets/backgrounds/character_select.jpg';

class CharacterSelectScreen extends Component{
  constructor(props){
    super(props)

    this.state= {
      chosen: []
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
    this.check(currentLevel, scene);

    this.setState({level: currentLevel});
    const currentLevelData = levelData[currentLevel];
    const achars = currentLevelData.available_characters;
    this.props.setAvailableCharacters(achars);
    document.getElementById('background').style.backgroundImage = `url('${background}')`;
  }

    //If it is scene_one that means it is a new level, therefore a cutscene should be played first
    check = (level, scene) => {
      const regex = /\_one$/;

      if (level == 'new_game'){
        this.props.setLevel('zanarkand_one');
        this.props.changeScreen('CutsceneScreen')
      } else if (regex.test(scene) && !levelData[level].cutscenes[scene].finished){
        this.props.changeScreen('CutsceneScreen')
      } else if (regex.test(scene) && levelData[level].cutscenes[scene].finished){
        return;
      }
    }

  // On click of a character panel update chosen array
  // revisit this later it is pretty spaget
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
          <CharacterSelectMenu pickable={this.props.available} updateChosen={this.updateChosen}></CharacterSelectMenu>
          <button><h3 onClick={this.startGame}>Let's Go!</h3></button>
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