// This screen controls the data flow
// if there is another cutscene this screen will bounce the user back
// to the cutscene screen 

// This component loads only when all applicable cutscenes have been played but the questions 
// for the scene have yet to be completed

// This component lets the user pick their party for taking on questions

// Importing everything we need to make this a pretty react component
import React, {Component, Fragment} from 'react';
import './CharacterSelectScreen.scss';


// For connecting to Redux state
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel, gameLoss } from '../../actions/levelActions';


// Pubsub for transmitting new music and background image choices
import pubsub from 'pubsub-js';

// Level data is stored in a seperate file for clarity of reference
import levelData from '../../assets/data/levelData';


// All the components we need to build the page
import CharacterPanel from '../../components/characterpanel/CharacterPanel';
import OptionsMenu from '../../components/optionsMenu/OptionsMenu';
import background from '../../assets/backgrounds/character_select.jpg';
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';


class CharacterSelectScreen extends Component{
  constructor(props){
    super(props);

    this.state= {
      chosen: [],
      proceed: null
    };
  };

  // If the player lost the game bounce the player back to the cutscene screen
  componentWillMount(){
    this.props.gameLoss(false);

    // If this is the first or last scene in a level check and make sure the pre/post emptive
    // cutscene has been played
    const regexOne = /\_one$/;
    const regexFinal = /\_final$/;

    if (regexOne.test(this.props.scene) && levelData[this.props.level].cutscenes[this.props.scene].finished){
      this.setAvailableCharacters();
    }
    // If not final or first and the cutscene is finished
    else if (!regexFinal.test(this.props.scene) && !regexOne.test(this.props.scene) && levelData[this.props.level].cutscenes[this.props.scene].finished){
      this.setAvailableCharacters();
    } 
    // If it is the final scene and it has already been played update the level and scene to be the next level scene one
    else if (regexFinal.test(this.props.scene) && levelData[this.props.level].cutscenes[this.props.scene].finished){
      const levels = Object.keys(levelData);
      let nextLevel;
      for (let i = 0; i < levels.length; i++){
        if(levels[i] == this.props.level){
          nextLevel = levels[i+1];
          break;
        };
      };
      this.props.setLevel(nextLevel);
      this.props.setCutscene('scene_one');
      this.props.changeScreen('CutsceneScreen');
    };
  };

  setAvailableCharacters = () => {
    const availableCharacters = levelData[this.props.level].available_characters;
    this.props.setAvailableCharacters(availableCharacters);
  };

  componentDidMount(){
    pubsub.publish('setBackground');
    pubsub.publish('playMusic');
  };


  // Hasn't been tested for 3+
  // Setting the border style dynamically overrides css causing hover problems
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

      this.setState({chosen: unchosen});

      characterPanel.style.borderColor = 'rgb(0, 0, 202)';
      characterPanel.setAttribute('data-chosen', "false");
    } ;
  };

  // Sets the game screen and sets the chosen characters to Redux state
  startGame = () => {
    if(this.state.chosen.length <= 0){
      this.setState({
        proceed: 
        <div className='pickACharacter'>
          You must pick at least one character
          <button onClick={() => this.setState({proceed: null})}>
            OK
          </button>
        </div>
      });
    } else {
      this.props.changeScreen('GameScreen');
      this.props.setCurrentCharacters(this.state.chosen);
    };
  };

  render() {
    const characters = this.props.available.map((character, i) => {
      return <CharacterPanel character={character} key={i} updateChosen={this.updateChosen}/>
    });
    return (
      <Fragment>
        {this.state.proceed != null ? this.state.proceed: null}
        <OptionsMenu></OptionsMenu>
          <h1 className='title'>
            Chose Up to 3 Characters ({this.state.chosen.length})
          </h1>
          <Container>
            {characters}
            <Button onClick={this.startGame}>Let's Go!</Button>
          </Container>
      </Fragment>
    );
  };
};

// Demonstrates all proptypes requreid for the compoent to run
CharacterSelectScreen.propTypes = {

};


// Set Redux state equal to props
const mapStateToProps = state => ({
  available: state.characters.availableCharacters,
  current: state.characters.currentCharacters,
  level: state.level.currentLevel,
  scene: state.scene.sceneName
});


// Export the character select screen connected to redux
export default connect(mapStateToProps, { setCurrentCharacters, setAvailableCharacters, setLevel, setCutscene, gameLoss })(CharacterSelectScreen);