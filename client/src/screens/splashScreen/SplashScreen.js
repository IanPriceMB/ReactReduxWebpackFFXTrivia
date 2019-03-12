// A splash page to set the mood when the user first visits our game!

// Importing everything we need to make this a pretty react component
import React, { useEffect, Fragment } from 'react';
import './SplashScreen.scss';
import PropTypes from 'prop-types';


// Pubsub is used to bypass websites not letting us autoplay our music
import pubsub from 'pubsub-js';


// The components we need to make our screen
import Button from '../../components/button/Button';
import Container from '../../components/container/Container';
import OptionsMenu from '../../components/optionsMenu/OptionsMenu';


const SplashScreen = props => {

  // React hook, the empty arry is so that it only runs on load
  useEffect(() => {
    pubsub.publish('playMusic', 'MainMenu');
  },[]);

  // Rendering our component
  return (
    <Fragment>
      <OptionsMenu></OptionsMenu>
      <Container>
        <h1 className='title'>Final Fantasy X Trivia</h1>
        <h3 className='subtitle'>Created by Ian Price</h3>
        <Button onClick={() => props.changeScreen('MainMenuScreen')}>Blitz Off!</Button>
    </Container>
    </Fragment>
  );
};

// The component requires a changescreen function to run so it is stuck in PropTypes
SplashScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired
};

// Exporting our Screen
export default SplashScreen;
