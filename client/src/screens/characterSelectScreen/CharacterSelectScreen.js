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
    console.log(this.props)
    // If it is scene_one that means it is a new level, therefore a cutscene should be played first
    // Check failed if seperate fucntion as it had to wait to load to call .this causing the state to fail
    const regex = /\_one$/;
    if (regex.test(this.props.scene) && levelData[this.props.level].cutscenes[this.props.scene].finished){
      if(Object.keys(levelData[this.props.level].cutscenes).length > 1){
        const currentLevelData = levelData[this.props.level];
        const availableCharacters = currentLevelData.available_characters;
        this.props.setAvailableCharacters(availableCharacters);
        document.getElementById('background').style.backgroundImage = `url('${background}')`;
      } 
      else {
        const levels = Object.keys(levelData);
        let nextLevel;
        for (let i = 0; i < levels.length; i++){
          if(levels[i] == this.props.level){
            nextLevel = levels[i+1];
            break;
          }
        }
        this.props.setLevel(nextLevel);
        this.props.changeScreen('CutsceneScreen');
      }
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