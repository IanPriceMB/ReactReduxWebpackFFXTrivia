import React, { Component, Fragment } from 'react';
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

  // Get the level and cutscene to play and make a URL
  componentWillMount(){
    const reduxState = store.getState();
    const level = reduxState.level.currentLevel;
    const scene = reduxState.scene.sceneName;
    this.setState({cutscene: `${levelData[level].cutscenes[scene]}`, scene: scene})

  }

  // Load the movie file 
  async componentDidMount(){
    if(this.state.lazy === null) {
      try {
        const movieFile = await import(`../../assets/movies/${this.state.cutscene}.mp4`);
        
        this.setState({lazy: <video src={movieFile.default} autoPlay id='video'></video>})

        document.getElementById('video').addEventListener('ended', this.endScene, false)
      } catch(err) {
        this.setState({lazy: <div>{`Failed to load component: ${err}`}</div>})
      }
    }
  }

  endScene = () =>{
    if(this.state.scene )
    this.props.changeScreen('CharacterSelectScreen')
  }

  render(){
    return (
      <Fragment>
        {this.state.lazy || <div>loading...</div>}
        <button onClick={this.endScene}>Skip</button>
      </Fragment>
    )
  }
}

export default CutsceneScreen;