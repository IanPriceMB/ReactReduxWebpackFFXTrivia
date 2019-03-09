// This file contains the code for dynamically loading and switching the
// background picture displayed in different areas of the game

import React, { Component } from 'react';
import  {connect } from 'react-redux';
import './Background.scss';
import pubsub from 'pubsub-js';

class Background extends Component{

  componentWillMount() {
    this.setBackground();
    this.pubsub_setBackground = pubsub.subscribe('setBackground', function(topic, data){
      this.setBackground();
    }.bind(this));
  }

  setBackground = async() => {
    try {
      const background = await import(`../../assets/backgrounds/${this.props.level}_${this.props.scene}.png`);
      document.getElementById('background').style.backgroundImage = `url('${background.default}')`;
    }catch(err) {
      console.log(err);
    } 
  }
  componentWillUnmount() {
    pubsub.unsubscribe(pubsub_setBackground);
  }

  render(){
    return <div className='background' id='background'></div>
  }
}

const mapStateToProps = state => ({
  level: state.level.currentLevel,
  scene: state.scene.sceneName
});

export default connect(mapStateToProps, null)(Background);