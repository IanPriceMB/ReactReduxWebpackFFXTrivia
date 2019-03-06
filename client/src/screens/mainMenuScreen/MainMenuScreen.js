import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './MainMenuScreen.scss';
import { connect } from 'react-redux';
import { setLevel } from '../../actions/levelActions'
import { setCutscene } from '../../actions/cutsceneActions'

class MainMenuScreen extends Component {
  constructor (props){
    super(props)

  }
  
  newGame = () => {
    this.props.setLevel('zanarkand_one');
    this.props.setCutscene('scene_one')
    this.props.changeScreen('CutsceneScreen');
  }

  render() {
    return (
      <Fragment>
        <div className='container'>
          <button onClick={this.newGame}><h2>New Game</h2></button>
          <button disabled={true}><h2>Log In</h2></button>
          <button disabled={true}><h2>Sign Up</h2></button>
        </div>
    </Fragment>
    )
  }
}

MainMenuScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired,
  setLevel: PropTypes.func.isRequired,
  setCutscene: PropTypes.func.isRequired
}

export default connect(null, { setLevel, setCutscene })(MainMenuScreen);