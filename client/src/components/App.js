import React, {Component} from 'react';
import './App.scss';
import Tidus from '../assets/Tidus.png';
import movie from '../assets/movie.mp4';


class App extends Component {
  state = {screen: 'landing'};
  render(){
    return (
      <div>
        { this.state.screen == 'landing' ? (
          <div>
          <h1>My React Apple! haahha</h1>
          <div className='img'></div>
          <img src={Tidus} alt='Tidus' />
          <video src={movie} autoplay controls></video>
          </div>
        ):
        (null)}
      </div>
    );
  };
};

export default App;