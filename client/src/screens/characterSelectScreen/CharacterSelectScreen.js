// This screen controls the data flow
// if there is another cutscene this screen will bounce the user back
// to the cutscene screen 

// This component loads only when all applicable cutscenes have been played but the questions 
// for the scene have yet to be completed

// This component lets the user pick their party for taking on questions

// Importing everything we need to make this a pretty react component
import React, {Component, Fragment} from 'react';
import './CharacterSelectScreen.scss';
import PropTypes from 'prop-types';

// For connecting to Redux state
import { connect } from 'react-redux';
import { setCurrentCharacters, setAvailableCharacters } from '../../actions/characterActions';
import { setCutscene } from '../../actions/cutsceneActions';
import { setLevel, gameLoss } from '../../actions/levelActions';


// Pubsub for transmitting new music and background image choices
import pubsub from 'pubsub-js';

// Level data is stored in a seperate file for clarity of reference
import levelData from '../../assets/data/levelData';


// Load all the pictures that might be nessessary the character panels
import Tidus from '../../assets/characters/Tidus.png';
import Auron from '../../assets/characters/Auron.png';
import Wakka from '../../assets/characters/Wakka.png';
import Lulu from '../../assets/characters/Lulu.png';
import Rikku from '../../assets/characters/Rikku.png';
import Yuna from '../../assets/characters/Yuna.png';
import Kimahri from '../../assets/characters/Kimahri.png';


// All the components we need to build the page
import CharacterPanel from '../../components/characterpanel/CharacterPanel';
import OptionsMenu from '../../components/optionsMenu/OptionsMenu';
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

    const regexFinal = /\_final$/;

    // If it is the final scene and it has already been played update the level and scene to be the next level, scene one
    if (regexFinal.test(this.props.scene) && levelData[this.props.level].cutscenes[this.props.scene].finished){
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
    } else {
      this.setAvailableCharacters();
    }
  };

  setAvailableCharacters = () => {
    const availableCharacters = levelData[this.props.level].available_characters;
    this.props.setAvailableCharacters(availableCharacters);
  };

  componentDidMount(){
    pubsub.publish('playMusic');
  };


  // Hasn't been tested for 3+
  // Setting the border style dynamically overrides css causing hover problems
  updateChosen = character => {
    const characterPanel = document.getElementById(character);
    const value = characterPanel.getAttribute("data-chosen");

    // If 3 characters have already been chosen
    if(this.state.chosen.length == 3){
      document.getElementById(this.state.chosen[0]).setAttribute('data-chosen', "false");
      const byebye = this.state.chosen.splice(0,1);
      this.setState({chosen: [...byebye, character]});
      characterPanel.setAttribute('data-chosen', "true");

    } else if(value === "false"){
      this.setState({chosen: [...this.state.chosen, character]});
      characterPanel.setAttribute('data-chosen', "true");

    } else if (value === "true") {
      const unchosen = this.state.chosen.filter((chosenChar) => character !== chosenChar);
      this.setState({chosen: unchosen});
      characterPanel.setAttribute('data-chosen', "false");
    };
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
      let image;
      switch (character) {
        case 'Tidus':
          image = Tidus;
          break;
        case 'Auron':
          image = Auron;
          break;
        case 'Rikku':
          image = Rikku;
          break;
        case 'Kimahri':
          image = Kimahri;
          break;
        case 'Wakka':
          image = Wakka;
          break;
        case 'Lulu':
          image = Lulu;
          break;
        case 'yuna':
          image = Yuna;
          break;
      };
      return <CharacterPanel character={character} key={i} updateChosen={this.updateChosen} image={image}/>
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

// Declareing which proptypes should be present 
CharacterSelectScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired,
  setLevel: PropTypes.func.isRequired,
  setCutscene: PropTypes.func.isRequired,
  setAvailableCharacters: PropTypes.func.isRequired,
  setCurrentCharacters: PropTypes.func.isRequired,
  gameLoss: PropTypes.func.isRequired,
  available: PropTypes.array.isRequired,
  current: PropTypes.array.isRequired,
  level: PropTypes.string.isRequired, 
  scene: PropTypes.string.isRequired, 
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