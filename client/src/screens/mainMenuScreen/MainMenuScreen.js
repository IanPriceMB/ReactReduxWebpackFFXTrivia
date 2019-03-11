// The main menu controls the initial flow of the application
// loggin in/ signing up allows for save states!
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './MainMenuScreen.scss';
import { connect } from 'react-redux';
import pubsub from 'pubsub-js'
import { setLevel } from '../../actions/levelActions';
import { setCutscene } from '../../actions/cutsceneActions';
import { Button } from '../../components/Button/Button';
import { Container } from '../../components/Container/Container';

const MainMenuScreen = props => {

  useEffect(() => {
    pubsub.publish('playMusic', 'MainMenu');
  },[]);
  
  // Set Redux state to a new game state
  const newGame = () => {
    props.setLevel('new_game');
    props.setCutscene('scene_final')
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

MainMenuScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired,
  setLevel: PropTypes.func.isRequired,
  setCutscene: PropTypes.func.isRequired
};

export default connect(null, { setLevel, setCutscene })(MainMenuScreen);