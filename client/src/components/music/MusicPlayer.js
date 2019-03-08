import React, { Component } from 'react';
import pubsub from 'pubsub-js';
import music from '../../assets/music/MainMenu.mp3'

class MusicPlayer extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.pubsub_play = pubsub.subscribe('playMusic', this.playMusic);
    this.pupsub_stop = pubsub.subscribe('pauseMusic', this.pauseMusic);
    this.pubsub_changeTrack = pubsub.subscribe('changeTrack', function(topic, newTrack){
      console.log(topic)
      console.log(newTrack)
      this.changeTrack(newTrack)
    }.bind(this))
  }

  playMusic = () => {
    document.querySelector('audio').play();
    document.querySelector('audio').volume = .3;
  }

  pauseMusic = () => {
    document.querySelector('audio').pause();
    var mp = document.querySelector('audio');
    var src = mp.getElementsByTagName('source');
    src[0].setAttribute('src', '');
  }
  
  changeTrack = track => {
    try{
      // const src = document.querySelector('audio');
      const music = document.getElementById('music');
      // src.remove()
      music.innerHTML = `<audio><source src="${track}" type="audio/mp3" /></audio>`;
      const newMusic = document.querySelector('audio');
      newMusic.play();
    } catch(err){
      console.log(err)
    }
  }

  componentWillUnmount(){
    pubsub.unsubscribe(this.pubsub_event);
  }

  render(){
    return (
      <div id="music">
        <audio id='music-player' loop >  
          <source id='music-source' src={music} type="audio/mpeg"/> 
        </audio>
      </div>
    )    
  }
}

export default MusicPlayer;