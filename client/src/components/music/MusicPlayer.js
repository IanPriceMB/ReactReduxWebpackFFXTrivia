// This file contains the code for dynamically playing music

// Importing everything we need to make this a pretty react component
import React, { Component } from 'react';


// Pubsub is for listening to the events for playing, puasing and changing tracks
import pubsub from 'pubsub-js';


// Music for the initial load
import music from '../../assets/music/MainMenu.mp3';

class MusicPlayer extends Component {
  constructor(props){
    super(props);
  };

  // Before the componenet mounts set up the pubsub listeners
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
  };

  pauseMusic = () => {
    document.querySelector('audio').pause();
    var mp = document.querySelector('audio');
    var src = mp.getElementsByTagName('source');
    src[0].setAttribute('src', '');
  };
  
  changeTrack = async (music) => {
    try {
      const nextMusic = await import(`../../assets/music/${music}.mp3`);
      const musicPlayer = document.getElementById('music');
      musicPlayer.innerHTML = `<audio><source src="${nextMusic.default}" type="audio/mp3" /></audio>`;
      this.playMusic();
    } catch (err) {
      console.log(err);
    };
  };

  // In case of unmount we unsubscribe to avoid memory leaks
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
    );
  };
};


// Export the music player
export default MusicPlayer;