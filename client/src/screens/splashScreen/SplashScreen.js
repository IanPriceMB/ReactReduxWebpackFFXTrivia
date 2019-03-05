import React, {Fragment} from 'react';
import './SplashScreen.scss';

const SplashScreen = (props) => {

  return (
    <Fragment>
      <div className='container'>
        <h1>Final Fantasy X Trivia</h1>
        <h3>Created by Ian Price</h3>
        <button onClick={props.changeScreen.bind(this,'MainMenuScreen')}><h2>Blitz Off!</h2></button>
      </div>
    </Fragment>
  )
}

export default SplashScreen;