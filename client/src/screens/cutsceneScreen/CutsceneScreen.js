import React, { Component, Fragment } from 'react';
import store from '../../store';

class CutsceneScreen extends Component {
  constructor (props){
    super(props)

    this.state = {
      cutscene: '',
      lazy: null
    }
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
        
        this.setState({lazy: <video src={movieFile.default} autoPlay id='video'></video>})
      } catch(err) {
        this.setState({lazy: <div>{`Failed to load component: ${err}`}</div>})
      }
    }
  }

  skip = () => {
    this.props.changeScreen('CharacterSelectScreen');
  }

  render(){
    return (
      <Fragment>
        {this.state.lazy || <div>waiting...</div>}
        <button onClick={this.skip}>Skip</button>
      </Fragment>
    )
  }
}

export default CutsceneScreen;