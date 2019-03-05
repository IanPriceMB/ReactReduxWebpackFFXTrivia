import React, {Fragment} from 'react';
import pubsub from 'pubsub-js';
import './MainMenuScreen.scss';

const MainMenuScreen = () => {
  
  const newGame = () => {
    pubsub.publish('new game', `it's a new game!`);
  }

  return (
    <Fragment>
      <div className='container'>
        <button onClick={newGame}><h2>New Game</h2></button>
        <button disabled={true}><h2>Log In</h2></button>
        <button disabled={true}><h2>Sign Up</h2></button>
      </div>
  </Fragment>
  )
}

export default MainMenuScreen;