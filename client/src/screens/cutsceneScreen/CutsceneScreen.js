import React, { Component } from 'react';
import store from '../../store';
import movie from '../../assets/movies/openingBlitzballCutscene.mp4'

class CutsceneScreen extends Component {

  state = {
    cutscene: '',
    lazy: null
  }

  // Before mounting set state to the redux state for movie
  componentWillMount(){
    const reduxState = store.getState();
    this.setState({
      cutscene: reduxState.movie.movie
    });
  }
  
  // Load the movie file 
  async componentDidMount(){
    if(this.state.lazy === null) {
      try {
        const movieFile = await import(`../../assets/movies/${this.state.cutscene}.mp4`);
        console.log(movieFile);
        console.log(movie);
        
        this.setState({lazy: <video src={movieFile.default} autoPlay></video>})
      } catch(err) {
        this.setState({lazy: <div>{`Failed to load component: ${err}`}</div>})
      }
    }
  }

  render(){
    const url = '../../assets/movies/openingBlitzballCutscene.mp4'
    return (
      <div>
        {this.state.lazy || <div>waiting...</div>}
      </div>
    )
  }
}

export default CutsceneScreen;