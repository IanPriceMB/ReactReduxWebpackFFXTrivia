import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Pubsub from 'pubsub-js';
import './MainMenuScreen.scss';
import { connect } from 'react-redux';
import { setLevel } from '../../actions/levelActions'
import { setCutscene } from '../../actions/cutsceneActions'

class MainMenuScreen extends Component {
  
  newGame = () => {
    Pubsub.publish('new game', null);
    this.props.setLevel('Zanarkand');
    this.props.setCutscene('openingBlitzballCutscene')
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
  setLevel: PropTypes.func.isRequired,
  level: PropTypes.string,
  setCutscene: PropTypes.func.isRequired,
  cutscene: PropTypes.string,
}

const mapStateToProps = state => ({
  level: state.level.level,
  cutscene: state.movie.filename
})

export default connect(mapStateToProps, { setLevel, setCutscene })(MainMenuScreen);