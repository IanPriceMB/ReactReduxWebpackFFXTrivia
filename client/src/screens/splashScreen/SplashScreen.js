// A simple splash page 

import React, { useEffect} from 'react';
import './SplashScreen.scss';

import pubsub from 'pubsub-js';

const SplashScreen = (props) => {

  useEffect(() => {
    pubsub.publish('playMusic');
  },[]);

  return (
      <div className='splash'>
        <h1 className='splash__title'>Final Fantasy X Trivia</h1>
        <h3 className='splash__subtitle'>Created by Ian Price</h3>
        <button className='splash__button' onClick={props.changeScreen.bind(this,'MainMenuScreen')}>
          <h2 className='splash__button__text'>Blitz Off!</h2>
        </button>
      </div>
  );
};

export default SplashScreen;