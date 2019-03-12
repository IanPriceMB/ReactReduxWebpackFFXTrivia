// The main menu controls the initial flow of the application
// loggin in/ signing up allows for save states!

// Importing everything we need to make this a pretty react component
import React from 'react';
import './MainMenuScreen.scss';
import PropTypes from 'prop-types';


// For connecting to Redux state
import { connect } from 'react-redux';
import { setLevel } from '../../actions/levelActions';
import { setCutscene } from '../../actions/cutsceneActions';


// All the components we need to make the Main Menu Screen
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';

const MainMenuScreen = props => {

  // Set Redux state to a new game state
  const newGame = () => {
    props.setLevel('new_game');
    props.setCutscene('scene_final');
    props.changeScreen('CutsceneScreen');
  };

  return (
    <Container>
      <Button onClick={newGame}>New Game</Button>
      <Button>Log In</Button>
      <Button>Sign UP</Button>
    </Container>
  );
};


// Declareing which proptypes should be present 
MainMenuScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired,
  setLevel: PropTypes.func.isRequired,
  setCutscene: PropTypes.func.isRequired
};


// Exporting the main menu screen connected to Redux state
export default connect(null, { setLevel, setCutscene })(MainMenuScreen);