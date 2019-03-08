import React, { Component } from 'react';
import pubsub from 'pubsub-js';
import music from '../../assets/music/MainMenu.mp3'

class MusicPlayer extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.pubsub_event = pubsub.subscribe('playMusic', this.playMusic);
  }

  playMusic = () => {
    document.querySelector('audio').play();
    document.querySelector('audio').volume = .3;
  }

  pauseMusic = () => {
    document.querySelector('audio').pause();
  }

  componentWillUnmount(){
    pubsub.unsubscribe(this.pubsub_event);
  }

  render(){
    return (
      <audio id='MainMenu' loop >  
        <source id='music-source' src={music} type="audio/mpeg"/> 
      </audio>
    )    
  }
}

export default MusicPlayer;