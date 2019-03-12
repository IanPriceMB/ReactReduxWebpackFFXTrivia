// This controls the background dynamically via pubsub

// Importing everything we need to make this a pretty react component
import React, { Component } from 'react';
import  {connect } from 'react-redux';
import './Background.scss';


// Pubsub is for controling when an image is changed
import pubsub from 'pubsub-js';


class Background extends Component{

  // Before load set up our listeners for the pub sub
  componentWillMount() {
    this.pubsub_setBackground = pubsub.subscribe('setBackground', function(topic, data){
      this.setBackground();
    }.bind(this));
  };

  // Async to lazy load the background image file
  setBackground = async() => {
    try {
      const background = await import(`../../assets/backgrounds/${this.props.level}_${this.props.scene}.png`);
      document.getElementById('background').style.backgroundImage = `url('${background.default}')`;
    }catch(err) {
      console.log(err);
    } 
  }

  // If background is taken off the screen we unsub to avoid memory leaks
  componentWillUnmount() {
    pubsub.unsubscribe(pubsub_setBackground);
  }

  // Render out component to the screen
  render(){
    return <div className='background' id='background'></div>
  }
}

// Get the information this component needs from Redux state and set it to props
const mapStateToProps = state => ({
  level: state.level.currentLevel,
  scene: state.scene.sceneName
});


// Export our commponent connect it to Redux
export default connect(mapStateToProps, null)(Background);