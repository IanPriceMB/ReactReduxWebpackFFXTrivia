// This file contains the code for dynamically rendering and playing music

import React, { Component } from 'react';
import pubsub from 'pubsub-js';
import music from '../../assets/music/MainMenu.mp3';

class MusicPlayer extends Component {
  constructor(props){
    super(props)
  };

  componentWillMount(){
    this.pubsub_play = pubsub.subscribe('playMusic', this.playMusic);
    this.pupsub_stop = pubsub.subscribe('pauseMusic', this.pauseMusic);
    this.pubsub_changeTrack = pubsub.subscribe('changeTrack', function(topic, newTrack){
      this.changeTrack(newTrack);
    }.bind(this));
  };

  playMusic = () => {
    document.querySelector('audio').play();
    document.querySelector('audio').volume = .1;
  }

  pauseMusic = () => {
    document.querySelector('audio').pause();
    var mp = document.querySelector('audio');
    var src = mp.getElementsByTagName('source');
    src[0].setAttribute('src', '');
  }
  
  changeTrack = async (music) => {
    try {
      const nextMusic = await import(`../../assets/music/${music}.mp3`);
      const musicPlayer = document.getElementById('music');
      musicPlayer.innerHTML = `<audio><source src="${nextMusic.default}" type="audio/mp3" /></audio>`;
      this.playMusic();
    } catch (err) {
      console.log(err);
    }
     
  }

  componentWillUnmount(){
    pubsub.unsubscribe(this.pubsub_play);
    pubsub.unsubscribe(this.pubsub_stop);
    pubsub.unsubscribe(this.pubsub_changeTrack);
  }

  render(){
    return (
      <div id="music">
        <audio id='music-player' loop >  
          <source id='music-source' src={music} type="audio/mpeg"/> 
        </audio>
      </div>
    )    ;
  };
};

export default MusicPlayer;