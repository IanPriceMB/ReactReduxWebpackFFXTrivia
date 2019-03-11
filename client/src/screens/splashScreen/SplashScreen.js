// A simple splash page 

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SplashScreen.scss';
import { Button } from '../../components/Button/Button';
import { Container } from '../../components/Container/Container';
import pubsub from 'pubsub-js';

const SplashScreen = props => {

  useEffect(() => {
    pubsub.publish('playMusic', 'MainMenu');
  },[]);

  return (
    <Container>
        <h1 className='title'>Final Fantasy X Trivia</h1>
        <h3 className='subtitle'>Created by Ian Price</h3>
        <Button onClick={() => props.changeScreen('MainMenuScreen')}>Blitz Off!</Button>
    </Container>
  );
};

SplashScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired
};

export default SplashScreen;
