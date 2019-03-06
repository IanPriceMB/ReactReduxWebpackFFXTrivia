// Selects and plays the appropriate movie based on the level info stored
// in the Redux state

import React, { Component, Fragment } from 'react';
import './CutsceneScreen.scss'
import PropTypes from 'prop-types';
import store from '../../store';
import levelData from '../../assets/data/levelData'

class CutsceneScreen extends Component {
  constructor (props){
    super(props)

    this.state = {
      cutscene: '',
      scene: '',
      lazy: null
    }
  }

  // Get the level and cutscene to make a URL for the lazy loading
  componentWillMount(){
    const reduxState = store.getState();
    const level = reduxState.level.currentLevel;
    const scene = reduxState.scene.sceneName;
    this.setState({cutscene: `${levelData[level].cutscenes[scene]}`, scene: scene});
  }

  // Lazy loading the movie file dynamically
  // Add event listener for ending the movie
  async componentDidMount(){
    if(this.state.lazy === null) {
      try {
        const movieFile = await import(`../../assets/movies/${this.state.cutscene}.mp4`);
        this.setState({lazy: <video className='cutscenePlayer' src={movieFile.default} autoPlay id='video'></video>})
        document.getElementById('video').addEventListener('ended', this.endScene, false);
      } catch(err) {
        this.setState({lazy: <div>{`Failed to load component: ${err}`}</div>});
      }
    }
  }

  // This is called when the skip button is clicked
  // or when the cutscene ends
  endScene = () =>{
    this.props.changeScreen('CharacterSelectScreen');
  }

  render(){
    return (
      <Fragment>
        {this.state.lazy || <div className="loader"></div>}
        <button className='skipButton' onClick={this.endScene}>Skip</button>
      </Fragment>
    )
  }
}

CutsceneScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired
}

export default CutsceneScreen;