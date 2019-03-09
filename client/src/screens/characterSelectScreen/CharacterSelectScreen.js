import React, {Component, Fragment} from 'react';
import './CharacterSelectScreen.scss';
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel } from '../../actions/levelActions';
import levelData from '../../assets/data/levelData';
import {CharacterSelectMenu} from '../../components/characterSelect/CharacterSelectMenu';
import {OptionsMenu} from '../../components/optionsMenu/OptionsMenu';
import background from '../../assets/backgrounds/character_select.jpg';
import pubsub from 'pubsub-js';

class CharacterSelectScreen extends Component{
  constructor(props){
    super(props)

    this.state= {
      chosen: [],
      proceed: null
    }
  }

  // Get current level from state
  // Use current level to get the available characters for this section
  // Update Redux with available characters
  // Update .background with the character select screen image.
  componentWillMount(){
    // If it is scene_one that means it is a new level, therefore a cutscene should be played first
    // Check failed if seperate fucntion as it had to wait to load to call .this causing the state to fail
    const regexOne = /\_one$/;
    const regexFinal = /\_final$/;
    // If the first cutscene has not been played go to the cutscene screen and play it and mark it as played
    // This should never fire
    if (regexOne.test(this.props.scene) && !levelData[this.props.level].cutscenes[this.props.scene].finished) {
      this.props.changeScreen('CutsceneScreen');
    }
    // If the first cutscene has been played continue on to the game screen
    // This should fire at the start of every new 'level'
    else  if (regexOne.test(this.props.scene) && levelData[this.props.level].cutscenes[this.props.scene].finished){
      if(Object.keys(levelData[this.props.level].cutscenes).length > 1){
        const availableCharacters = levelData[this.props.level].available_characters;
        this.props.setAvailableCharacters(availableCharacters);
        document.getElementById('background').style.backgroundImage = `url('${background}')`;
      } 
    }
    // If it is not the first or the last cutscene but it has not been played play it and mark it as played
    // This should never fire
    else if (!regexFinal.test(this.props.scene) && !regexOne.test(this.props.scene) && !levelData[this.props.level].cutscenes[this.props.scene].finished){
      console.log('in here')
      this.props.changeScreen('CutsceneScreen');
    } 
    // If it is the final scene and it has not bee played play it
    // This should never fire
    else if (regexFinal.test(this.props.scene) && !levelData[this.props.level].cutscenes[this.props.scene].finished){
      this.props.changeScreen('CutsceneScreen');
    }
    // If it is the final scene and it has already been played update the level and sceen to be the next level scene one
    // Then go to the cut scene screen and play the level
    // This should fire at the end of every level
    else if (regexFinal.test(this.props.scene) && levelData[this.props.level].cutscenes[this.props.scene].finished){
      console.log(this.props.scene)
      const levels = Object.keys(levelData);
      let nextLevel;
      for (let i = 0; i < levels.length; i++){
        if(levels[i] == this.props.level){
          nextLevel = levels[i+1];
          break;
        }
      }
      console.log(nextLevel)
      this.props.setLevel(nextLevel);
      this.props.setCutscene('scene_one')
      this.props.changeScreen('CutsceneScreen');
    }
  }

  componentDidMount(){
    pubsub.publish('playMusic')
  }

  updateChosen = character => {
    const characterPanel = document.getElementById(character);
    const value = characterPanel.getAttribute("data-chosen");

    // If 3 characters have already been chosen
    if(this.state.chosen.length == 3){
      document.getElementById(this.state.chosen[0]).setAttribute('data-chosen', "true");
      document.getElementById(this.state.chosen[0]).style.borderColor = 'rgb(0, 0, 202)';

      const byebye = this.state.chosen.splice(0,1);
      this.setState({chosen: [...byebye, character]});

      characterPanel.style.borderColor = 'aqua';
      characterPanel.setAttribute('data-chosen', "true");

    }
    else if(value === "false"){
      this.setState({chosen: [...this.state.chosen, character]});

      characterPanel.style.borderColor = 'aqua';
      characterPanel.setAttribute('data-chosen', "true");

    } else if (value === "true") {
      const unchosen = this.state.chosen.filter((chosenChar) => character !== chosenChar);

      this.setState({chosen: unchosen})

      characterPanel.style.borderColor = 'rgb(0, 0, 202)';
      characterPanel.setAttribute('data-chosen', "false")
    } 
  }

  // Sets the game screen and the chosen characters to Redux state
  startGame = () => {
    if(this.state.chosen.length <= 0){
      this.setState({
        proceed: 
        <div className='pickACharacter'>
          you must pick at least one character
          <button onClick={() => this.setState({proceed: null})}>
            OK
          </button>
        </div>
      })
    } else {
      this.props.changeScreen('GameScreen');
      this.props.setCurrentCharacters(this.state.chosen);
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.proceed != null ? this.state.proceed: null}
        <OptionsMenu></OptionsMenu>
        <div className='characterSelectScreen'>
          <h1 className='characterSelectScreen__title'>
            Chose Up to 3 Characters ({this.state.chosen.length})
          </h1>
          <CharacterSelectMenu 
            pickable={this.props.available} 
            updateChosen={this.updateChosen}>
          </CharacterSelectMenu>
          <button>
            <h3 onClick={this.startGame}>
              Let's Go!
            </h3>
          </button>
        </div>
      </Fragment>
    )
  }
}

CharacterSelectScreen.propTypes = {

}

const mapStateToProps = state => ({
  available: state.characters.availableCharacters,
  current: state.characters.currentCharacters,
  level: state.level.currentLevel,
  scene: state.scene.sceneName
})

export default connect(mapStateToProps, { setCurrentCharacters, setAvailableCharacters, setLevel, setCutscene })(CharacterSelectScreen);