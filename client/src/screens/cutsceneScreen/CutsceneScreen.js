// Selects and plays the appropriate movie based on the level info stored
// in the Redux state

import React, { Component, Fragment } from 'react';
import './CutsceneScreen.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import levelData from '../../assets/data/levelData';
import pubsub from 'pubsub-js';
import {Button} from '../../components/Button/Button';

class CutsceneScreen extends Component {
  constructor (props){
    super(props)

    this.state = {
      cutscene: '',
      lazy: null
    }
  }

  // Get the level and cutscene to make a URL for the lazy loading
  componentWillMount(){
    if (this.props.loss == true){
      this.setState({cutscene: 'game_loss'})
    } else if (this.props.loss == false) {
      this.setState({cutscene: `${levelData[this.props.level].cutscenes[this.props.scene].title}`});
    }
  }

  // Lazy loading the movie file dynamically
  // Add event listener for ending the movie
  async componentDidMount(){
    pubsub.publish('pauseMusic');
    if(this.state.lazy === null) {
      try {
        const movieFile = await import(`../../assets/movies/${this.state.cutscene}.mp4`);
        this.setState({lazy: <video className='cutscenePlayer' src={movieFile.default} autoPlay id='video'></video>});
        document.getElementById('video').addEventListener('ended', this.endScene, false);
      } catch(err) {
        this.setState({lazy: <div>{`Failed to load component: ${err}`}</div>});
        //Do something so game doesn't just soft lock here
      }
    }

  }

  // This is called when the skip button is clicked
  // or when the cutscene ends
  // Should try to find a better time to call this though to avoid desync load times
  endScene = () =>{
    try {
      pubsub.publish('changeTrack', this.state.cutscene);
      levelData[this.props.level].cutscenes[this.props.scene].finished = true;
      this.props.changeScreen('CharacterSelectScreen');
    } catch(err) {
      levelData[this.props.level].cutscenes[this.props.scene].finished = true;
      this.props.changeScreen('CharacterSelectScreen');
    }
  }

  render(){
    return (
      <Fragment>
        {this.state.lazy || <div className="loader"></div>}
        <Button onClick={this.endScene}>Skip</Button>
      </Fragment>
    )
  }
}

CutsceneScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  level: state.level.currentLevel,
  scene: state.scene.sceneName,
  loss: state.level.gameLoss
})

export default connect(mapStateToProps, null)(CutsceneScreen)