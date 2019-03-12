// Selects and plays the appropriate movie based on the Redux state

// Importing everything we need to make this a pretty react component
import React, { Component, Fragment } from 'react';
import './CutsceneScreen.scss';
import PropTypes from 'prop-types';


// Pubsub for listening to when a cutscene needs to be played
import pubsub from 'pubsub-js';


// For connecting to Redux state
import { connect } from 'react-redux';


// Data is stored elsewhere for ease of refernce
import levelData from '../../assets/data/levelData';


// All the components we need to make this screen run
import Button from '../../components/button/Button';

class CutsceneScreen extends Component {
  constructor (props){
    super(props);

    this.state = {
      cutscene: '',
      lazy: null
    };
  };

  // Get the level and cutscene to make a URL for the lazy loading
  componentWillMount(){
    if (this.props.loss == true){
      this.setState({cutscene: 'game_loss'});
    } else if (this.props.loss == false) {
      this.setState({cutscene: `${levelData[this.props.level].cutscenes[this.props.scene].title}`});
    };
  };

  // Pause the music
  // Lazy loading the movie file 
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
      };
    };
  };

  // This is called when the skip button is clicked
  // or when the cutscene ends
  endScene = () =>{
      pubsub.publish('changeTrack', this.state.cutscene);
      levelData[this.props.level].cutscenes[this.props.scene].finished = true;
      this.props.changeScreen('CharacterSelectScreen');
  };

  render(){
    return (
      <Fragment>
        {this.state.lazy || <div className="loader"></div>}
        <Button onClick={this.endScene}>Skip</Button>
      </Fragment>
    );
  };
};


// Declare all the props expceted for this screen
CutsceneScreen.propTypes = {
  changeScreen: PropTypes.func.isRequired, 
  changeScreen: PropTypes.func.isRequired, 
  dispatch: PropTypes.func.isRequired, 
  level: PropTypes.string.isRequired,
  scene: PropTypes.string.isRequired, 
  loss: PropTypes.bool.isRequired
};


// Set Redux state to props
const mapStateToProps = state => ({
  level: state.level.currentLevel,
  scene: state.scene.sceneName,
  loss: state.level.gameLoss
});


// Export cutscene screen connected to Redux State
export default connect(mapStateToProps, null)(CutsceneScreen);